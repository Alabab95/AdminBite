import { Component, OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { User } from 'src/app/shared/user.model';
import { HttpHeaders } from '@angular/common/http';
import {MessageService} from 'primeng/api';
@Component({
  templateUrl: './table-fournisseurs-inactive.component.html',
  providers:[UserService,MessageService]
})
export class TableFournisseursInactiveComponent implements OnInit {
  source: LocalDataSource;
  source2: LocalDataSource;
  constructor(private messageService: MessageService,private userService : UserService,private router : Router) {
   }
   async ngOnInit(){
   await this.refreshUserList();
   }

onAccept(event) {
  console.log(event);
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
      this.showSuccess('success','fournisseur','fournisseur '+event.firstName+' apprauvé avec succés');
      this.refreshUserList();

    },
    err => {
      console.log("fail",err);
    }
  );
  
}
showSuccess(etat,summary,detail) {
  this.messageService.add({severity:etat, summary: summary, detail: detail});
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
      this.showSuccess('error','fournisseur','fournisseur '+event.firstName+' a été refusé');
      this.refreshUserList();
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

