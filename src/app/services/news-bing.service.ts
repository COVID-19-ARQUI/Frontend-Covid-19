import { Injectable } from '@angular/core';
// import {Headers, Http, RequestOptions} from '@angular/http';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NewsBingService {

  constructor(private http: HttpClient) { }


}
