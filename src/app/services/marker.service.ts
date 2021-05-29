import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';
import {PopupService} from './popup.service';
import {DatosService} from './datos.service';
import {DepartmentService} from './department.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals = '/assets/data/bolivia.geojson';
  lista: any;
  SingleDataSet: number[] = [];
  SingleDataSetM: number[] = [];
  SingleDataSetR: number[] = [];
  SingleDataSetvacu1:  number[] = [];
  SingleDataSetvacu2:  number[] = [];

  constructor(private http: HttpClient, private popupService: PopupService,
              private datosService: DatosService,
              private departmentService: DepartmentService) {
  }

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

   async makeCapitalCircleMarkers(map: L.map, con: number): Promise<void> {
     //this.loadsuma();

     // console.log(this.SingleDataSet);
    //  console.log(this.SingleDataSetR);
    //  console.log(this.SingleDataSetM);
    //  console.log(this.SingleDataSetvacu1);
    //  console.log(this.SingleDataSetvacu2);

     await this.http.get(this.capitals).subscribe((res: any) => {
      const maxPop = Math.max(...res.features.map(x => x.properties.population), 0);
      for (const c of res.features) {

        let suma;
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];


        this.departmentService.getgenneralsumdep(c.properties.population).subscribe((dash) => {
          suma = dash;
          //console.log(dash);
          const circle = L.circleMarker([lat, lon], {
            radius: MarkerService.scaledRadius(suma[0].data / 500, 35)
          });
          circle.bindPopup(this.popupService.makeCapitalPopup(c.properties,suma));
          circle.addTo(map);
        });
      }
    });
  }

  async loadsuma() {
    let suma;
    for (let i = 1; i < 10; i++) {
      await this.departmentService.getgenneralsumdep(i).subscribe((dash) => {
        suma = dash;
        this.dataSuma(suma, i);
        // console.log(suma);
      });
    }

  }

  dataSuma(suma, i) {

    //console.log(suma, 'llega aqui');

    suma.map(value => {
      if (i === 1) {

        if (value.datatype === 'Confirmados') {
          this.SingleDataSet.push(value.data);
        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
        if (value.datatype == 'Vacuna 1ra Dosis') {
          this.SingleDataSetvacu1.push(value.data);
        }
        if (value.datatype == 'Vacuna 2da Dosis') {
          this.SingleDataSetvacu2.push(value.data);
        }
      }
      if (i === 2) {
        if (value.datatype === 'Confirmados') {
          this.SingleDataSet.push(value.data);
        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }

        if (value.datatype == 'Vacuna 1ra Dosis') {
          this.SingleDataSetvacu1.push(value.data);
        }
        if (value.datatype == 'Vacuna 2da Dosis') {
          this.SingleDataSetvacu2.push(value.data);
        }
      }
      if (i === 3) {
        if (value.datatype === 'Confirmados') {
          this.SingleDataSet.push(value.data);;
        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
        if (value.datatype == 'Vacuna 1ra Dosis') {
          this.SingleDataSetvacu1.push(value.data);
        }
        if (value.datatype == 'Vacuna 2da Dosis') {
          this.SingleDataSetvacu2.push(value.data);
        }
      }
      if (i === 4) {

        if (value.datatype === 'Confirmados') {
          this.SingleDataSet.push(value.data);
        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
        if (value.datatype == 'Vacuna 1ra Dosis') {
          this.SingleDataSetvacu1.push(value.data);
        }
        if (value.datatype == 'Vacuna 2da Dosis') {
          this.SingleDataSetvacu2.push(value.data);
        }
      }
      if (i === 5) {

        if (value.datatype === 'Confirmados') {
          this.SingleDataSet.push(value.data);
        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
        if (value.datatype == 'Vacuna 1ra Dosis') {
          this.SingleDataSetvacu1.push(value.data);
        }
        if (value.datatype == 'Vacuna 2da Dosis') {
          this.SingleDataSetvacu2.push(value.data);
        }
      }
      if (i === 6) {

        if (value.datatype === 'Confirmados') {
          this.SingleDataSet.push(value.data);
        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
        if (value.datatype == 'Vacuna 1ra Dosis') {
          this.SingleDataSetvacu1.push(value.data);
        }
        if (value.datatype == 'Vacuna 2da Dosis') {
          this.SingleDataSetvacu2.push(value.data);
        }
      }
      if (i === 7) {

        if (value.datatype === 'Confirmados') {
          this.SingleDataSet.push(value.data);
        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
        if (value.datatype == 'Vacuna 1ra Dosis') {
          this.SingleDataSetvacu1.push(value.data);
        }
        if (value.datatype == 'Vacuna 2da Dosis') {
          this.SingleDataSetvacu2.push(value.data);
        }
      }
      if (i === 8) {

        if (value.datatype === 'Confirmados') {
          this.SingleDataSet.push(value.data);
        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
        if (value.datatype == 'Vacuna 1ra Dosis') {
          this.SingleDataSetvacu1.push(value.data);
        }
        if (value.datatype == 'Vacuna 2da Dosis') {
          this.SingleDataSetvacu2.push(value.data);
        }
      }
      if (i === 9) {

        if (value.datatype === 'Confirmados') {
          this.SingleDataSet.push(value.data);
        }
        if (value.datatype === 'Muertos') {
          this.SingleDataSetM.push(value.data);
        }
        if (value.datatype === 'Recuperados') {
          this.SingleDataSetR.push(value.data);
        }
        if (value.datatype == 'Vacuna 1ra Dosis') {
          this.SingleDataSetvacu1.push(value.data);
        }
        if (value.datatype == 'Vacuna 2da Dosis') {
          this.SingleDataSetvacu2.push(value.data);
        }
      }

    });

  }



}
