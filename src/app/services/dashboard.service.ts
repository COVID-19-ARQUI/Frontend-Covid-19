import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Dashboard} from '../models/dashboard.model';
import apikey from '../shared/apikey';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  getdatadepartments() {
    return this.http.get<Dashboard[]>(apikey.api + '/dashboards');
  }
}
