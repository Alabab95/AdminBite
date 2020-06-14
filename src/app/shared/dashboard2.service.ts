import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Dashboard2 {

  constructor(private http: HttpClient) { }

  

  Abonnements: any[];

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  Header = { headers: new HttpHeaders({ 'Authorization': 'Bearer '+ this.getToken()}) };
  
  ventesFournisseur(){
    return this.http.get('http://localhost:3000/api/ventes/',this.Header);
  }
  nbPackages() {
    return this.http.get(`http://localhost:3000/api/nbpackages/`,this.Header);
  }
  detailsClients(){
    return this.http.get(`http://localhost:3000/api/clients/`,this.Header)
  }
  



  //helpper

  getToken() {
    return localStorage.getItem('token');
  }
  
}


