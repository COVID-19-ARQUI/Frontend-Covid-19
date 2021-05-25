import { Component, OnInit } from '@angular/core';
import {PredictionsService} from '../../../../services/predictions.service';
import {Data} from '../../../../models/data.model';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit {
  predictions: Data[];
  public lineChartData: ChartDataSets[];
  public lineChartDataDeath: ChartDataSets[];
  public lineChartDataRecovered: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartLegend = true;
  public lineChartType = 'bar';
  public lineChartPlugins = [];
  ndata: number[] = [];
  ddata: number[] = [];
  rdata: number[] = [];
  date: string[] = [];
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
  constructor(private predictionsService:PredictionsService) { }

  ngOnInit(): void {
    this.getPredictions();
    this.auxiliar()
  }

  async getPredictions(){
    // await this.predictionsService.getPredictionsByDepartment(29,30).subscribe(value => {
    //   this.datatochart(value);
    // })
    await this.predictionsService.getPredictionsByCountry(29,60).subscribe(value => {
      this.datatochart(value);
    })
  }
  datatochart(datos) {
    console.log(datos);

    datos.map((values) => {
      if (values.datatype == '1') {
        this.ndata.push(values.data);
        this.date.push(values.inDate);
      }
      if (values.datatype == '2') {
        this.ddata.push(values.data);

      }
      if (values.datatype == '3') {
        this.rdata.push(values.data);
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
    this.lineChartLabels = this.date;
  }
}
