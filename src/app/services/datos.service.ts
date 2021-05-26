import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dashboard} from '../models/dashboard.model';
import apikey from '../shared/apikey';
import {Data} from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) {
  }

  postNewData() {
    return this.http.get<Dashboard[]>(apikey.api + '/dashboards');
  }

  // tslint:disable-next-line:typedef
  getBoliviaData() {
    return this.http.get<Data[]>(apikey.api + '/data/general/list/29');
  }

}
