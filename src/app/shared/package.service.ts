import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Package } from './package.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }

  private _refreshsNeeded = new Subject<void>();

  get refreshNeeded(){
    return this._refreshsNeeded;
  }

  selectedPackage: Package = {
    _id:"",
    name :'',
    domaine: '',
    fournisseur: '',
    services: [''],
    price: '',
    date:''
  };
  Package: Package[];

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  Header = { headers: new HttpHeaders({ 'Authorization': 'Bearer '+ this.getToken()}) };
  
  postPackage(Package){
    return this.http.post('http://localhost:3000/packages/',Package,this.Header);
  }
  AddServiceToPackage(Service){
    return this.http.post('http://localhost:3000/packages/addService',Service,this.Header);
  }
  putPackage(Package) {
    return this.http.put(`http://localhost:3000/packages/${Package._id}`,Package,this.Header);
  }
  deletePackage(_id: string) {
    return this.http.delete(`http://localhost:3000/packages/${_id}`,this.Header);
  }
  getPackageList() {
    return this.http.get('http://localhost:3000/packages/',this.Header);
  }
  getServiceCanAdd(packId) {
    return this.http.get(`http://localhost:3000/packages/servicesCanAdd/${packId}`,this.Header);
  }
  getServicesOfPackage(packageid) {
    return this.http.get(`http://localhost:3000/packages/allservices/${packageid}`,this.Header)
    .pipe(
      tap(()=>{
        this._refreshsNeeded.next();
      })
    );
  }

  deleteServiceFromPackage(Service){
    return this.http.post('http://localhost:3000/packages/removeService',Service,this.Header);
  }


  //helpper

  getToken() {
    return localStorage.getItem('token');
  }
  
}


