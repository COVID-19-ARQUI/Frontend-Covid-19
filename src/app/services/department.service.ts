import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dashboard} from '../models/dashboard.model';
import apikey from '../shared/apikey';
import {DepartmentModel} from '../models/department.model';
import {Data} from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {
  }
  getDepartments() {
    return this.http.get<DepartmentModel[]>(apikey.api + '/department');
  }
  getgenneralvaccine(){
    return this.http.get<Data>(apikey.api+'/department/departmentvacuna/1');
  }
  getgenneralvaccine2(){
    return this.http.get<Data>(apikey.api+'/department/departmentvacuna2/1');
  }
  //move to datos servises dont forget
  getgenneralsum(){
    return this.http.get<Data[]>(apikey.api+'/data/general/29');
  }
  getgenneralsumdep(iddepartamento: number){
    return this.http.get<Data[]>(apikey.api + `/department/departmentgeneral/${iddepartamento}`);
  }
}
