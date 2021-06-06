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
    return this.http.get<Data[]>(apikey.api + `/predict/country/${idcountry}`, {params: {cant: amount}});
  }

  getPredictionsByCountrylin(idcountry, amount) {
    return this.http.get<Data[]>(apikey.api + `/predict/country/lineal/${idcountry}`, {params: {cant: amount}});
  }
  getPredictionsByCountrypow(idcountry, amount) {
    return this.http.get<Data[]>(apikey.api + `/predict/country/pow/${idcountry}`, {params: {cant: amount}});
  }
  getPredictionsByCountryexp(idcountry, amount) {
    return this.http.get<Data[]>(apikey.api + `/predict/country/exp/${idcountry}`, {params: {cant: amount}});
  }
  getPredictionsByCountrylog(idcountry, amount) {
    return this.http.get<Data[]>(apikey.api + `/predict/country/log/${idcountry}`, {params: {cant: amount}});
  }

  getPredictionsByCitylin(idcountry, amount) {
    return this.http.get<Data[]>(apikey.api + `/predict/cities/lineal/${idcountry}`, {params: {cant: amount}});
  }
  getPredictionsByCitypow(idcountry, amount) {
    return this.http.get<Data[]>(apikey.api + `/predict/cities/pow/${idcountry}`, {params: {cant: amount}});
  }
  getPredictionsByCityexp(idcountry, amount) {
    return this.http.get<Data[]>(apikey.api + `/predict/cities/exp/${idcountry}`, {params: {cant: amount}});
  }
  getPredictionsByCitylog(idcountry, amount) {
    return this.http.get<Data[]>(apikey.api + `/predict/cities/log/${idcountry}`, {params: {cant: amount}});
  }


}
