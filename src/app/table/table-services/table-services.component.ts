import { Component, OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../shared/user.service';
import { ServicesService} from '../../shared/services.service';
import { Router } from "@angular/router";
import { Service } from 'src/app/shared/service.model';
import { HttpHeaders } from '@angular/common/http';
@Component({
  templateUrl: './table-servicess.component.html',
  providers:[ServicesService]
})
export class TableServicesComponent implements OnInit {
  source: LocalDataSource;
  source2: LocalDataSource;
  constructor(private ServicesService : ServicesService,private router : Router) {
    this.source = new LocalDataSource(tableData.data); // create the source
    this.source2 = new LocalDataSource(tableData.data); // create the source
   }
   ngOnInit(){
    this.refreshUserList();
    this.source2 = new LocalDataSource(tableData.data); // create the source
   }

   settings = tableData.settings;
   settings2 = tableData.settings2;
   addRecord(event) {
    var data =  {          
      "_id": '',
      "name" : event.newData.name,
      "price" : event.newData.price,
      "description" : event.newData.description,
      "state" : event.newData.state,
      "fournisseurId" : event.newData.fournisseurId
    }
    this.ServicesService.postService(data).subscribe(
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
    "price" : event.newData.price,
    "description" : event.newData.description,
    "state" : event.newData.state,
    "fournisseurId" : event.newData.fournisseurId
  }
  console.log(data);
  this.ServicesService.putService(data).subscribe(
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
    "_id": event._id,
    "name" : event.newData.name,
    "price" : event.newData.price,
    "description" : event.newData.description,
    "state" : event.newData.state,
    "fournisseurId" : event.newData.fournisseurId

  }
  this.ServicesService.putService(data).subscribe(
    res => {
      console.log("success");
      this.router.navigateByUrl('/services/tableservices');

    },
    err => {
      console.log("fail",err);
    }
  );

}
test(event){
  var selectedRow = event.selected;
  console.log(selectedRow);
}

onRefus(event) {
  console.log("updating");
  var data =  {
    "_id": event._id,
    "name" : event.newData.name,
    "price" : event.newData.price,
    "description" : event.newData.description,
    "state" : event.newData.state,
    "fournisseurId" : event.newData.fournisseurId

  }
  this.ServicesService.putService(data).subscribe(
    res => {
      console.log("success");
      this.router.navigateByUrl('/services/tableservices');


    },
    err => {
      console.log("fail",err);
    }
  );

}

deleteRecord(event){
  this.ServicesService.deleteService(event.data._id).subscribe(
    res => {

      console.log("success");
      event.confirm.resolve(event.source.data);

    },
    err => {
      console.log("fail",err);
    }
  );

}


refreshUserList(){
  this.ServicesService.getServiceList().subscribe((res) => {
  this.ServicesService.Service = res['services'] as Service[];
    console.log( this.ServicesService.Service);
    this.source = new LocalDataSource(this.ServicesService.Service);
  });

}
}

