import { Component, OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { User } from 'src/app/shared/user.model';
import { HttpHeaders } from '@angular/common/http';
import {MessageService} from 'primeng/api';

@Component({
  templateUrl: './table-clients.component.html',
  styleUrls:['./table-clients.component.css'],
  styles:[`
    th.ng2-smart-actions-title.ng2-smart-actions-title-add {
      visibility: hidden;
    }
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
  providers:[UserService,MessageService]
})
export class TableClientComponent implements OnInit {
  source: LocalDataSource;
  source2: LocalDataSource;
  userToDelete;

  constructor(private messageService: MessageService,private userService : UserService,private router : Router) {
   }
   ngOnInit(){
    this.refreshUserList();
    this.source2 = new LocalDataSource(tableData.data); // create the source
   }

   settings = tableData.settings;
   settings2 = tableData.settings2;

    showSuccess(summary,detail) {
      this.messageService.add({severity:'success', summary: summary, detail: detail});
    }
    showError() {
      this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
    }
    showConfirm() {
      this.messageService.clear();
      this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'êtes-vous sûr?', detail:'êtes-vous sûr de vouloir supprimer ce service!!'});
    }
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
        this.showSuccess('Client','Le client '+data.firstName+' ajouté avec succès')
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
      this.showSuccess('Client','Le client '+data.firstName+' modifié avec succès')
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
  console.log("updating",event);
  var data =  {
    "_id": event.data._id,
    "login" : event.data.login,
    "password" : event.data.password,
    "firstName" : event.data.firstName,
    "lastName" : event.data.lastName,
    "adress" :  event.data.adress,
    "phone" : event.data.phone,
    "mail" : event.data.mail
  }
  this.userService.postclient(data).subscribe(
    res => {

      console.log("success");
      this.deleteRecord(event)


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
showConfirmToDeleteUser(event) {
  this.userToDelete=event;
  this.messageService.clear();
  this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'êtes-vous sûr?', detail:'êtes-vous sûr de vouloir supprimer cet admin!!'});
}
onReject() {
  this.messageService.clear('c');
}

onConfirm() {
  this.onRefus(this.userToDelete);
  this.messageService.clear('c');
}
refreshUserList(){
  this.userService.getUserListClient().subscribe((res) => {
  this.userService.users = res as User[];
    console.log( this.userService.users);
    this.source = new LocalDataSource(this.userService.users);
  });

}

}

