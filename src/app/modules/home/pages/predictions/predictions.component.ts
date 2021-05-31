import {Component, OnInit} from '@angular/core';
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

  public LinealData: ChartDataSets[];
  public LinealDataDeath: ChartDataSets[];
  public LinealDataRecovered: ChartDataSets[];
  public LinealLabel: Label[];
  lndata: number[] = [];
  lddata: number[] = [];
  lrdata: number[] = [];

  regdate: string[] = [];

  public ExpData: ChartDataSets[];
  public ExpDataDeath: ChartDataSets[];
  public ExpDataRecovered: ChartDataSets[];
  public ExpLabel: Label[];
  endata: number[] = [];
  eddata: number[] = [];
  erdata: number[] = [];

  public PowData: ChartDataSets[];
  public PowDataDeath: ChartDataSets[];
  public PowDataRecovered: ChartDataSets[];
  public PowLabel: Label[];
  pndata: number[] = [];
  pddata: number[] = [];
  prdata: number[] = [];

  public LogData: ChartDataSets[];
  public LogDataDeath: ChartDataSets[];
  public LogDataRecovered: ChartDataSets[];
  public LogLabel: Label[];
  logndata: number[] = [];
  logddata: number[] = [];
  logrdata: number[] = [];

  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(8,74,231,0.3)',
      backgroundColor: 'rgba(8,74,231,0.3)',
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

  constructor(private predictionsService: PredictionsService) {
  }

  ngOnInit(): void {
    this.getPredictions();

    this.getPredictionslin();
    this.getPredictionsexp();
    this.getPredictionspow();
    this.getPredictionslog();

    this.auxiliar();
  }
  async getPredictions() {
    await this.predictionsService.getPredictionsByCountry(29, 10).subscribe(value => {
      this.datatochart(value);
    });
  }

  async getPredictionslin() {
    await this.predictionsService.getPredictionsByCountrylin(29, 10).subscribe(value => {
      this.datatochartlin(value);
    });
  }
  async getPredictionsexp() {
    await this.predictionsService.getPredictionsByCountryexp(29, 100).subscribe(value => {
      this.datatochartexp(value);
    });
  }
  async getPredictionspow() {
    await this.predictionsService.getPredictionsByCountrypow(29, 100).subscribe(value => {
      this.datatochartpow(value);
    });
  }
  async getPredictionslog() {
    await this.predictionsService.getPredictionsByCountrylog(29, 100).subscribe(value => {
      this.datatochartlog(value);
    });
  }

  datatochartlin(datos) {
    //console.log(datos);
    datos.map((values) => {
      if (values.datatype == '1') {
        this.lndata.push(values.data);
        this.regdate.push(values.inDate);
      }
      if (values.datatype == '2') {
        this.lddata.push(values.data);

      }
      if (values.datatype == '3') {
        this.lrdata.push(values.data);
      }

    });

  }
  datatochartexp(datos) {
    //console.log(datos);
    datos.map((values) => {
      if (values.datatype == '1') {
        this.endata.push(values.data);
      }
      if (values.datatype == '2') {
        this.eddata.push(values.data);

      }
      if (values.datatype == '3') {
        this.erdata.push(values.data);
      }

    });

  }
  datatochartpow(datos) {
    //console.log(datos);
    datos.map((values) => {
      if (values.datatype == '1') {
        this.pndata.push(values.data);
      }
      if (values.datatype == '2') {
        this.pddata.push(values.data);

      }
      if (values.datatype == '3') {
        this.prdata.push(values.data);
      }

    });

  }
  datatochartlog(datos) {
    //console.log(datos);
    datos.map((values) => {
      if (values.datatype == '1') {
        this.logndata.push(values.data);
      }
      if (values.datatype == '2') {
        this.logddata.push(values.data);

      }
      if (values.datatype == '3') {
        this.logrdata.push(values.data);
      }

    });

  }

  datatochart(datos) {
    //console.log(datos);
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

    this.LinealData = [
      {data: this.ndata, label: 'Contagiados'},
    ];
    this.LinealDataDeath = [
      {data: this.ddata, label: 'Muertos'},
    ];
    this.LinealDataRecovered = [
      {data: this.rdata, label: 'Recuperados'},
    ];
    this.LinealLabel = this.regdate;

    this.PowData = [
      {data: this.ndata, label: 'Contagiados'},
    ];
    this.PowDataDeath = [
      {data: this.ddata, label: 'Muertos'},
    ];
    this.PowDataRecovered = [
      {data: this.rdata, label: 'Recuperados'},
    ];
    this.PowLabel = this.regdate;

    this.LogData = [
      {data: this.ndata, label: 'Contagiados'},
    ];
    this.LogDataDeath = [
      {data: this.ddata, label: 'Muertos'},
    ];
    this.LogDataRecovered = [
      {data: this.rdata, label: 'Recuperados'},
    ];
    this.LogLabel = this.regdate;

    this.ExpData = [
      {data: this.ndata, label: 'Contagiados'},
    ];
    this.ExpDataDeath = [
      {data: this.ddata, label: 'Muertos'},
    ];
    this.ExpDataRecovered = [
      {data: this.rdata, label: 'Recuperados'},
    ];
    this.ExpLabel = this.regdate;
  }

}
