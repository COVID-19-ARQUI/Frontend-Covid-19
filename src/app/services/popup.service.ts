import { Injectable } from '@angular/core';
import {DatosService} from './datos.service';
import { HttpClient } from '@angular/common/http';
import {Dato} from '../models/dato.model';
@Injectable({
  providedIn: 'root'
})
export class PopupService {
  databolivia: Dato[]=[];
  ndatac: Dato[]=[];
  ndatar: number[]=[];
  ndatam: number[]=[];
  constructor(private http: HttpClient, private servicedata: DatosService) { }
  async loaddata(ndpartamente: number){
    // await this.servicedash.getdatadepartments().subscribe((dash) => {
    //   this.dashboard =dash;
    // });
    var datos;
    await this.servicedata.getgenneralsumdep(1).subscribe((value) => {
      datos = value;
      this.databolivia = value;
      //console.log(value,'aqui');
      this.ndatac.push(value[1]);
      // this.ndatac.push(value[1]);
      // this.ndatac.push(value[2]);
      // this.datatochart(datos);
    });

  }
  makeCapitalPopup(data: any, conta: number, muerto: number, recober: number): string {
    //console.log(this.ndatac);
    this.loaddata(data.population);
    // console.log(this.ndatac);
    return `` +
      `<div >Capital: ${ data.name }</div>` +
      `<div>State: ${ data.state }</div>` +
      `<div>contagios:${data.contagios} </div>
         <div>Muertes:${data.Muertes} </div>
        <div>recuperados:${data.recuperados} </div>

       <a mat-raised-button href="http://localhost:4200/main/graphics" target="_blank">Mas info</a>`;
       }

}
