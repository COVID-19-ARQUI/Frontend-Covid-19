import {Component, OnInit} from '@angular/core';
import {PredictionsService} from '../../../../services/predictions.service';
import {Data} from '../../../../models/data.model';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {DepartmentModel} from '../../../../models/department.model';
import {DepartmentService} from '../../../../services/department.service';

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit {
  departments: DepartmentModel[];
  depselect: string = '0';
  tipopredic: string='0';
  tipopredicdep: string='0';
  tipodedatodep: string='0';
  cantbol:number;
  candep:number;
  tipodedato: string='0';
  tipodedatostr: string="";

  tipodedatostrdep: string="";
  predictions: Data[];

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartLegend = true;
  public lineChartType = 'bar';
  public lineChartPlugins = [];
  ndata: number[] = [];
  date: string[] = [];

  public lineChartDatadep: ChartDataSets[];
  public lineChartLabelsdep: Label[];
  ndatadep: number[] = [];
  datedep: string[] = [];


  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(8,231,198,0.97)',
      backgroundColor: 'rgba(8,231,198,0.97)',
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

  constructor(private predictionsService: PredictionsService,private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.lineChartData=[];
    this.lineChartLabels=[];
    this.lineChartDatadep=[];
    this.lineChartLabelsdep=[];
    this.ndatadep=[];
    this.ndata=[];
    this.date=[];
    this.datedep=[];

    this.getPredictions();
    this.getPredictionsdep();
    this.auxiliar();
    this.getDepartment();
  }
  async getDepartment(): Promise<DepartmentModel[]> {
    await this.departmentService.getDepartments().subscribe(value => {
      this.departments = value;
    });
    return this.departments;
  }

  async getPredictions() {
    if (this.tipodedato === '1') {
      this.tipodedatostr = "Confirmados";
    }
    if (this.tipodedato  === '2') {
      this.tipodedatostr = "Muertos";
    }
    if (this.tipodedato  === '3') {
      this.tipodedatostr= "Recuperados";
    }
   // console.log(this.tipodedato)
    //this.tipodedatostr=this.tipodedato;
    if(this.tipopredic=="1"){
      await this.predictionsService.getPredictionsByCountry(29, this.cantbol).subscribe(value => {
        this.datatochart(value);
      });
    }else if(this.tipopredic=="2"){
      await this.predictionsService.getPredictionsByCountrylin(29, this.cantbol).subscribe(value => {
        this.datatochart(value);
      });

    }else if(this.tipopredic=="3"){
      await this.predictionsService.getPredictionsByCountrypow(29, this.cantbol).subscribe(value => {
        this.datatochart(value);
      });
    }else if(this.tipopredic=="4"){
      await this.predictionsService.getPredictionsByCountryexp(29, this.cantbol).subscribe(value => {
        this.datatochart(value);
      });
    }else if (this.tipopredic=="5"){
      await this.predictionsService.getPredictionsByCountrylog(29, this.cantbol).subscribe(value => {
        this.datatochart(value);
      });
    }

  }

  datatochart(datos) {
    // console.log(datos);
    datos.map((values) => {
      if (values.datatype == this.tipodedato) {
        this.ndata.push(values.data);
        this.date.push(values.inDate);
      }
    });

  }

  async getPredictionsdep() {
    if (this.tipodedatodep === '1') {
      this.tipodedatostrdep = "Confirmados";
    }
    if (this.tipodedatodep  === '2') {
      this.tipodedatostrdep = "Muertos";
    }
    if (this.tipodedatodep  === '3') {
      this.tipodedatostrdep= "Recuperados";
    }

    if(this.tipopredicdep=="1"){
      await this.predictionsService.getPredictionsByDepartment(this.depselect, this.candep).subscribe(value => {
        this.datatochartdep(value);
      });
    }else if(this.tipopredicdep=="2"){
      await this.predictionsService.getPredictionsByCitylin(this.depselect, this.candep).subscribe(value => {
        this.datatochartdep(value);
      });

    }else if(this.tipopredicdep=="3"){
      await this.predictionsService.getPredictionsByCitypow(this.depselect, this.candep).subscribe(value => {
        this.datatochartdep(value);
      });
    }else if(this.tipopredicdep=="4"){
      await this.predictionsService.getPredictionsByCityexp(this.depselect, this.candep).subscribe(value => {
        this.datatochartdep(value);
      });
    }else if (this.tipopredicdep=="5"){
      await this.predictionsService.getPredictionsByCitylog(this.depselect, this.candep).subscribe(value => {
        this.datatochartdep(value);
      });
    }

  }

  datatochartdep(datos) {
    datos.map((values) => {
      if (values.datatype == this.tipodedatostrdep) {
        this.ndatadep.push(values.data);
        this.datedep.push(values.inDate);
      }
    });

  }


  auxiliar() {

    console.log(this.tipodedatostr)
    this.lineChartData = [
      {data: this.ndata, label: this.tipodedatostr },
    ];
    this.lineChartLabels = this.date;
console.log(this.ndatadep)
    this.lineChartDatadep= [
      {data: this.ndatadep, label: this.tipodedatostrdep },
    ];
    this.lineChartLabelsdep = this.datedep;

  }

  databolivia(){

    this.ngOnInit();
  }

  datadep(){
    this.ngOnInit();
  }
}
