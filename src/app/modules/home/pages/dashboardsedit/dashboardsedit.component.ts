import { Component, OnInit } from '@angular/core';
import {Dashboard} from '../../../../models/dashboard.model';
import {Data} from '../../../../models/data.model';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {DashboardService} from '../../../../services/dashboard.service';
import {DatosService} from '../../../../services/datos.service';
import {DepartmentService} from '../../../../services/department.service';



@Component({
  selector: 'app-dashboardsedit',
  templateUrl: './dashboardsedit.component.html',
  styleUrls: ['./dashboardsedit.component.css']
})
export class DashboardseditComponent implements OnInit {
  isChecked : boolean;
  isCheckedC : boolean;
  isCheckedR : boolean;
  isCheckedM : boolean;

  contagiados: number;
  muertos: number;
  recuperados: number;
  vacu1: number;
  vacu2: number;
  dashboard: Dashboard[];
  databolivia: Data[] = [];
  SingleDataSet:number[]=[];
  labels:string[]=[];
  ndata: number[] = [];
  ddata: number[] = [];
  rdata: number[] = [];
  vdata: number[] = [];
  v2data: number[] = [];
  vdate: string[] = [];
  date: string[] = [];
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartLegend = true;
  public lineChartType = 'bar';
  public lineChartPlugins = [];
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(50,222,209,0.3)',
      backgroundColor: 'rgba(50,222,209,0.3)',
    },
  ];



  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] ;
  public pieChartData: number[];
  public pieChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: [],
    },
  ];

  constructor(private servicedash: DashboardService,
              private servicedata: DatosService,
              private servicedepartment: DepartmentService) { }


  ngOnInit(): void {
    this.loaddata();
    this.loadsuma();
    this.auxiliar();
  }
  async loadsuma() {
    var suma;
    await this.servicedepartment.getgenneralsum().subscribe((dash) => {
      suma = dash;
      this.dataSuma(suma);
      console.log(suma);
    });
  }

  dataSuma(suma) {

    suma.map(value => {
      if (value.datatype == 'Confirmados') {
        this.contagiados = value.data;
        this.SingleDataSet.push(value.data);
        this.labels.push(value.datatype);
        this.pieChartColors[0].backgroundColor.push('rgba(79,244,197,0.3)');
      }
      if (value.datatype == 'Muertos') {
        this.muertos = value.data;
        this.SingleDataSet.push(value.data);
        this.labels.push(value.datatype);
        this.pieChartColors[0].backgroundColor.push('rgba(244,98,79,0.3)');
      }
      if (value.datatype == 'Recuperados') {
        this.recuperados = value.data;
        this.SingleDataSet.push(value.data);
        this.labels.push(value.datatype);
        this.pieChartColors[0].backgroundColor.push('rgba(148,244,79,0.3)');
      }
      if (value.datatype == 'Vacuna 1ra Dosis') {
        this.vacu1 = value.data;
        this.SingleDataSet.push(value.data);
        this.labels.push(value.datatype);
        this.pieChartColors[0].backgroundColor.push('rgba(79,140,244,0.3)');
      }
      if (value.datatype == 'Vacuna 2da Dosis') {
        this.vacu2 = value.data;
        this.SingleDataSet.push(value.data);
        this.labels.push(value.datatype);
        this.pieChartColors[0].backgroundColor.push('rgba(79,244,172,0.3)');
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
      if (values.datatype == 'Confirmados') {
        this.ndata.push(values.data);
        this.date.push(values.inDate);
      }
      if (values.datatype == 'Muertos') {
        this.ddata.push(values.data);
      }
      if (values.datatype == 'Recuperados') {
        this.rdata.push(values.data);
      }
      if (values.datatype == 'Vacuna 1ra Dosis') {
        this.vdata.push(values.data);
        this.vdate.push(values.inDate);
      }
      if (values.datatype == 'Vacuna 2da Dosis') {
        this.v2data.push(values.data);
      }
    });

  }

  auxiliar() {

    this.lineChartData = [
      {data: this.ndata, label: 'Contagiados'},

      {data: this.ddata, label: 'Muertos'},

      {data: this.rdata, label: 'Recuperados'},
    ];
    this.lineChartLabels = this.date;

    this.pieChartData= this.SingleDataSet;
    this.pieChartLabels=this.labels;
  }

}
