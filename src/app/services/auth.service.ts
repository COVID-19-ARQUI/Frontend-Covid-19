import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import apikey from '../shared/apikey';
import {userLogin} from '../models/UserLogin';
import {User} from '../models/User';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL = apikey.api + '/oauth/token';
  constructor(private httpClient: HttpClient) {}

  // public signUp(newUser: Client): Observable<any> {
  //   return this.httpClient.post<any>(this.authURL + 'new', newUser);
  // }

  public logIn(logInUser: userLogin): Observable<any> {

    const credenciales = btoa(
      'covidtracerapp' + ':' + 'testcovid12345'
    );
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales,
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', logInUser.email);
    params.set('password', logInUser.password);
    // var userParams = params.toString().replace(/%40/gi, '@');

    return this.httpClient.post<any>(this.authURL, params.toString(), {
      headers: httpHeaders,
    });
  }

  createUser(user: User) {
    return this.httpClient.post(apikey.api + '/api/v1/user', user);
  }
}
