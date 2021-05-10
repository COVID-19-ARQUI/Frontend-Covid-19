import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import {PopupService} from './popup.service';
import {DatosService} from './datos.service';
import {Data} from '../models/data.model';
import {logging} from 'protractor';
import {DepartmentService} from './department.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals = '/assets/data/bolivia.geojson';
  lista: any;
  constructor(private http: HttpClient, private popupService: PopupService,
              private datosService: DatosService,
              private departmentService: DepartmentService) { }

  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  makeCapitalMarkers(map: L.map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);

        marker.addTo(map);
      }
    });
  }

  makeCapitalCircleMarkers(map: L.map, zona: number[], dato: number[], tipodato: number[]): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      const maxPop = Math.max(...res.features.map(x => x.properties.population), 0);
      let i = 0;
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];


        const circle = L.circleMarker([lat, lon], {
          radius: MarkerService.scaledRadius(c.properties.contagios/500, maxPop)
        });

        console.log(c.properties.population);
        console.log(this.getDataInDeparment(c.properties.population))

        circle.bindPopup(this.popupService.makeCapitalPopup(c.properties,this.getDataInDeparment(c.properties.population)));

        circle.addTo(map);

      }

    });
  }
getDataInDeparment(iddep: number): any{
  this.departmentService.getgenneralsum().subscribe(value => {
    this.lista = value;
  });
  return this.lista;

}
}
