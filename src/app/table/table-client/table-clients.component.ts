import { Component, OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { User } from 'src/app/shared/user.model';
import { HttpHeaders } from '@angular/common/http';
@Component({
  templateUrl: './table-clients.component.html',
  styleUrls:['./table-Clients.component.css'],
  styles:[`
    th.ng2-smart-actions-title.ng2-smart-actions-title-add {
      visibility: hidden;
    }
  `],
  providers:[UserService]
})
export class TableClientComponent implements OnInit {
  source: LocalDataSource;
  source2: LocalDataSource;
  constructor(private userService : UserService,private router : Router) {
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
      "login" : event.newData.login,
      "password" : event.newData.password,
      "firstName" : event.newData.firstName,
      "lastName" : event.newData.lastName,
      "adress" :  event.newData.adress,
      "phone" : event.newData.phone,
      "mail" : event.newData.mail
    }
    this.userService.postclient(data).subscribe(
      res => {

        console.log("success");
        event.confirm.resolve(event.newData);
        this.refreshUserList();
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
    "login" : event.newData.login,
    "password" : event.newData.password,
    "firstName" : event.newData.firstName,
    "adress" :  event.newData.adress,
    "lastName" : event.newData.lastName,
    "phone" : event.newData.phone,
    "mail" : event.newData.mail

  }
  this.userService.putUser(data).subscribe(
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
    "login" : event.login,
    "password" : event.password,
    "firstName" : event.firstName,
    "lastName" : event.lastName,
    "adress" :  event.adress,
    "phone" : event.phone,
    "mail" : event.mail
  }
  this.userService.putUser(data).subscribe(
    res => {
      console.log("success");
      this.router.navigateByUrl('/fournisseurs/tablefournisseurs');

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
    "login" : event.login,
    "password" : event.password,
    "firstName" : event.firstName,
    "lastName" : event.lastName,
    "adress" :  event.adress,
    "phone" : event.phone,
    "mail" : event.mail
  }
  this.userService.postclient(data).subscribe(
    res => {

      console.log("success");
      this.refreshUserList();


    },
    err => {
      console.log("fail",err);
    }
  );

}
deleteRecord(event){
  this.userService.deleteUser(event.data._id).subscribe(
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
  this.userService.getUserListClient().subscribe((res) => {
  this.userService.users = res as User[];
    console.log( this.userService.users);
    this.source = new LocalDataSource(this.userService.users);
  });

}

}

