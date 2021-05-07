import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dashboard} from '../models/dashboard.model';
import apikey from '../shared/apikey';
import {Dato} from '../models/dato.model';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) {
  }

  postNewData() {
    return this.http.get<Dashboard[]>(apikey.api + '/dashboards');
  }
  getgenneralsum(){
    return this.http.get<Dato[]>(apikey.api+'/department/departmentgeneral/1');
  }
  getgenneralsumdep(iddepartamento: number){
    return this.http.get<Dato[]>(apikey.api + `/department/departmentgeneral/${iddepartamento}`);
  }
  async getBoliviaData(){
    return this.http.get<Dato[]>(apikey.api+'/data/Bolivia').toPromise();
  }

}
