import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Data} from '../models/data.model';
import apikey from '../shared/apikey';

@Injectable({
  providedIn: 'root'
})
export class PredictionsService {

  constructor(private http: HttpClient) {
  }

  getPredictionsByDepartment(iddepartment, amount) {
    return this.http.get<Data[]>(apikey.api + `/predict/department/${iddepartment}`, {params: {cant: amount}});
  }

  getPredictionsByCountry(idcountry, amount) {
    return this.http.get<Data[]>(apikey.api + `/predict/Country/${idcountry}`, {params: {cant: amount}});
  }
}
