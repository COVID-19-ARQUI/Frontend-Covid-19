import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../../../services/dashboard.service';
import {Dashboard} from '../../../../models/dashboard.model';
import {Color, Label} from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import {DatosService} from '../../../../services/datos.service';
import {Dato} from '../../../../models/dato.model';


@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {
  dashboard: Dashboard[];
  databolivia: Dato[]=[];
  ndata: number[]=[];
  date: string[]=[];
  public lineChartData: ChartDataSets[];
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
  }

  async loaddata(){
    // await this.servicedash.getdatadepartments().subscribe((dash) => {
    //   this.dashboard =dash;
    // });
    var datos;
    await this.servicedata.getBoliviaData().then((value) => {
        datos= value;
        this.databolivia=value;
        this.datatochart(datos);
    });

  }
  auxiliar(){
    console.log(this.ndata)
    this.lineChartData=[
      { data: this.ndata, label: 'Contagiados'},
    ];
    this.lineChartLabels=this.date;
  }
  datatochart(datos){
    datos.map((values) => {
      if (values.tipoDeDato=='contagiados'){
        this.ndata.push(values.dato);
        this.date.push(values.fecha);
      }
    });

  }


}
