import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../../../services/dashboard.service';
import {Dashboard} from '../../../../models/dashboard.model';
import {Color, Label} from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import {DatosService} from '../../../../services/datos.service';
import {Dato} from '../../../../models/dato.model';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {DatosGenerales} from '../../../../models/datosGenerales.model';
import {createValueHasWrongTypeError} from '@angular/compiler-cli/src/ngtsc/annotations/src/diagnostics';
@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class DashboardsComponent implements OnInit {
  dashboard: Dashboard[];
  databolivia: Dato[]=[];
  ndata: number[]=[];
  ddata: number[]=[];
  rdata: number[]=[];
  vdata: number[]=[];
  vdate: string[]=[];
  date: string[]=[];
  // varias: DatosGenerales;
  contagiados:number;
  muertos:number;
  recuperados:number;
  public lineChartData: ChartDataSets[];
  public lineChartDataDeath: ChartDataSets[];
  public lineChartDataRecovered: ChartDataSets[];
  public lineChartDataVaccined: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartLabelsVa: Label[];
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(50,222,209,0.3)',
      backgroundColor: 'rgba(50,222,209,0.3)',
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
  public lineChartLegend = true;
  public lineChartType = 'bar';
  public lineChartPlugins = [];

  public LapazData: ChartDataSets[];
  public CochabambaData: ChartDataSets[];
  public TarijaData: ChartDataSets[];
  public PandoData: ChartDataSets[];
  public PotosiData: ChartDataSets[];
  public SantaCruzData: ChartDataSets[];
  public BeniData: ChartDataSets[];
  public ChuqisacaData: ChartDataSets[];
  public OruroData: ChartDataSets[];
  constructor(
    private servicedash: DashboardService,
    private servicedata: DatosService,
  ) { }

  ngOnInit(): void {
    this.loadsuma();
    this.loaddata();
    this.loaddatadepartment();
    this.auxiliar();
  }

  async loaddata(){
    var datos;
    await this.servicedata.getBoliviaData().then((value) => {
        datos= value;
        this.databolivia=value;
        this.datatochart(datos);
    });
  }
  async loaddatadepartment(){
    var depa;
    await this.servicedash.getdatadepartments().subscribe((va) => {
      depa=va;
      this.dashboard =va;
      this.loaddatatochartdepa(depa);
    });
  }
  loaddatatochartdepa(depa) {
    let departamento:[{name:string,dat:[],fec:[],fec1:[]}];
    depa.forEach(value=>{

      var da;
      var fe;
      var fe1;
      value.datoDto.forEach(ca=>{
        if (ca.tipoDeDato=='contagiados'){
          da.push(ca.dato);
          fe.push(ca.fecha);
        }
        if (ca.tipoDeDato=='muertos'){
          da.push(ca.dato);
        }
        if (ca.tipoDeDato=='recuperados'){
          da.push(ca.dato);
        }
        if (ca.tipoDeDato=='vacuna1'){
          da.push(ca.dato);
          fe1.push(ca.fecha);
        }
      })
      departamento.push({name: value.department,dat:da,fec:fe,fec1:fe1})
    })
    return departamento;
  }
  async loadsuma(){
    var suma;
    await this.servicedata.getgenneralsum().subscribe((dash) => {
      suma =dash;
      this.dataSuma(suma);
      console.log(suma);
    });
  }
  dataSuma(suma){

    suma.map(value => {
      if (value.tipoDeDato=="contagiados"){
        this.contagiados=value.dato;
      }
      if (value.tipoDeDato=="muertos"){
        this.muertos=value.dato;
      }
      if (value.tipoDeDato=="recuperados"){
        this.recuperados=value.dato;
      }

    });

  }

  auxiliar(){

    this.lineChartData=[
      { data: this.ndata, label: 'Contagiados'},
    ];
    this.lineChartDataDeath=[
      { data: this.ddata, label: 'Muertos'},
    ];
    this.lineChartDataRecovered=[
      { data: this.rdata, label: 'Recuperados'},
    ];
    this.lineChartDataVaccined=[
      { data: this.vdata, label: 'Vacunas'},
    ];
    this.lineChartLabels=this.date;
    this.lineChartLabelsVa=this.vdate;
  }
  datatochart(datos){
    datos.map((values) => {
      if (values.tipoDeDato=='contagiados'){
        this.ndata.push(values.dato);
        this.date.push(values.fecha);
      }
      if (values.tipoDeDato=='muertos'){
        this.ddata.push(values.dato);
      }
      if (values.tipoDeDato=='recuperados'){
        this.rdata.push(values.dato);
      }
      if (values.tipoDeDato=='vacuna1'){
        this.vdata.push(values.dato);
        this.vdate.push(values.fecha);
      }
    });

  }


}
