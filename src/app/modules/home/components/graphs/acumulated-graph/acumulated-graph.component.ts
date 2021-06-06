import { Component, OnInit } from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {DepartmentService} from '../../../../../services/department.service';
import {AcumulatedDepartmentModel} from '../../../../../models/AcumulatedDepartment.model';

@Component({
  selector: 'app-acumulated-graph',
  templateUrl: './acumulated-graph.component.html',
  styleUrls: ['./acumulated-graph.component.css']
})
export class AcumulatedGraphComponent implements OnInit {
  data: AcumulatedDepartmentModel[];
  labels: string[] = [];
  // la paz
  ndata: number[] = [];
  ddata: number[] = [];
  rdata: number[] = [];
  // id3
  ndata3: number[] = [];
  ddata3: number[] = [];
  rdata3: number[] = [];
  // id4
  ndata4: number[] = [];
  ddata4: number[] = [];
  rdata4: number[] = [];
  // id5
  ndata5: number[] = [];
  ddata5: number[] = [];
  rdata5: number[] = [];
  // id6
  ndata6: number[] = [];
  ddata6: number[] = [];
  rdata6: number[] = [];
  // id7
  ndata7: number[] = [];
  ddata7: number[] = [];
  rdata7: number[] = [];
  // id8
  ndata8: number[] = [];
  ddata8: number[] = [];
  rdata8: number[] = [];
  // id4
  ndata9: number[] = [];
  ddata9: number[] = [];
  rdata9: number[] = [];
  // id10
  ndata10: number[] = [];
  ddata10: number[] = [];
  rdata10: number[] = [];

  date: string[] = [];

  public lineChartData: ChartDataSets[];
  public lineChartDatadead: ChartDataSets[];
  public lineChartDatarec: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartLabelsVa: Label[];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgb(50,222,209)',
    },
  ];
  public lineChartColorsDeath: Color[] = [
    {
      borderColor: 'red',
    },
  ];
  public lineChartColorsRecovered: Color[] = [
    {
      borderColor: 'green',
    },
  ];
  public lineChartColorsVaccined: Color[] = [
    {
      borderColor: 'blue',
    },
  ];
  load: boolean = false;
  constructor(private citiesServices:DepartmentService) { }
  async ngOnInit(): Promise<void> {
    await this.getData();
    this.auxiliar();
  }
  async getData(){
    await this.citiesServices.getdataacumulated().subscribe(value => {
      var data= value;
      this.data=value;
      this.datatochart(data);
      this.load=true;
    })
  }
  datatochart(data) {
    console.log(data)
    data.map((values) => {
      if (values.idDepartment === 1) {
        values.dataDto.map((x)=>{
          if (x.datatype === 'Confirmados') {
            this.ndata.push(x.data);
            this.date.push(x.inDate);
          }
          if (x.datatype === 'Muertos') {
            this.ddata.push(x.data);
          }
          if (x.datatype === 'Recuperados') {
            this.rdata.push(x.data);
          }
        })

      }
      if (values.idDepartment === 2) {
        values.dataDto.map(x=>{
          if (x.datatype === 'Confirmados') {
            this.ndata3.push(x.data);
          }
          if (x.datatype === 'Muertos') {
            this.ddata3.push(x.data);
          }
          if (x.datatype === 'Recuperados') {
            this.rdata3.push(x.data);
          }
        })

      }
      if (values.idDepartment === 3) {
        values.dataDto.map(x=>{
          if (x.datatype === 'Confirmados') {
            this.ndata4.push(x.data);
          }
          if (x.datatype === 'Muertos') {
            this.ddata4.push(x.data);
          }
          if (x.datatype === 'Recuperados') {
            this.rdata4.push(x.data);
          }
        })

      }
      if (values.idDepartment === 4) {
        values.dataDto.map(x=>{
          if (x.datatype === 'Confirmados') {
            this.ndata5.push(x.data);
          }
          if (x.datatype === 'Muertos') {
            this.ddata5.push(x.data);
          }
          if (x.datatype === 'Recuperados') {
            this.rdata5.push(x.data);
          }
        })

      }
      if (values.idDepartment === 5) {
        values.dataDto.map(x=>{
          if (x.datatype === 'Confirmados') {
            this.ndata6.push(x.data);
          }
          if (x.datatype === 'Muertos') {
            this.ddata6.push(x.data);
          }
          if (x.datatype === 'Recuperados') {
            this.rdata6.push(x.data);
          }
        })

      }
      if (values.idDepartment === 6) {
        values.dataDto.map(x=>{
          if (x.datatype === 'Confirmados') {
            this.ndata7.push(x.data);
          }
          if (x.datatype === 'Muertos') {
            this.ddata7.push(x.data);
          }
          if (x.datatype === 'Recuperados') {
            this.rdata7.push(x.data);
          }
        })

      }
      if (values.idDepartment === 7) {
        values.dataDto.map(x=>{
          if (x.datatype === 'Confirmados') {
            this.ndata8.push(x.data);
          }
          if (x.datatype === 'Muertos') {
            this.ddata8.push(x.data);
          }
          if (x.datatype === 'Recuperados') {
            this.rdata8.push(x.data);
          }
        })

      }
      if (values.idDepartment === 8) {
        values.dataDto.map(x=>{
          if (x.datatype === 'Confirmados') {
            this.ndata9.push(x.data);
          }
          if (x.datatype === 'Muertos') {
            this.ddata9.push(x.data);
          }
          if (x.datatype === 'Recuperados') {
            this.rdata9.push(x.data);
          }
        })

      }
      if (values.idDepartment === 9) {
        values.dataDto.map(x=>{
          if (x.datatype === 'Confirmados') {
            this.ndata10.push(x.data);
          }
          if (x.datatype === 'Muertos') {
            this.ddata10.push(x.data);
          }
          if (x.datatype === 'Recuperados') {
            this.rdata10.push(x.data);
          }
        })

      }
    });
  }
  auxiliar() {

    this.lineChartData = [
      {data: this.ndata, label: 'La Paz'},
      {data: this.ndata3, label: 'Cochabamba'},
      {data: this.ndata4, label: 'Tarija'},
      {data: this.ndata5, label: 'Santa Cruz'},
      {data: this.ndata6, label: 'Potosí'},
      {data: this.ndata7, label: 'Pando'},
      {data: this.ndata8, label: 'Beni'},
      {data: this.ndata9, label: 'Oruro'},
      {data: this.ndata10, label: 'Chuquisaca'},
    ];

    this.lineChartDatadead = [
      {data: this.ddata, label: 'La Paz'},
      {data: this.ddata3, label: 'Cochabamba'},
      {data: this.ddata4, label: 'Tarija'},
      {data: this.ddata5, label: 'Santa Cruz'},
      {data: this.ddata6, label: 'Potosí'},
      {data: this.ddata7, label: 'Pando'},
      {data: this.ddata8, label: 'Beni'},
      {data: this.ddata9, label: 'Oruro'},
      {data: this.ddata10, label: 'Chuquisaca'},
    ];
    this.lineChartDatarec = [
      {data: this.rdata, label: 'La Paz'},
      {data: this.rdata3, label: 'Cochabamba'},
      {data: this.rdata4, label: 'Tarija'},
      {data: this.rdata5, label: 'Santa Cruz'},
      {data: this.rdata6, label: 'Potosí'},
      {data: this.rdata7, label: 'Pando'},
      {data: this.rdata8, label: 'Beni'},
      {data: this.rdata9, label: 'Oruro'},
      {data: this.rdata10, label: 'Chuquisaca'},
    ];
    this.lineChartLabels = this.date;

  }


}
