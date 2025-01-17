import {Component, OnInit} from '@angular/core';
import {Data} from '../../../../models/data.model';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {DashboardService} from '../../../../services/dashboard.service';
import {DatosService} from '../../../../services/datos.service';
import {DepartmentService} from '../../../../services/department.service';
import {ChartType} from 'chart.js';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {DataModelTable} from "../../../../models/DataModelTable";

@Component({
  selector: 'app-dashboardsedit',
  templateUrl: './dashboardsedit.component.html',
  styleUrls: ['./dashboardsedit.component.css']
})
export class DashboardseditComponent implements OnInit {
  // set vicibel
  isCheckedbar: boolean;
  isCheckedbarcon: boolean;
  isCheckedbardead: boolean;
  isCheckedbarrec: boolean;
  isCheckedpie: boolean;
  isCheckedC: boolean;
  isCheckedR: boolean;
  isCheckedM: boolean;
  isCheckedAcu: boolean;

  databolivia: Data[] = [];

  SingleDataSet: number[] = [];
  SingleDataSetM: number[] = [];
  SingleDataSetR: number[] = [];
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

  resultsDepartment : DataModelTable[];

  // line char data
  public lineChartData: ChartDataSets[];
  public lineChartDatadead: ChartDataSets[];
  public lineChartDatarec: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartLegend = true;
  public lineChartType = 'bar';
  public lineChartPlugins = [];
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(50,222,209,0.93)',
      backgroundColor: 'rgba(50,222,209,0.98)',
    },
  ];
  // pie char data
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartDataM: number[];
  public pieChartDataR: number[];
  public pieChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: [],
    },
  ];
  // donut char data
  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[];
  //   MultiDataSet = [
  //   [350, 450, 100],
  //   [50, 150, 120],
  //   [250, 130, 70],
  // ];
  public doughnutChartType: ChartType = 'doughnut';


  constructor(private servicedash: DashboardService,
              private servicedata: DatosService,
              private servicedepartment: DepartmentService) {
  }


  ngOnInit(): void {
    this.loaddata();
    this.loadsuma();
    this.auxiliar();
  }
  createHeaders(keys) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 65,
        align: "center",
        padding: 0
      });
    }
    return result;
  }

  headers = this.createHeaders([
    "DATO",
    "DEPARTAMENTO",
  ]);
  generarTable() {
    var result = [];


    for (var i = 0; i < this.resultsDepartment.length; i += 1) {
      result.push(Object.assign({}, this.resultsDepartment[i]));
    }
    return result;
  };

  exportAsPDF() {

    let pdf = new jsPDF('l', 'cm', 'a4');

    let pieGraphic = document.getElementById('Pie');
    let graphicsContagiados = document.getElementById('bar-contagiados');
    let graphicsMuertos = document.getElementById('bar-muertos');
    let graphicsRecuperados = document.getElementById('bar-recuperados');
    let graphicsAcumulate = document.getElementById('acumulated-graph');




    var imgGraphContagiados = '';
    var imgGraphMuertos = '';
    var imgGraphRecuperados = '';
    var imgPie = '';
    var imgacu='';
    html2canvas(graphicsContagiados).then(canvas => {
      imgGraphContagiados = canvas.toDataURL('image/png');
      html2canvas(graphicsMuertos).then(canvas => {
        imgGraphMuertos = canvas.toDataURL('image/png');
        html2canvas(graphicsRecuperados).then(canvas => {
          imgGraphRecuperados = canvas.toDataURL('image/png');
          html2canvas(pieGraphic).then(canvas => {
            imgPie = canvas.toDataURL('image/png');
            html2canvas(graphicsAcumulate).then(canvas =>{
              imgacu= canvas.toDataURL('image/png')

              pdf.addImage(imgGraphContagiados, 'PNG', 0, 2.5, 29.0, 18.0);

              pdf.addPage("a4", "l");
              pdf.addImage(imgGraphMuertos, 'PNG', 0, 1.5, 29.0, 18.0);

              pdf.addPage("a4", "l");
              pdf.addImage(imgGraphRecuperados, 'PNG', 0, 1.5, 29.0, 18.0);

              pdf.addPage("a4", "l");
              pdf.addImage(imgPie, 'PNG', 0, 1.5, 29.0, 18.0);

              pdf.addPage("a4", "l");
              pdf.addImage(imgacu, 'PNG', 0, 1.5, 29.0, 18.0);

              pdf.save('dashboards.pdf');
            });
          });
        });

      });

    });



  }

  async loadsuma() {
    let suma;
    for (let i = 1; i < 10; i++) {
      await this.servicedepartment.getgenneralsumdep(i).subscribe((dash) => {
        suma = dash;
        this.dataSuma(suma, i);
        // console.log(suma);
      });
    }

  }

  dataSuma(suma, i) {

    console.log(suma, 'asda');

    suma.map(value => {
      if (i === 1) {

        if (value.datatype === 'Confirmados') {
          this.SingleDataSet.push(value.data);
          this.pieChartColors[0].backgroundColor.push('rgba(241,5,5,0.3)');
          this.labels.push('La Paz');
          //this.resultsDepartment.push({data:value.data,department:'La Paz'});
        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
          console.log(value.data,"m");
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
          console.log(value.data,"m");
        }
      }
      if (i === 2) {

        if (value.datatype === 'Confirmados') {
          this.pieChartColors[0].backgroundColor.push('rgba(6,215,239,0.3)');
          this.labels.push('Cochabamba');
          this.SingleDataSet.push(value.data);

         // this.resultsDepartment.push({data:value.data,department:'Cochabamba'});
        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
      }
      if (i === 3) {

        if (value.datatype === 'Confirmados') {
          this.pieChartColors[0].backgroundColor.push('rgba(142,6,239,0.3)');
          this.labels.push('Tarija');
          this.SingleDataSet.push(value.data);
          //this.resultsDepartment.push({data:value.data,department:'Tarija'});
        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
      }
      if (i === 4) {

        if (value.datatype === 'Confirmados') {
          this.SingleDataSet.push(value.data);
          this.pieChartColors[0].backgroundColor.push('rgba(89,189,20,0.3)');
          this.labels.push('Santa Cruz');

          //this.resultsDepartment.push({data:value.data,department:'Santa Cruz'});

        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
      }
      if (i === 5) {

        if (value.datatype === 'Confirmados') {
          this.SingleDataSet.push(value.data);
          this.pieChartColors[0].backgroundColor.push('rgba(239,126,6,0.3)');
          this.labels.push('Potosí');
          //this.resultsDepartment.push({data:value.data,department:'Potosi'});

        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
      }
      if (i === 6) {

        if (value.datatype === 'Confirmados') {
          this.SingleDataSet.push(value.data);
          this.pieChartColors[0].backgroundColor.push('rgba(6,239,212,0.3)');
          this.labels.push('Pando');
          //this.resultsDepartment.push({data:value.data,department:'Pando'});

        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
      }
      if (i === 7) {

        if (value.datatype === 'Confirmados') {
          this.SingleDataSet.push(value.data);
          this.pieChartColors[0].backgroundColor.push('rgba(196,6,239,0.3)');
          this.labels.push('Beni');
          //this.resultsDepartment.push({data:value.data,department:'Beni'});

        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
      }
      if (i === 8) {

        if (value.datatype === 'Confirmados') {
          this.pieChartColors[0].backgroundColor.push('rgba(6,64,239,0.3)');
          this.labels.push('Oruro');
          this.SingleDataSet.push(value.data);
          //this.resultsDepartment.push({data:value.data,department:'Oruro'});
        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
      }
      if (i === 9) {

        if (value.datatype === 'Confirmados') {
          this.pieChartColors[0].backgroundColor.push('rgba(239,200,6,0.3)');
          this.labels.push('Chuquisaca');
          this.SingleDataSet.push(value.data);
          //this.resultsDepartment.push({data:value.data,department:'Chuquisaca'});
        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
      }

    });

  }



  async loaddata() {
    let datos;
    for (let i = 1; i < 10; i++) {

      await this.servicedepartment.getgenneraldatadep(i).subscribe((value) => {
        datos = value;
        this.databolivia = value;

        this.datatochart(datos, i);
      });
    }
  }

  datatochart(datos, i) {
    datos.map((values) => {
      if (i === 1) {
        if (values.datatype === 'Confirmados') {
          this.ndata.push(values.data);
          this.date.push(values.inDate);

        }
        if (values.datatype === 'Muertos') {
          this.ddata.push(values.data);
        }
        if (values.datatype === 'Recuperados') {
          this.rdata.push(values.data);
        }
      }
      if (i === 2) {
        if (values.datatype === 'Confirmados') {
          this.ndata3.push(values.data);
        }
        if (values.datatype === 'Muertos') {
          this.ddata3.push(values.data);
        }
        if (values.datatype === 'Recuperados') {
          this.rdata3.push(values.data);
        }
      }
      if (i === 3) {
        if (values.datatype === 'Confirmados') {
          this.ndata4.push(values.data);
        }
        if (values.datatype === 'Muertos') {
          this.ddata4.push(values.data);
        }
        if (values.datatype === 'Recuperados') {
          this.rdata4.push(values.data);
        }
      }
      if (i === 4) {
        if (values.datatype === 'Confirmados') {
          this.ndata5.push(values.data);
        }
        if (values.datatype === 'Muertos') {
          this.ddata5.push(values.data);
        }
        if (values.datatype === 'Recuperados') {
          this.rdata5.push(values.data);
        }
      }
      if (i === 5) {
        if (values.datatype === 'Confirmados') {
          this.ndata6.push(values.data);
        }
        if (values.datatype === 'Muertos') {
          this.ddata6.push(values.data);
        }
        if (values.datatype === 'Recuperados') {
          this.rdata6.push(values.data);
        }
      }
      if (i === 6) {
        if (values.datatype === 'Confirmados') {
          this.ndata7.push(values.data);
        }
        if (values.datatype === 'Muertos') {
          this.ddata7.push(values.data);
        }
        if (values.datatype === 'Recuperados') {
          this.rdata7.push(values.data);
        }
      }
      if (i === 7) {
        if (values.datatype === 'Confirmados') {
          this.ndata8.push(values.data);
        }
        if (values.datatype === 'Muertos') {
          this.ddata8.push(values.data);
        }
        if (values.datatype === 'Recuperados') {
          this.rdata8.push(values.data);
        }
      }
      if (i === 8) {
        if (values.datatype === 'Confirmados') {
          this.ndata9.push(values.data);
        }
        if (values.datatype === 'Muertos') {
          this.ddata9.push(values.data);
        }
        if (values.datatype === 'Recuperados') {
          this.rdata9.push(values.data);
        }
      }
      if (i === 9) {
        if (values.datatype === 'Confirmados') {
          this.ndata10.push(values.data);
        }
        if (values.datatype === 'Muertos') {
          this.ddata10.push(values.data);
        }
        if (values.datatype === 'Recuperados') {
          this.rdata10.push(values.data);
        }
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
    console.log(this.SingleDataSetM,"muertos");
    console.log(this.SingleDataSetR);
    console.log(this.SingleDataSet);
    this.pieChartData = this.SingleDataSet;
    this.pieChartDataM = this.SingleDataSetM;
    this.pieChartDataR = this.SingleDataSetR;
    this.pieChartLabels = this.labels;
  }

}
