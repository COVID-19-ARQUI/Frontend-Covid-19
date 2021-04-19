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
  public LapazDataDeath: ChartDataSets[];
  public LapazDataRecovered: ChartDataSets[];
  public LapazVaccinated: ChartDataSets[];
  public LapazLabel: Label[];
  public LapazLabelVa: Label[];
  LaPazdatosc:number[]=[];
  LaPazdatosm:number[]=[];
  LaPazdatosr:number[]=[];
  LaPazdatosv1:number[]=[];
  LaPazdatosv2:number[]=[];
  LaPazfecha:string[]=[];
  LaPazfechav:string[]=[];

  public CochabambaData: ChartDataSets[];
  public CochabambaDataDeath: ChartDataSets[];
  public CochabambaDataRecovered: ChartDataSets[];
  public CochabambaVaccinated: ChartDataSets[];
  public CochabambaLabel: Label[];
  public CochabambaLabelVa: Label[];
  Cochabambadatosc:number[]=[];
  Cochabambadatosm:number[]=[];
  Cochabambadatosr:number[]=[];
  Cochabambadatosv1:number[]=[];
  Cochabambadatosv2:number[]=[];
  Cochabambafecha:string[]=[];
  Cochabambafechav:string[]=[];

  public TarijaData: ChartDataSets[];
  public TarijaDataDeath: ChartDataSets[];
  public TarijaDataRecovered: ChartDataSets[];
  public TarijaVaccinated: ChartDataSets[];
  public TarijaLabel: Label[];
  public TarijaLabelVa: Label[];
  Tarijadatosc:number[]=[];
  Tarijadatosm:number[]=[];
  Tarijadatosr:number[]=[];
  Tarijadatosv1:number[]=[];
  Tarijadatosv2:number[]=[];
  Tarijafecha:string[]=[];
  Tarijafechav:string[]=[];

  public PandoData: ChartDataSets[];
  public PandoDataDeath: ChartDataSets[];
  public PandoDataRecovered: ChartDataSets[];
  public PandoVaccinated: ChartDataSets[];
  public PandoLabel: Label[];
  public PandoLabelVa: Label[];
  Pandodatosc:number[]=[];
  Pandodatosm:number[]=[];
  Pandodatosr:number[]=[];
  Pandodatosv1:number[]=[];
  Pandodatosv2:number[]=[];
  Pandofecha:string[]=[];
  Pandofechav:string[]=[];


  public PotosiData: ChartDataSets[];
  public PotosiDataM: ChartDataSets[];
  public PotosiDataR: ChartDataSets[];
  public PotosiDataV: ChartDataSets[];
  public PotosiDataV1: ChartDataSets[];
  public PotosiLabel: Label[];
  public PotosiLabelv: Label[];
  Potosidatosc:number[]=[];
  Potosidatosm:number[]=[];
  Potosidatosr:number[]=[];
  Potosidatosv1:number[]=[];
  Potosidatosv2:number[]=[];
  Potosifecha:string[]=[];
  Potosifechav:string[]=[];


  public SantaCruzData: ChartDataSets[];
  public SantaCruzDataM: ChartDataSets[];
  public SantaCruzDataR: ChartDataSets[];
  public SantaCruzDataV: ChartDataSets[];
  public SantaCruzDataV1: ChartDataSets[];
  public SantaCruzLabel: Label[];
  public SantaCruzLabelv: Label[];
  SantaCruzdatosc:number[]=[];
  SantaCruzdatosm:number[]=[];
  SantaCruzdatosr:number[]=[];
  SantaCruzdatosv1:number[]=[];
  SantaCruzdatosv2:number[]=[];
  SantaCruzfecha:string[]=[];
  SantaCruzfechav:string[]=[];

  public BeniData: ChartDataSets[];
  public BeniDataM: ChartDataSets[];
  public BeniDataR: ChartDataSets[];
  public BeniDataV: ChartDataSets[];
  public BeniDataV1: ChartDataSets[];
  public BeniLabel: Label[];
  public BeniLabelv: Label[];
  Benidatosc:number[]=[];
  Benidatosm:number[]=[];
  Benidatosr:number[]=[];
  Benidatosv1:number[]=[];
  Benidatosv2:number[]=[];
  Benifecha:string[]=[];
  Benifechav:string[]=[];

  public ChuqisacaData: ChartDataSets[];
  public ChuqisacaDataM: ChartDataSets[];
  public ChuqisacaDataR: ChartDataSets[];
  public ChuqisacaDataV: ChartDataSets[];
  public ChuqisacaDataV1: ChartDataSets[];
  public ChuqisacaLabel: Label[];
  public ChuqisacaLabelv: Label[];
  Chuqisacadatosc:number[]=[];
  Chuqisacadatosm:number[]=[];
  Chuqisacadatosr:number[]=[];
  Chuqisacadatosv1:number[]=[];
  Chuqisacadatosv2:number[]=[];
  Chuqisacafecha:string[]=[];
  Chuqisacafechav:string[]=[];

  public OruroData: ChartDataSets[];
  public OruroDataM: ChartDataSets[];
  public OruroDataR: ChartDataSets[];
  public OruroDataV: ChartDataSets[];
  public OruroDataV1: ChartDataSets[];
  public OruroLabel: Label[];
  public OruroLabelv: Label[];
  Orurodatosc:number[]=[];
  Orurodatosm:number[]=[];
  Orurodatosr:number[]=[];
  Orurodatosv1:number[]=[];
  Orurodatosv2:number[]=[];
  Orurofecha:string[]=[];
  Orurofechav:string[]=[];



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
      this.loaddataLaPaz(depa);
      this.loaddataCochabamba(depa);
      this.loaddataTarija(depa);
      this.loaddataPando(depa);
      console.log(depa);
      this.loaddataPotosi(depa);
      this.loaddataSantaCruz(depa);
      this.loaddataBeni(depa);
      this.loaddataChuqisaca(depa);
      this.loaddataOruro(depa);

    });
  }

  loaddataOruro(depa) {
    console.log(depa)
    console.log(depa[4],'holasdasdas');

    depa[4].datoDto.forEach(value=>{
      if (value.tipoDeDato=='contagiados'){
        this.Orurodatosc.push(value.dato);
        this.Orurofecha.push(value.fecha);
      }
      if (value.tipoDeDato=='muertos'){
        this.Orurodatosm.push(value.dato);
      }
      if (value.tipoDeDato=='recuperados'){
        this.Orurodatosr.push(value.dato);
      }
      if (value.tipoDeDato=='vacuna1'){
        this.Orurodatosv1.push(value.dato);
        this.Orurofechav.push(value.fecha);
      }
      if (value.tipoDeDato=='vacuna2'){
        this.Orurodatosv2.push(value.dato);
      }
    });
  }

  loaddataChuqisaca(depa) {
    console.log(depa)
    console.log(depa[4],'holasdasdas');

    depa[4].datoDto.forEach(value=>{
      if (value.tipoDeDato=='contagiados'){
        this.Chuqisacadatosc.push(value.dato);
        this.Chuqisacafecha.push(value.fecha);
      }
      if (value.tipoDeDato=='muertos'){
        this.Chuqisacadatosm.push(value.dato);
      }
      if (value.tipoDeDato=='recuperados'){
        this.Chuqisacadatosr.push(value.dato);
      }
      if (value.tipoDeDato=='vacuna1'){
        this.Chuqisacadatosv1.push(value.dato);
        this.Chuqisacafechav.push(value.fecha);
      }
      if (value.tipoDeDato=='vacuna2'){
        this.Chuqisacadatosv2.push(value.dato);
      }
    });
  }

  loaddataPotosi(depa) {
    console.log(depa)
    console.log(depa[4],'holasdasdas');

    depa[4].datoDto.forEach(value=>{
        if (value.tipoDeDato=='contagiados'){
          this.Potosidatosc.push(value.dato);
          this.Potosifecha.push(value.fecha);
        }
        if (value.tipoDeDato=='muertos'){
          this.Potosidatosm.push(value.dato);
        }
        if (value.tipoDeDato=='recuperados'){
          this.Potosidatosr.push(value.dato);
        }
        if (value.tipoDeDato=='vacuna1'){
          this.Potosidatosv1.push(value.dato);
          this.Potosifechav.push(value.fecha);
        }
        if (value.tipoDeDato=='vacuna2'){
          this.Potosidatosv2.push(value.dato);
        }
    });
  }
  loaddataBeni(depa) {
    console.log(depa)
    console.log(depa[6],'holasdasdas');

    depa[6].datoDto.forEach(value=>{
      if (value.tipoDeDato=='contagiados'){
        this.Benidatosc.push(value.dato);
        this.Benifecha.push(value.fecha);
      }
      if (value.tipoDeDato=='muertos'){
        this.Benidatosm.push(value.dato);
      }
      if (value.tipoDeDato=='recuperados'){
        this.Benidatosr.push(value.dato);
      }
      if (value.tipoDeDato=='vacuna1'){
        this.Benidatosv1.push(value.dato);
        this.Benifechav.push(value.fecha);
      }
      if (value.tipoDeDato=='vacuna2'){
        this.Benidatosv2.push(value.dato);
      }
    });
  }

  loaddataSantaCruz(depa) {
    console.log(depa)
    console.log(depa[3],'holasdasdas');

    depa[3].datoDto.forEach(value=>{
      if (value.tipoDeDato=='contagiados'){
        this.SantaCruzdatosc.push(value.dato);
        this.SantaCruzfecha.push(value.fecha);
      }
      if (value.tipoDeDato=='muertos'){
        this.SantaCruzdatosm.push(value.dato);
      }
      if (value.tipoDeDato=='recuperados'){
        this.SantaCruzdatosr.push(value.dato);
      }
      if (value.tipoDeDato=='vacuna1'){
        this.SantaCruzdatosv1.push(value.dato);
        this.SantaCruzfechav.push(value.fecha);
      }
      if (value.tipoDeDato=='vacuna2'){
        this.SantaCruzdatosv2.push(value.dato);
      }
    });
  }

  loaddataLaPaz(depa) {

    depa[0].datoDto.forEach(value=>{
      if (value.tipoDeDato=='contagiados'){
        this.LaPazdatosc.push(value.dato);
        this.LaPazfecha.push(value.fecha);
      }
      if (value.tipoDeDato=='muertos'){
        this.LaPazdatosm.push(value.dato);
      }
      if (value.tipoDeDato=='recuperados'){
        this.LaPazdatosr.push(value.dato);
      }
      if (value.tipoDeDato=='vacuna1'){
        this.LaPazdatosv1.push(value.dato);
        this.LaPazfechav.push(value.fecha);
      }
      if (value.tipoDeDato=='vacuna2'){
        this.LaPazdatosv2.push(value.dato);
      }
    });
  }
  loaddataCochabamba(depa) {

    depa[1].datoDto.forEach(value=>{
      if (value.tipoDeDato=='contagiados'){
        this.Cochabambadatosc.push(value.dato);
        this.Cochabambafecha.push(value.fecha);
      }
      if (value.tipoDeDato=='muertos'){
        this.Cochabambadatosm.push(value.dato);
      }
      if (value.tipoDeDato=='recuperados'){
        this.Cochabambadatosr.push(value.dato);
      }
      if (value.tipoDeDato=='vacuna1'){
        this.Cochabambadatosv1.push(value.dato);
        this.Cochabambafechav.push(value.fecha);
      }
      if (value.tipoDeDato=='vacuna2'){
        this.Cochabambadatosv2.push(value.dato);
      }
    });
  }
  loaddataTarija(depa) {

    depa[2].datoDto.forEach(value=>{
      if (value.tipoDeDato=='contagiados'){
        this.Tarijadatosc.push(value.dato);
        this.Tarijafecha.push(value.fecha);
      }
      if (value.tipoDeDato=='muertos'){
        this.Tarijadatosm.push(value.dato);
      }
      if (value.tipoDeDato=='recuperados'){
        this.Tarijadatosr.push(value.dato);
      }
      if (value.tipoDeDato=='vacuna1'){
        this.Tarijadatosv1.push(value.dato);
        this.Tarijafechav.push(value.fecha);
      }
      if (value.tipoDeDato=='vacuna2'){
        this.Tarijadatosv2.push(value.dato);
      }
    });
  }
  loaddataPando(depa) {

    depa[5].datoDto.forEach(value=>{
      if (value.tipoDeDato=='contagiados'){
        this.Pandodatosc.push(value.dato);
        this.Pandofecha.push(value.fecha);
      }
      if (value.tipoDeDato=='muertos'){
        this.Pandodatosm.push(value.dato);
      }
      if (value.tipoDeDato=='recuperados'){
        this.Pandodatosr.push(value.dato);
      }
      if (value.tipoDeDato=='vacuna1'){
        this.Pandodatosv1.push(value.dato);
        this.Pandofechav.push(value.fecha);
      }
      if (value.tipoDeDato=='vacuna2'){
        this.Pandodatosv2.push(value.dato);
      }
    });
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

    this.LapazData=[
      { data: this.LaPazdatosc, label: 'Contagiados'},
    ];
    this.LapazDataDeath=[
      { data: this.LaPazdatosm, label: 'Muertos'},
    ];
    this.LapazDataRecovered=[
      { data: this.LaPazdatosr, label: 'Recuperados'},
    ];
    this.LapazVaccinated=[
      { data: this.LaPazdatosv1, label: 'Vacunas'},
    ];

    this.LapazLabel=this.LaPazfecha;
    this.LapazLabelVa=this.LaPazfechav;

    this.CochabambaData=[
      { data: this.Cochabambadatosc, label: 'Contagiados'},
    ];
    this.CochabambaDataDeath=[
      { data: this.Cochabambadatosm, label: 'Muertos'},
    ];
    this.CochabambaDataRecovered=[
      { data: this.Cochabambadatosr, label: 'Recuperados'},
    ];
    this.CochabambaVaccinated=[
      { data: this.Cochabambadatosv1, label: 'Vacunas'},
    ];

    this.CochabambaLabel=this.Cochabambafecha;
    this.CochabambaLabelVa=this.Cochabambafechav;

    this.TarijaData=[
      { data: this.Tarijadatosc, label: 'Contagiados'},
    ];
    this.TarijaDataDeath=[
      { data: this.Tarijadatosm, label: 'Muertos'},
    ];
    this.TarijaDataRecovered=[
      { data: this.Tarijadatosr, label: 'Recuperados'},
    ];
    this.TarijaVaccinated=[
      { data: this.Tarijadatosv1, label: 'Vacunas'},
    ];

    this.TarijaLabel=this.Tarijafecha;
    this.TarijaLabelVa=this.Tarijafechav;

    this.PandoData=[
      { data: this.Pandodatosc, label: 'Contagiados'},
    ];
    this.PandoDataDeath=[
      { data: this.Pandodatosm, label: 'Muertos'},
    ];
    this.PandoDataRecovered=[
      { data: this.Pandodatosr, label: 'Recuperados'},
    ];
    this.PandoVaccinated=[
      { data: this.Pandodatosv1, label: 'Vacunas'},
    ];

    this.PandoLabel=this.Pandofecha;
    this.PandoLabelVa=this.Pandofechav;
    this.LapazLabel=this.LaPazfecha;

    this.PotosiData=[{ data:this.Potosidatosc,label:'Contagiados'}];
    this.PotosiDataM=[{ data:this.Potosidatosm,label:'Muertos'}];
    this.PotosiDataR=[{ data:this.Potosidatosr,label:'Recuperados'}];
    this.PotosiDataV=[{ data:this.Potosidatosv1,label:'vacunados1'}];
    this.PotosiDataV1=[{ data:this.Potosidatosv2,label:'vacunado2'}];
    this.PotosiLabel=this.Potosifecha;
    this.PotosiLabelv=this.Potosifechav;

    this.SantaCruzData=[{ data:this.SantaCruzdatosc,label:'Contagiados'}];
    this.SantaCruzDataM=[{ data:this.SantaCruzdatosm,label:'Muertos'}];
    this.SantaCruzDataR=[{ data:this.SantaCruzdatosr,label:'Recuperados'}];
    this.SantaCruzDataV=[{ data:this.SantaCruzdatosv1,label:'vacunados1'}];
    this.SantaCruzDataV1=[{ data:this.SantaCruzdatosv2,label:'vacunado2'}];
    this.SantaCruzLabel=this.SantaCruzfecha;
    this.SantaCruzLabelv=this.SantaCruzfechav;


    this.BeniData=[{ data:this.Benidatosc,label:'Contagiados'}];
    this.BeniDataM=[{ data:this.Benidatosm,label:'Muertos'}];
    this.BeniDataR=[{ data:this.Benidatosr,label:'Recuperados'}];
    this.BeniDataV=[{ data:this.Benidatosv1,label:'vacunados1'}];
    this.BeniDataV1=[{ data:this.Benidatosv2,label:'vacunado2'}];
    this.BeniLabel=this.Benifecha;
    this.BeniLabelv=this.Benifechav;

//Chuqisaca
    this.ChuqisacaData=[{ data:this.Chuqisacadatosc,label:'Contagiados'}];
    this.ChuqisacaDataM=[{ data:this.Chuqisacadatosm,label:'Muertos'}];
    this.ChuqisacaDataR=[{ data:this.Chuqisacadatosr,label:'Recuperados'}];
    this.ChuqisacaDataV=[{ data:this.Chuqisacadatosv1,label:'vacunados1'}];
    this.ChuqisacaDataV1=[{ data:this.Chuqisacadatosv2,label:'vacunado2'}];
    this.ChuqisacaLabel=this.Chuqisacafecha;
    this.ChuqisacaLabelv=this.Chuqisacafechav;
//Oruro
    this.OruroData=[{ data:this.Orurodatosc,label:'Contagiados'}];
    this.OruroDataM=[{ data:this.Orurodatosm,label:'Muertos'}];
    this.OruroDataR=[{ data:this.Orurodatosr,label:'Recuperados'}];
    this.OruroDataV=[{ data:this.Orurodatosv1,label:'vacunados1'}];
    this.OruroDataV1=[{ data:this.Orurodatosv2,label:'vacunado2'}];
    this.OruroLabel=this.Orurofecha;
    this.OruroLabelv=this.Orurofechav;

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
