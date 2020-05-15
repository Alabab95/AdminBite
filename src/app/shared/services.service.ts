import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Service } from './service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  private _refreshsNeeded = new Subject<void>();

  get refreshNeeded(){
    return this._refreshsNeeded;
  }

  selectedService: Service = {
    _id:"",
    name :'',
    price: '',
    description: '',
    state: ''
  };
  Service: Service[];

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  Header = { headers: new HttpHeaders({ 'Authorization': 'Bearer '+ this.getToken()}) };
  
  postService(Service: Service){
    return this.http.post('http://localhost:3000/services/',Service,this.Header);
  }
  putService(Service: Service) {
    return this.http.put(`http://localhost:3000/services/${Service._id}`,Service,this.Header);
  }

  deleteService(_id: string) {
    return this.http.delete(`http://localhost:3000/services/${_id}`,this.Header);
  }

  getServiceList() {
    return this.http.get('http://localhost:3000/services/',this.Header);
  }


  //helpper

  getToken() {
    return localStorage.getItem('token');
  }
  
}


