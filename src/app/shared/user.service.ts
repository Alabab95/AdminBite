import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    _id:"",
    login: '',
    password: '',
    society: '',
    activity: '',
    phone:'',
    mail:'',
    etat:'',
    saltSecret: ''
  };
  users: User[];

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient) { }
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }
  putUser(user: User) {
    return this.http.put(environment.apiBaseUrl + `/update/${user._id}`, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(environment.apiBaseUrl + `/delete/${_id}`);
  }

  getUserList() {
    return this.http.get(environment.apiBaseUrl +'/list');
  }
  getAdminsList(society: string) {
    return this.http.get(environment.apiBaseUrl +`/delete/${society}`);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }


  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
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


