import {Injectable} from '@angular/core';
import {DatosService} from './datos.service';
import {HttpClient} from '@angular/common/http';
import {Data} from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  databolivia: Data[] = [];
  ndatac: Data[] = [];
  ndatar: number[] = [];
  ndatam: number[] = [];

  constructor(private http: HttpClient, private servicedata: DatosService) {
  }

  makeCapitalPopup(data: any,suma: any): string {
    //console.log(suma[0]);

    return `` +
      `<div >Capital: ${data.name}</div>` +
      `<div>contagios:${suma[0].data} </div>
      <div>Muertes:${suma[1].data} </div>
      <div>Recuperados:${suma[2].data} </div>
      <div>Vacuna primera dosis:${suma[3].data} </div>
      <div>Vacuna segunda dosis :${suma[4].data} </div>`
    ;
  }
}
