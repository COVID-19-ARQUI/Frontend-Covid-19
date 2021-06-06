import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import apikey from '../shared/apikey';
import {DepartmentModel} from '../models/department.model';
import {Data} from '../models/data.model';
import {MunicipalitydataModel} from '../models/municipalitydata.model';
import {AcumulatedDepartmentModel} from '../models/AcumulatedDepartment.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {
  }

  getDepartments() {
    return this.http.get<DepartmentModel[]>(apikey.api + '/department/list/details');
  }

  getgenneralvaccine() {
    return this.http.get<Data>(apikey.api + '/department/first/vaccinated/1');
  }

  getgenneralvaccine2() {
    return this.http.get<Data>(apikey.api + '/department/second/vaccinated/1');
  }

  // move to datos servises dont forget
  getgenneralsum() {
    return this.http.get<Data[]>(apikey.api + '/data/general/29');
  }

  // list datadeparment
  getgenneraldatadep(iddepartamento: number) {
    return this.http.get<Data[]>(apikey.api + `/department/data/single/list/${iddepartamento}`);
  }

  // sum data http://localhost:8080/department/general/2
  getgenneralsumdep(iddepartamento: number) {
    return this.http.get<Data[]>(apikey.api + `/department/general/${iddepartamento}`);
  }

  //list of municipaliti data by id of deparmetn
  getmunicipalitidatabyidped(iddepartamento: number) {
    return this.http.get<MunicipalitydataModel[]>(apikey.api + `/municipalities/department/${iddepartamento}`);
  }
  getMunicipalityDataByDepartment(nameMunicipio: string, iddepartamento: number){
    let urls = apikey.api + `/municipalities/${nameMunicipio}/${iddepartamento}`;
    console.log("la url es: "+urls);

    return this.http.get<MunicipalitydataModel[]>(apikey.api + `/municipalities/${nameMunicipio}/${iddepartamento}`);
  }

  // list department and municipalities
  getlistofdep() {
    return this.http.get<DepartmentModel[]>(apikey.api + '/department/list');
  }
  // data acumulated from each department
  getdataacumulated(){
    return this.http.get<AcumulatedDepartmentModel[]>(apikey.api+"/department/all/accumulated")
  }
}
