import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dashboard} from '../models/dashboard.model';
import apikey from '../shared/apikey';
import {DepartmentModel} from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {
  }
  getDepartments() {
    return this.http.get<DepartmentModel[]>(apikey.api + '/data/departments/');
  }
}
