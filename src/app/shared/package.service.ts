import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Package } from './package.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }

  selectedPackage: Package = {
    _id:"",
    name :'',
    domaine: '',
    fournisseur: '',
    services: '',
    price: '',
    date:''
  };
  Package: Package[];

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  Header = { headers: new HttpHeaders({ 'Authorization': 'Bearer '+ this.getToken()}) };
  
  postPackage(Package: Package){
    const PackageData = new FormData();
    return this.http.post('http://localhost:3000/packages/',Package,this.Header);
  }
  putPackage(Package: Package) {
    return this.http.put(`http://localhost:3000/packages/${Package._id}`,Package,this.Header);
  }

  deletePackage(_id: string) {
    return this.http.delete(`http://localhost:3000/packages/${_id}`,this.Header);
  }

  getPackageList() {
    return this.http.get('http://localhost:3000/packages/',this.Header);
  }


  //helpper

  getToken() {
    return localStorage.getItem('token');
  }
  
}


