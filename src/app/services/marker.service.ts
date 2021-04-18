import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import {PopupService} from './popup.service';
import {DatosService} from './datos.service';
import {Dato} from '../models/dato.model';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/bolivia.geojson';
  datosum: Dato[] = [];
  constructor(private http: HttpClient, private popupService: PopupService, private datosService: DatosService) { }

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
  makeCapitalCircleMarkers(map: L.map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      const maxPop = Math.max(...res.features.map(x => x.properties.population), 0);

      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const circle = L.circleMarker([lat, lon], {
          radius: MarkerService.scaledRadius(c.properties.population, maxPop)
        });
        this.listdatos();
        console.log(this.datosum);
        circle.bindPopup(this.popupService.makeCapitalPopup(c.properties, 12312));

        circle.addTo(map);
      }
    });
  }
  listdatos(): Dato[] {
    this.datosService.getgenneralsum().subscribe((data) => {
      this.datosum = data;
      console.log(this.datosum);
    });
    return this.datosum;
  }
}
