import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import {MarkerService} from '../../../../services/marker.service';
import {Dato} from '../../../../models/dato.model';
import {DatosService} from '../../../../services/datos.service';

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
export class PrincipalComponent implements OnInit {
  databolivia: Dato[] = [];
  lista: any;
  listav1: Dato;
  listav2: Dato;
  private map;
  ndata: number[] = [];
  nddata: number[] = [];
  zona: number[] = [];

  private initMap(): void {
    this.map = L.map('map', {
      center: [ -16.290154, -63.588653 ],
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
              private datosService: DatosService) { }

  ngOnInit(): void {
     this.initMap();
    // this.markerService.makeCapitalMarkers(this.map);
     this.listdatos();
     this.listdatosv1();
    this.listdatosv2();
     for (let _i = 0; _i < 9; _i++){
       this.listdatodepa(_i);
     }
     this.auxiliar();
     this.markerService.makeCapitalCircleMarkers(this.map, this.zona, this.ndata, this.nddata);
     // console.log(this.lista);
  }
  listdatos(): any{
    this.datosService.getgenneralsum().subscribe(value => {
      this.lista = value;
    });
    return this.lista;
  }
  listdatosv1(): any{
    this.datosService.getgenneralvaccine().subscribe(value => {
      this.listav1 = value;
    });
    return this.lista;
  }
  listdatosv2(): any{
    this.datosService.getgenneralvaccine2().subscribe(value => {
      this.listav2 = value;
    });
    return this.lista;
  }
  // tslint:disable-next-line:typedef
  async listdatodepa(ndep: number){
    let datos;
    await this.datosService.getgenneralsumdep(ndep).subscribe((value) => {
     datos = value;
     this.databolivia = value;
     this.datatochart(datos);
   });
  }
  // tslint:disable-next-line:typedef
  datatochart(datos){
    datos.map((values) => {
        this.ndata.push(values.dato );
        this.nddata.push(values.tipoDeDato);
        this.zona.push(values.zonaId);
    });
  }
  // tslint:disable-next-line:typedef
  auxiliar(){
    console.log(this.ndata);
    console.log(this.nddata);
    console.log(this.zona);
  }
}
