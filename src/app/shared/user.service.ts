import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private _refreshsNeeded = new Subject<void>();

  get refreshNeeded(){
    return this._refreshsNeeded;
  }

  selectedUser = {
    _id:"",
    login: '',
    password: '',
    firstName: '',
    lastName:'',
    adress:'',
    society: '',
    activity: '',
    phone:'',
    mail:'',
    etat:'',
    saltSecret: ''
  };
  users: User[];

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  Header = { headers: new HttpHeaders({ 'Authorization': 'Bearer '+this.getToken()}) };
  
  postUser(user){
    return this.http.post(environment.apiBaseUrl+'/register-fournisseur',user,this.noAuthHeader);
  }
  postadmin(user){
    return this.http.post(environment.apiBaseUrl+'/register-admin',user,this.noAuthHeader);
  }
  postclient(user){
    return this.http.post(environment.apiBaseUrl+'/register-client',user,this.noAuthHeader);
  }
  putUser(user) {
    return this.http.put(environment.apiBaseUrl + `/update/${user._id}`,user,this.Header)
    .pipe(
      tap(()=>{
        this._refreshsNeeded.next();
      })
    );
  }
  deleteUser(_id: string) {
    return this.http.delete(environment.apiBaseUrl + `/delete/${_id}`,this.Header);
  }
  getUserList() {
    return this.http.get(environment.apiBaseUrl +'/list',this.Header);
  }
  getUserListClient() {
    return this.http.get(environment.apiBaseUrl +'/listclient',this.Header);
  }
  getUserListFourniAtt() {
    return this.http.get(environment.apiBaseUrl +'/listfourniatt',this.Header);
  }
  getUserListAdmin() {
    return this.http.get(environment.apiBaseUrl +'/listadmin',this.Header);
  }
  getAdminsList(society: string) {
    return this.http.get(environment.apiBaseUrl +`/delete/${society}`,this.Header);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }


  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile',this.Header);
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}


