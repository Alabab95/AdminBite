import { Component, OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../shared/user.service';
import { PackageService } from '../../shared/package.service';

import { Router } from "@angular/router";
import { User } from 'src/app/shared/user.model';
import { Package } from 'src/app/shared/package.model';

import { HttpHeaders } from '@angular/common/http';
@Component({
  templateUrl: './tablepackages.component.html',
  providers:[PackageService]
})
export class TablepackagesComponent implements OnInit {

  source: LocalDataSource;
  source2: LocalDataSource;
  constructor(private packageService : PackageService,private router : Router) {
    this.source = new LocalDataSource(tableData.data); // create the source
    this.source2 = new LocalDataSource(tableData.data); // create the source
   }
   ngOnInit(){
    this.refreshPackagesList();
    this.source2 = new LocalDataSource(tableData.data); // create the source
   }


   settings = tableData.settings;
   settings2 = tableData.settings2;
   addRecord(event) {
     console.log(event.newData);
    var data =  {
      "_id": '',
      "name" : event.newData.name,
      "domaine" : event.newData.domaine,
      "fournisseur" : event.newData.fournisseur,
      "services" : event.newData.services,
      "price" : event.newData.price,
      "date" : event.newData.date
    }
    this.packageService.postPackage(data).subscribe(
      res => {
        console.log("success");
        event.confirm.resolve(event.newData);
        this.router.navigateByUrl('/fournisseurs/tablefournisseurs');

      },
      err => {
        console.log("fail",err);
      }
    );
  }


updateRecord(event) {
  console.log("updating");
  var data =  {
    "_id": event.newData._id,
    "name" : event.newData.name,
    "domaine" : event.newData.domaine,
    "fournisseur" : event.newData.fournisseur,
    "services" : event.newData.services,
    "price" : event.newData.price,
    "date" : event.newData.date
  }
  this.packageService.putPackage(data).subscribe(
    res => {

      console.log("success");
      event.confirm.resolve(event.newData);

    },
    err => {
      console.log("fail",err);
    }
  );

}

onAccept(event) {
  console.log("updating");
  var data =  {
    "_id": '',
    "name" : event.newData.name,
    "domaine" : event.newData.domaine,
    "fournisseur" : event.newData.fournisseur,
    "services" : event.newData.services,
    "price" : event.newData.price,
    "date" : event.newData.date

  }
  this.packageService.putPackage(data).subscribe(
    res => {

      console.log("success");
      this.router.navigateByUrl('/fournisseurs/tablefournisseurs');

    },
    err => {
      console.log("fail",err);
    }
  );

}

onRefus(event) {
  console.log("updating");
  var data =  {
    "_id": '',
    "name" : event.newData.name,
    "domaine" : event.newData.domaine,
    "fournisseur" : event.newData.fournisseur,
    "services" : event.newData.services,
    "price" : event.newData.price,
    "date" : event.newData.date

  }
  this.packageService.putPackage(data).subscribe(
    res => {

      console.log("success");
      this.router.navigateByUrl('/fournisseurs/tablefournisseurs');


    },
    err => {
      console.log("fail",err);
    }
  );

}

deleteRecord(event){
  this.packageService.deletePackage(event.data._id).subscribe(
    res => {

      console.log("success");
      event.confirm.resolve(event.source.data);

    },
    err => {
      console.log("fail",err);
    }
  );

}


refreshPackagesList(){
  this.packageService.getPackageList().subscribe((res) => {
  this.packageService.Package = res as Package[];
    console.log( this.packageService.Package);
    console.log('nchllh');
    this.source = new LocalDataSource(this.packageService.Package);
  });

}

}
