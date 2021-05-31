import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import apikey from '../shared/apikey';
import {User} from '../models/User';
import {UserInformation} from '../models/UserInformation';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //get user information by user Id
  getuserbyId(userid){
    return this.http.get<UserInformation>(apikey.api+`/person/${userid}`);
  }
}
