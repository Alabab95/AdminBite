import { Component,OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from "@angular/router";
import { UserService } from '../../shared/user.service';
import { User } from 'src/app/shared/user.model';
import { HttpHeaders } from '@angular/common/http';
import {MessageService} from 'primeng/api';

@Component({
  templateUrl: './table-admin.component.html',
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
  providers:[UserService,MessageService]
})
export class TableAdminComponent implements OnInit {
  source: LocalDataSource;
  source2: LocalDataSource;
  userToDelete;
  constructor(private messageService: MessageService,private userService : UserService,private router : Router) {
    this.source = new LocalDataSource(tableData.data); // create the source
    this.source2 = new LocalDataSource(tableData.data); // create the source
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
  showWarn(summary,detail) {
    this.messageService.add({severity:'warn', summary: summary, detail: detail});
  }
  showError() {
    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
  }
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'êtes-vous sûr?', detail:'êtes-vous sûr de vouloir supprimer cet admin ?'});
  }
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
        this.showSuccess("User","Admin ajouté avec succés")
        this.refreshUserList();
      },
      err => {
        this.showWarn("erreur","données invalide");
        event.confirm.reject();
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
      this.showSuccess("User","Admin "+data.login+" modifié avec succés")
      this.refreshUserList();

    },
    err => {
      this.showWarn("erreur","données invalide");
        event.confirm.reject();
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
      this.showWarn("erreur","données invalide");
        event.confirm.reject();
    }
  );

}

onRefus(event) {
  console.log("updating",event);
  var data =  {
    "_id": event.data._id,
    "login" : event.data.login,
    "password" : event.data.password,
    "phone" : event.data.phone,
    "mail" : event.data.mail,

  }
      this.deleteRecord(event)
      this.refreshUserList();

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

deleteRecord(event){
  this.userService.deleteUser(event.data._id).subscribe(
    res => {
      console.log("success");
      event.confirm.resolve(event.source.data);
      this.showSuccess("Admin","L'Admin "+event.data.firstName+" supprimé avec succès")
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
