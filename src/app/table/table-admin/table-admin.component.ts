import { Component,OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from "@angular/router";
import { UserService } from '../../shared/user.service';
import { User } from 'src/app/shared/user.model';
import { HttpHeaders } from '@angular/common/http';
@Component({
  templateUrl: './table-admin.component.html',
  providers:[UserService]
})
export class TableAdminComponent implements OnInit {
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
      "phone" : event.newData.phone,
      "mail" : event.newData.mail,
    }
    this.userService.postadmin(data).subscribe(
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
  console.log(event);
  var data =  {
    "_id": event.newData._id,
    "login" : event.newData.login,
    "password" : event.newData.password,
    "phone" : event.newData.phone,
    "mail" : event.newData.mail,

  }
  this.userService.putUser(data).subscribe(
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

onAccept(event) {
  console.log("updating");
  var data =  {
    "_id": event._id,
    "login" : event.login,
    "password" : event.password,
    "phone" : event.phone,
    "mail" : event.mail,

  }
  this.userService.putUser(data).subscribe(
    res => {

      console.log("success");
      this.refreshUserList();

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
    "phone" : event.phone,
    "mail" : event.mail,

  }
  this.userService.putUser(data).subscribe(
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
      this.refreshUserList();

    },
    err => {
      console.log("fail",err);
    }
  );

}


refreshUserList(){
  this.userService.getUserListAdmin().subscribe((res) => {
  this.userService.users = res as User[];
    console.log( this.userService.users);
    console.log('nchllh');
    this.source = new LocalDataSource(this.userService.users);
  });

}


}
