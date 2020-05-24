import { Component, OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../shared/user.service';
import { ServicesService} from '../../shared/services.service';
import { Router } from "@angular/router";
import { Service } from 'src/app/shared/service.model';
import { HttpHeaders } from '@angular/common/http';
import {MessageService} from 'primeng/api';
@Component({
  templateUrl: './table-servicess.component.html',
  styles: [`
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
  providers:[ServicesService,MessageService]
})
export class TableServicesComponent implements OnInit {
  source: LocalDataSource;
  source2: LocalDataSource;
  constructor(private messageService: MessageService,private ServicesService : ServicesService,private router : Router) {
    this.source = new LocalDataSource(tableData.data); // create the source
    this.source2 = new LocalDataSource(tableData.data); // create the source
   }
   ngOnInit(){
    this.refreshServicesList();
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
        this.showSuccess("Service",'service ajouté avec succès');
        this.refreshServicesList();

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
      this.showSuccess('Service','Service modifié avec succès')

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
      this.refreshServicesList();

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


refreshServicesList(){
  this.ServicesService.getServiceList().subscribe((res) => {
  this.ServicesService.Service = res['services'] as Service[];
    console.log( this.ServicesService.Service);
    this.source = new LocalDataSource(this.ServicesService.Service);
  });

}
}

