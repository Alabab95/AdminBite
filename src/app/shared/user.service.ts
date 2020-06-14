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
    image:null,
    saltSecret: ''
  };
  users: User[];

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  Header = { headers: new HttpHeaders({ 'Authorization': 'Bearer '+this.getToken()}) };
  
  postUser(user){
    const userData = new FormData();
    userData.append("user",user);
    userData.append("login",user.login);
    userData.append("password",user.password);
    userData.append("firstName",user.firstName);
    userData.append("lastName",user.lastName);
    userData.append("adress",user.adress);
    userData.append("society",user.society);
    userData.append("activity",user.activity);
    userData.append("phone",user.phone);
    userData.append("mail",user.mail);
    userData.append("etat",user.etat);
    if(user.image) userData.append("image",user.image,user.login);
    console.log(user);
    console.log(userData.get('user'));
    return this.http.post(environment.apiBaseUrl+'/register-fournisseur',userData,this.noAuthHeader);
  }
  postadmin(user){
    return this.http.post(environment.apiBaseUrl+'/register-admin',user,this.noAuthHeader);
  }
  postclient(user){
    return this.http.post(environment.apiBaseUrl+'/register-client',user,this.noAuthHeader);
  }
  putUser(user) {  
    const userData = new FormData();
    console.log(user.image);
    if(user.login) userData.append("login",user.login);
    if(user.password) userData.append("password",user.password);
    if(user.firstName) userData.append("firstName",user.firstName);
    if(user.lastName) userData.append("lastName",user.lastName);
    if(user.adress) userData.append("adress",user.adress);
    if(user.society) userData.append("society",user.society);
    if(user.activity) userData.append("activity",user.activity);
    if(user.phone) userData.append("phone",user.phone);
    if(user.mail) userData.append("mail",user.mail);
    if(user.etat) userData.append("etat",user.etat);
    if(typeof user.image === 'object') userData.append("image",user.image,user.login); else  userData.append("image",user.image); 
    return this.http.put(environment.apiBaseUrl + `/update/${user._id}`,userData,this.Header)
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
  resetpass(form) {
    return this.http.post(environment.apiBaseUrl + '/resetpass', form,this.Header);
  }


  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile',this.Header);
  }


  //Helper Methods

  setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
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


