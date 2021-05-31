import {Component, OnInit} from '@angular/core';
import {Dashboard} from '../../../../models/dashboard.model';
import {Data} from '../../../../models/data.model';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {DashboardService} from '../../../../services/dashboard.service';
import {DatosService} from '../../../../services/datos.service';
import {DepartmentService} from '../../../../services/department.service';
import {ActivatedRoute} from '@angular/router';
import {MunicipalitydataModel} from '../../../../models/municipalitydata.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  municipio: MunicipalitydataModel[];
  muni:boolean;
  contagiados: number;
  muertos: number;
  recuperados: number;
  vacu1: number;
  vacu2: number;
  name: string;
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

  constructor(private servicedash: DashboardService,
              private servicedata: DatosService,
              private servicedepartment: DepartmentService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.loaddata();
    this.loadsuma();
    this.auxiliar();
    this.loadname();
    this.loadmunicipio();
  }
loadmunicipio(){
  const id = this.activatedRoute.snapshot.params.id;
  this.servicedepartment.getmunicipalitidatabyidped(id).subscribe(value => {
    this.municipio = value;
    console.log(value.length);
    if(value.length==0){
      this.muni=false;
    }else {
      this.muni=true;
    }
    console.log(value);
  });
  return this.municipio;
}

  loadname() {
    var data;
    this.servicedepartment.getDepartments().subscribe((dash) => {
      data = dash;
      this.dataname(data);
      //console.log(data);
    });
  }

  dataname(data) {
    const id = this.activatedRoute.snapshot.params.id;
    data.map(value => {
      if (value.idDepartment == id) {
       // console.log(value.department);
        this.name = value.department;
      }
    });

  }

  async loadsuma() {
    var suma;
    const id = this.activatedRoute.snapshot.params.id;
    console.log(id);
    await this.servicedepartment.getgenneralsumdep(id).subscribe((dash) => {
      suma = dash;
      this.dataSuma(suma);
      //console.log(suma);
    });
  }

  dataSuma(suma) {

    suma.map(value => {
      if (value.datatype == 'Confirmados') {
        this.contagiados = value.data;
      }
      if (value.datatype == 'Muertos') {
        this.muertos = value.data;
      }
      if (value.datatype == 'Recuperados') {
        this.recuperados = value.data;
      }
      if (value.datatype == 'Vacuna 1ra Dosis') {
        this.vacu1 = value.data;
      }
      if (value.datatype == 'Vacuna 2da Dosis') {
        this.vacu2 = value.data;
      }

    });

  }

  async loaddata() {
    const id = this.activatedRoute.snapshot.params.id;
    console.log(id);
    var datos;
    await this.servicedepartment.getgenneraldatadep(id).subscribe((value) => {
      datos = value;
      this.databolivia = value;

      this.datatochart(datos);
    });
  }

  datatochart(datos) {
    //console.log(datos);

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

}
