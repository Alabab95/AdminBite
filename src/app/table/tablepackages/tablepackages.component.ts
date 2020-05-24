import { Component, OnInit,Input, ViewChild } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../shared/user.service';
import { PackageService } from '../../shared/package.service';
import { ServicesService } from '../../shared/services.service';
import {MessageService} from 'primeng/api';

import { Router } from "@angular/router";
import { User } from 'src/app/shared/user.model';
import { Package } from 'src/app/shared/package.model';
import { Service } from 'src/app/shared/service.model';
import { Cell, DefaultEditor, Editor} from 'ng2-smart-table';

import { HttpHeaders } from '@angular/common/http';
@Component({
  templateUrl: './tablepackages.component.html',
  styles : [`
  :host ::ng-deep button {
      margin-right: .25em;
  }

  :host ::ng-deep .custom-toast .ui-toast-message {
      background: #FC466B;
      background: -webkit-linear-gradient(to right, #3F5EFB, #FC466B);
      background: linear-gradient(to right, #3F5EFB, #FC466B);
  }

  :host ::ng-deep .custom-toast .ui-toast-message div {
      color: #ffffff;
  }

  :host ::ng-deep .custom-toast .ui-toast-message.ui-toast-message-info .ui-toast-close-icon {
      color: #ffffff;
  }
`],
  providers:[PackageService,MessageService,UserService]
}) 

export class TablepackagesComponent implements OnInit {
  
  @Input() variable  = "value";
  currentPackageSelected;
  serviceToDelete;
  packageToDelete;
  fournisseur = false;
  source: LocalDataSource;
  source2: LocalDataSource;
  boolAdd :Boolean = false ;
  constructor(private userService : UserService,private messageService: MessageService,private ServicesService:ServicesService,private packageService : PackageService,private router : Router) {
    this.source = new LocalDataSource(tableData.data); // create the source
    this.source2 = new LocalDataSource(tableData.data); // create the source
   }
   serviceslist;
   allservices;
   settings = tableData.settings;
   settings2 = tableData.settings2;
   async ngOnInit(){
    console.log(this.userService.selectedUser);
    await this.userService.getUserProfile().subscribe(
      res => {
        this.userService.selectedUser = res['user'];
        //console.log(this.userService.selectedUser);
        if( res['user'].role == "fournisseur"){
          this.settings.columns.fournisseur.addable = false;
        }else this.settings.columns.fournisseur.addable = true;
        this.settings = Object.assign({},this.settings);
        console.log(this.userService.selectedUser);
        this.ServicesService.Service = [];
        this.allservices = [];
        this.refreshPackagesList();
        let tab = [];
      },
      err => {
        console.log(err);
      }
    )
    
    // this.packageService.refreshNeeded.subscribe(()=>{
    //   this.allservicesOfPackage(this.currentPackageSelected);
    // });
    /*this.ServicesService.getServiceList().subscribe((res) => {
      this.ServicesService.Service = res['services'] as Service[];
      this.serviceslist = res['services'];
      this.serviceslist.forEach(element => {
        console.log('servie : ' + element.name);
        let obj = {
          value : element._id,
          title : element.name
        }
        tab.push(obj);
      });
      
      //this.settings.columns.services.editor.config.list = tab;
      //this.settings = Object.assign({},this.settings);
      });*/
    //this.source2 = new LocalDataSource(tableData.data); // create the source
   }

   showSuccess(summary,detail) {
    this.messageService.add({severity:'success', summary: summary, detail: detail});
   }
   addRecord(event) {
    console.log(event.newData);
    var services = [];
    event.newData.services!=""?services=event.newData.services:services=[];
    console.log("services=",services);
    console.log("founisseur :",event.newData.fournisseur)
    console.log("fournisseur",this.userService.selectedUser._id);

    var data =  {
      "_id": '',
      "name" : event.newData.name,
      "domaine" : event.newData.domaine,
      "fournisseur" : this.userService.selectedUser._id,
      "services" : services,
      "price" : event.newData.price
    }
    this.packageService.postPackage(data).subscribe(
      res => {
        this.boolAdd = false;
        console.log("success");
        event.confirm.resolve(event.newData);
        //this.router.navigateByUrl('/fournisseurs/tablefournisseurs');
        this.showSuccess('Package','package ajouté avec succès');
        this.refreshPackagesList();
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
    "price" : event.newData.price,
    "date" : event.newData.date
  }
  console.log(data);
  this.packageService.putPackage(data).subscribe(
    res => {

      console.log("success");
      this.showSuccess('Package','Package modifié avec succès')
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
    "price" : event.newData.price
  }
  this.packageService.putPackage(data).subscribe(
    res => {

      console.log("success");
      this.router.navigateByUrl('/packages/tablepackages');

    },
    err => {
      console.log("fail",err);
    }
  );

}

showConfirmToDeleteService(event) {
  this.serviceToDelete = event;
  this.messageService.clear();
  this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'êtes-vous sûr?', detail:'êtes-vous sûr de vouloir supprimer ce service!!'});
}

showConfirmToDeletePackage(event) {
  this.packageToDelete = event;
  this.messageService.clear();
  this.messageService.add({key: 'd', sticky: true, severity:'warn', summary:'êtes-vous sûr?', detail:'êtes-vous sûr de vouloir supprimer le package!!'});
}
onReject() {
  this.messageService.clear('c');
}
onRejectdelPack() {
  this.messageService.clear('d');
}

onConfirm() {
  this.onRefus(this.serviceToDelete);
  this.messageService.clear('c');
}
onConfirmdelPack() {
  this.deleteRecord(this.packageToDelete);
  this.messageService.clear('d');
}
onRefus(event) {
  console.log(event);
  var data =  {
    "serviceId": event._id,
    "name" : event.name,
    "price" : event.price,
    "descrition" : event.descrition,
    "state" : event.state,
    "fournisseurId" : event.fournisseurId,
    "packageId" : this.currentPackageSelected
  }
  this.packageService.deleteServiceFromPackage(data).subscribe(
    res =>{
      this.refreshPackagesList();
      this.allservicesOfPackage(this.currentPackageSelected);
    }
  )

}
allservicesOfPackage(packId){
  this.packageService.getServicesOfPackage(packId).subscribe(res=>{
    this.ServicesService.Service = res['services'];
  });
}

async test(event){
  console.log(event);
  var selectedRow = event.selected;
  console.log(selectedRow);
  let services = [];
  if(event.isSelected == false){
    this.ServicesService.Service = [];
    this.allservices = [];
  }
  if(selectedRow.length > 0)
  {
    await this.packageService.getServicesOfPackage(selectedRow[0]._id).subscribe(res=>{
      services = res['services'];
     // console.log(services);
      this.ServicesService.Service = services;
      this.currentPackageSelected = selectedRow[0]._id
     // console.log(this.currentPackageSelected);
      this.packageService.getServiceCanAdd(this.currentPackageSelected).subscribe(res=>{
        this.allservices = res;
      })
    });
    
}
 //console.log(this.ServicesService.Service);
}

deleteRecord(event){
  this.packageService.deletePackage(event.data._id).subscribe(
    res => {

      console.log("success");
      this.refreshPackagesList();
      this.ServicesService.Service=[];
      this.allservices=[]
      event.confirm.resolve(event.source.data);

    },
    err => {
      console.log("fail",err);
    }
  );
}

testAdd(event){
  console.log(this.boolAdd);
  this.boolAdd = true;
}

refreshPackagesList(){
  this.packageService.getPackageList().subscribe(async (res) => {
  this.packageService.Package = res as Package[];
    console.log( this.packageService.Package);
    await this.packageService.Package.forEach(elem => delete elem.services);
    this.source = new LocalDataSource(this.packageService.Package);
    console.log(this.source);
    });
}


AddServiceToPackage(event) {
  console.log(event);
  var data =  {
    "_id": event._id,
    "name" : event.name,
    "price" : event.price,
    "description" : event.description,
    "state" : event.state,
    "fournisseurId" : event.fournisseurId,
    "packageId" : this.currentPackageSelected
  }
  console.log(data);
  this.packageService.AddServiceToPackage(data).subscribe(res =>{
    this.showSuccess('Service','service ajouté au package avec succès');
    this.refreshPackagesList();
    this.allservicesOfPackage(this.currentPackageSelected);
    this.packageService.getServiceCanAdd(this.currentPackageSelected).subscribe(res=>{
      this.allservices = res;
    })
  });
}

}
