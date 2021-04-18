import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }
  makeCapitalPopup(data: any): string {
    console.log(data.name);
    return `` +
      `<div>Capital: ${ data.name }</div>` +
      `<div>State: ${ data.state }</div>` +
      `<div>Population: ${ data.population }</div>
       <a mat-raised-button href="http://localhost:4200/main/graphics" target="_blank">Mas info</a>`;
       }

}
