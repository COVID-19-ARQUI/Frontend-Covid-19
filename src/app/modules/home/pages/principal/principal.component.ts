import {Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from '../../../../services/marker.service';
import {Data} from '../../../../models/data.model';
import {DatosService} from '../../../../services/datos.service';
import {DepartmentService} from '../../../../services/department.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements AfterViewInit {
  contagiados: number;
  muertos: number;
  recuperados: number;
  vacu1: number;
  vacu2: number;
  private map;
  private initMap(): void {
    this.map = L.map('map', {
      center: [-16.290154, -63.588653],
      zoom: 6
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 10,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private markerService: MarkerService,
              private datosService: DatosService,
              private departmentService: DepartmentService) {
  }

  ngAfterViewInit(): void {
    this.loadsuma();
    this.initMap();
    // this.markerService.makeCapitalMarkers(this.map);
    this.markerService.makeCapitalCircleMarkers(this.map,this.contagiados);

  }


  async loadsuma() {
    let suma;
    await this.departmentService.getgenneralsum().subscribe((dash) => {
      suma = dash;
      this.dataSuma(suma);
      //console.log(dash ,"rtr");
    });
  }

  dataSuma(suma) {
    suma.map(value => {
      if (value.datatype === 'Confirmados') {
        this.contagiados = value.data;
      }
      if (value.datatype === 'Muertos') {
        this.muertos = value.data;
      }
      if (value.datatype === 'Recuperados') {
        this.recuperados = value.data;
      }
      if (value.datatype === 'Vacuna 1ra Dosis') {
        this.vacu1 = value.data;
      }
      if (value.datatype === 'Vacuna 2da Dosis') {
        this.vacu2 = value.data;
      }

    });

  }




}
