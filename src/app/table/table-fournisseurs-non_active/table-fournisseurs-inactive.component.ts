import { Component, OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { User } from 'src/app/shared/user.model';
import { HttpHeaders } from '@angular/common/http';
@Component({
  templateUrl: './table-fournisseurs-inactive.component.html',
  providers:[UserService]
})
export class TableFournisseursInactiveComponent implements OnInit {
  source: LocalDataSource;
  source2: LocalDataSource;
  constructor(private userService : UserService,private router : Router) {
   }
   async ngOnInit(){
   await this.refreshUserList();
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

async refreshUserList(){
 await this.userService.getUserListFourniAtt().subscribe(res => {
    console.log(res);
      this.userService.users = res as User[];
  });

}
}

