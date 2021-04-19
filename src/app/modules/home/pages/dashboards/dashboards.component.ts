import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../../../services/dashboard.service';
import {Dashboard} from '../../../../models/dashboard.model';
import {Color, Label} from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import {DatosService} from '../../../../services/datos.service';
import {Dato} from '../../../../models/dato.model';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
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
  databoliviaSuma: Dato[]=[];
  ndata: number[]=[];
  ddata: number[]=[];
  rdata: number[]=[];
  date: string[]=[];
  varia:{contagiados:number,muertos:number,recuperados:number};
  public lineChartData: ChartDataSets[];
  public lineChartDataDeath: ChartDataSets[];
  public lineChartDataRecovered: ChartDataSets[];
  public lineChartLabels: Label[];
  // public lineChartOptions: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  // };
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
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  constructor(
    private servicedash: DashboardService,
    private servicedata: DatosService,
  ) { }

  ngOnInit(): void {
    this.loaddata();
    this.auxiliar();
    this.dataSuma();
  }

  async loaddata(){
    // await this.servicedash.getdatadepartments().subscribe((dash) => {
    //   this.dashboard =dash;
    // });
    await this.servicedata.getgenneralsum().subscribe((dash) => {
      this.databoliviaSuma =dash;
    });
    var datos;
    await this.servicedata.getBoliviaData().then((value) => {
        datos= value;
        this.databolivia=value;
        this.datatochart(datos);
    });
  }
  dataSuma(){

    this.databoliviaSuma.map(value => {
      if (value.tipoDeDato=="contagiados"){
        this.varia.contagiados==value.idDato;
      }
      if (value.tipoDeDato=="muertos"){
        this.varia.muertos==value.idDato;
      }
      if (value.tipoDeDato=="recuperados"){
        this.varia.recuperados==value.idDato;
      }
    });
  }

  auxiliar(){
    console.log(this.ndata);
    this.lineChartData=[
      { data: this.ndata, label: 'Contagiados'},
    ];
    this.lineChartDataDeath=[
      { data: this.ddata, label: 'Muertos'},
    ];
    this.lineChartDataRecovered=[
      { data: this.rdata, label: 'Recuperados'},
    ];
    this.lineChartLabels=this.date;
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
    });

  }


}
