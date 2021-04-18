import { Injectable } from '@angular/core';
import {DatosService} from './datos.service';
import { HttpClient } from '@angular/common/http';
import {Dato} from '../models/dato.model';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  datosum: Dato[] = [];
  constructor(private http: HttpClient, private datosService: DatosService) { }
  makeCapitalPopup(data: any): string {
    console.log(this.listdatos(1));
    return `` +
      `<div>Capital: ${ data.name }</div>` +
      `<div>State: ${ data.state }</div>` +
      `<div>Population: ${ data.population }</div>
       <a mat-raised-button href="http://localhost:4200/main/graphics" target="_blank">Mas info</a>`;
       }
  // tslint:disable-next-line:typedef
  listdatos(iddepa: number): Dato[] {
this.datosService.getgenneralsumdep(iddepa).subscribe((data) => {
  this.datosum = data;
});
return this.datosum;
  }


}
