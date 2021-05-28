import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dashboard} from '../models/dashboard.model';
import apikey from '../shared/apikey';
import {Data} from '../models/data.model';
import {dataupload} from '../models/dataupload.model';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) {
  }

  postNewData(data:dataupload) {
    return this.http.post(apikey.api + '/data/new',data);
  }

  getBoliviaData() {
    return this.http.get<Data[]>(apikey.api + '/data/general/list/29');
  }

}
