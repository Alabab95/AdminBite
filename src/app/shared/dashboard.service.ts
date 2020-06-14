import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Dashboard {

  constructor(private http: HttpClient) { }

  

  Abonnements: any[];

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  Header = { headers: new HttpHeaders({ 'Authorization': 'Bearer '+ this.getToken()}) };
  
  nombreClients(){
    return this.http.get('http://localhost:3000/api/nbclients/',this.Header);
  }
  nombrePackages() {
    return this.http.get(`http://localhost:3000/api/nbpackages/`,this.Header);
  }
  nombreServices(){
    return this.http.get(`http://localhost:3000/api/nbservices/`,this.Header)
  }
  nombreFournisseurs(){
    return this.http.get(`http://localhost:3000/api/nbfournisseurs/`,this.Header)
  }
  detailsVente(){
    return this.http.get(`http://localhost:3000/api/abonnementsdetails/`,this.Header)
  }



  //helpper

  getToken() {
    return localStorage.getItem('token');
  }
  
}


