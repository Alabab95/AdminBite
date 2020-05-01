import { Component, OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { User } from 'src/app/shared/user.model';
import { HttpHeaders } from '@angular/common/http';
@Component({
  templateUrl: './table-fournisseurs.component.html',
  providers:[UserService]
})
export class TableFournisseursComponent implements OnInit {
  source: LocalDataSource;
  source2: LocalDataSource;
  constructor(private userService : UserService,private router : Router) {
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
      "login" : event.newData.login,
      "password" : event.newData.password,
      "society" : event.newData.society,
      "activity" : event.newData.activity,
      "phone" : event.newData.phone,
      "mail" : event.newData.mail,
      "etat" : event.newData.etat,
      "saltSecret":''
    }
    this.userService.postUser(data).subscribe(
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
    "login" : event.newData.login,
    "password" : event.newData.password,
    "society" : event.newData.society,
    "activity" : event.newData.activity,
    "phone" : event.newData.phone,
    "mail" : event.newData.mail,
    "etat" : event.newData.etat,
    "saltSecret": ''

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
    "society" : event.society,
    "activity" : event.activity,
    "phone" : event.phone,
    "mail" : event.mail,
    "etat" : "approuvé",
    "saltSecret": ''

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

onRefus(event) {
  console.log("updating");
  var data =  {
    "_id": event._id,
    "login" : event.login,
    "password" : event.password,
    "society" : event.society,
    "activity" : event.activity,
    "phone" : event.phone,
    "mail" : event.mail,
    "etat" : 'Réfusée',
    "saltSecret": ''

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
  const header = {
    headers: new HttpHeaders().set("Authorization", "Bearer " + this.userService.getToken())
  }
  this.userService.getUserList().subscribe((res) => {
  this.userService.users = res as User[];
    console.log( this.userService.users);
    console.log('nchllh');
    this.source = new LocalDataSource(this.userService.users);
  });

}
}

