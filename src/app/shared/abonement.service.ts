import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbonementService {

  constructor(private http: HttpClient) { }

  private _refreshsNeeded = new Subject<void>();

  get refreshNeeded(){
    return this._refreshsNeeded;
  }

  selectedPackage = {
    _id:"",
    name :'',
    client: '',
    fournisseur: '',
    price: '',
    date:'',
    etat:'',
    services: [''],
    package:''
  };
  Abonnements: any[];

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  Header = { headers: new HttpHeaders({ 'Authorization': 'Bearer '+ this.getToken()}) };
  
  postAbonnement(abonement){
    return this.http.post('http://localhost:3000/abonnements/',abonement,this.Header);
  }
  putabonement(id) {
    return this.http.put(`http://localhost:3000/abonnements/${id}`,this.Header);
  }
  activateServiceInAbonnement(abonement,serviceId) {
    return this.http.put(`http://localhost:3000/abonnements/activateService/${serviceId}`,abonement,this.Header);
  }
  disactivateServiceInAbonnement(abonement,serviceId) {
    return this.http.put(`http://localhost:3000/abonnements/disactivateService/${serviceId}`,abonement,this.Header);
  }
  deleteAbonement(_id: string) {
    return this.http.delete(`http://localhost:3000/abonnements/${_id}`,this.Header);
  }
  getAbonementPayeList() {
    return this.http.get('http://localhost:3000/abonnements/',this.Header);
  }
  getAbonementNonPayeList(){
    return this.http.get('http://localhost:3000/abonnements/nonpaye',this.Header);
  }
  getAbonement(id){
    return this.http.get(`http://localhost:3000/abonnements/singleAbonement/${id}`,this.Header);
  }
  getgroupe(){
    return this.http.get(`http://localhost:3000/abonnements/groupement`,this.Header);
  }
  getpackgroupe(){
    return this.http.get(`http://localhost:3000/abonnements/packgrop`,this.Header);
  }
  deleteServiceFromabonement(Service){
    return this.http.post('http://localhost:3000/abonnements/removeService',Service,this.Header);
  }


  //helpper

  getToken() {
    return localStorage.getItem('token');
  }
  
}


