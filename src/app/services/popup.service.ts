import { Injectable } from '@angular/core';
import {DatosService} from './datos.service';
import { HttpClient } from '@angular/common/http';
import {Dato} from '../models/dato.model';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private http: HttpClient, private datosService: DatosService) { }
  makeCapitalPopup(data: any,constaguiados: any): string {
    return `` +
      `<div >Capital: ${ data.name }</div>` +
      `<div>State: ${ data.state }</div>` +
      `<div>contaguios: ${ constaguiados}</div>

       <a mat-raised-button href="http://localhost:4200/main/graphics" target="_blank">Mas info</a>`;
       }

}
