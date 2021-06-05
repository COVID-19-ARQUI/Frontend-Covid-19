import {Component, OnInit, ViewChild } from '@angular/core';
import {Dashboard} from '../../../../models/dashboard.model';
import {Data} from '../../../../models/data.model';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {DashboardService} from '../../../../services/dashboard.service';
import {DatosService} from '../../../../services/datos.service';
import {DepartmentService} from '../../../../services/department.service';
import axios from 'axios';
import {DragScrollComponent} from 'ngx-drag-scroll';

@Component({
  selector: 'app-dashboardsbolivia',
  templateUrl: './dashboardsbolivia.component.html',
  styleUrls: ['./dashboardsbolivia.component.css']
})
export class DashboardsboliviaComponent implements OnInit {
  contagiados: number;
  muertos: number;
  recuperados: number;
  vacu1: number;
  vacu2: number;
  datanews:any;
  dashboard: Dashboard[];
  databolivia: Data[] = [];
  ndata: number[] = [];
  ddata: number[] = [];
  rdata: number[] = [];
  vdata: number[] = [];
  v2data: number[] = [];
  vdate: string[] = [];
  date: string[] = [];
  public lineChartData: ChartDataSets[];
  public lineChartDataDeath: ChartDataSets[];
  public lineChartDataRecovered: ChartDataSets[];
  public lineChartDataVaccined: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartLabelsVa: Label[];
  public lineChartLegend = true;
  public lineChartType = 'bar';
  public lineChartPlugins = [];
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgb(50,222,209)',
      backgroundColor: 'rgb(50,222,209)',
    },
  ];
  public lineChartColorsDeath: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: 'red',
    },
  ];
  public lineChartColorsRecovered: Color[] = [
    {
      borderColor: 'green',
      backgroundColor: 'green',
    },
  ];
  public lineChartColorsVaccined: Color[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'blue',
    },
  ];

  @ViewChild('nav', { read: DragScrollComponent, static: true }) ds: DragScrollComponent;
  constructor(private servicedash: DashboardService,
              private servicedata: DatosService,
              private servicedepartment: DepartmentService) {
  }

  ngOnInit(): void {
    this.loaddata();
    this.loadsuma();
    this.auxiliar();
    this.getData();
  }

  async loadsuma() {
    let suma;
    await this.servicedepartment.getgenneralsum().subscribe((dash) => {
      suma = dash;
      this.dataSuma(suma);
      console.log(suma);
    });
  }

  dataSuma(suma) {

    suma.map(value => {
      if (value.datatype === 'Confirmados') {
        this.contagiados = value.data;
      }
      if (value.datatype === 'Muertos') {
        this.muertos = value.data;
      }
      if (value.datatype === 'Recuperados') {
        this.recuperados = value.data;
      }
      if (value.datatype === 'Vacuna 1ra Dosis') {
        this.vacu1 = value.data;
      }
      if (value.datatype === 'Vacuna 2da Dosis') {
        this.vacu2 = value.data;
      }

    });

  }

  async loaddata() {
    var datos;
    await this.servicedata.getBoliviaData().subscribe((value) => {
      datos = value;
      this.databolivia = value;

      this.datatochart(datos);
    });
  }

  datatochart(datos) {
    console.log(datos);

    datos.map((values) => {
      if (values.datatype === 'Confirmados') {
        this.ndata.push(values.data);
        this.date.push(values.inDate);
      }
      if (values.datatype === 'Muertos') {
        this.ddata.push(values.data);
      }
      if (values.datatype === 'Recuperados') {
        this.rdata.push(values.data);
      }
      if (values.datatype === 'Vacuna 1ra Dosis') {
        this.vdata.push(values.data);
        this.vdate.push(values.inDate);
      }
      if (values.datatype === 'Vacuna 2da Dosis') {
        this.v2data.push(values.data);
      }
    });

  }

  auxiliar() {

    this.lineChartData = [
      {data: this.ndata, label: 'Contagiados'},
    ];
    this.lineChartDataDeath = [
      {data: this.ddata, label: 'Muertos'},
    ];
    this.lineChartDataRecovered = [
      {data: this.rdata, label: 'Recuperados'},
    ];
    this.lineChartDataVaccined = [
      {data: this.vdata, label: 'Vacunas primera dosis'},
      {data: this.v2data, label: 'Vacunas segunda dosis'}
    ];

    this.lineChartLabels = this.date;
    this.lineChartLabelsVa = this.vdate;
  }

  getData(){


    let searchTerm = 'Covid-19 bolivia';
    var r;

    axios.get('https://api.bing.microsoft.com/v7.0/news/search?q='+searchTerm, {
      headers: {
        'Ocp-Apim-Subscription-Key': 'd9fb5e0085a246ab880455bef594d06d'
      },
      params: {
        count: 16,
        mkt: 'en-US',
      }
    }).then((response) => {
      r = response.data.value;
      this.datanews=r;


    }).catch((error) => {
      console.error(error);
    });

  }
}
