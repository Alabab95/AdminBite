import { Component,OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../shared/user.service';
import { AbonementService } from '../../shared/abonement.service';
import {MessageService} from 'primeng/api';
import { Router } from "@angular/router";
import { User } from 'src/app/shared/user.model';

@Component({
  templateUrl: './table-abonnements.component.html',
  providers:[AbonementService,MessageService]
})
export class TableAbonnementsComponent implements OnInit {

  source: LocalDataSource;
  source2: LocalDataSource;
  services = [];
  currentAbonnementSelected;
  AbonnementToDelete;
  constructor(private AbonementService:AbonementService,private messageService:MessageService) {
    this.source = new LocalDataSource(tableData.data); // create the source
    this.source2 = new LocalDataSource(tableData.data); // create the source
   }
   ngOnInit(){
    this.refreshAbonnementList();
    this.source2 = new LocalDataSource(tableData.data); // create the source
   }

   settings = tableData.settings;
   settings2 = tableData.settings2;

  async test(event){ 
    // this.services = event.data.services;
    // console.log(this.services);
    console.log(event);
    var selectedRow = event.selected;
    console.log(selectedRow);
    if(event.isSelected == false){
        this.services = [];
    }
    if(selectedRow.length > 0)
     {
        await this.AbonementService.getAbonement(selectedRow[0]._id).subscribe(res =>{
          console.log(res['abonnement'].services); 
          this.currentAbonnementSelected = res['abonnement']
          this.services=res['abonnement'].services;

        }); 
     }
  }

  add(service){
    console.log(service);
    this.AbonementService.activateServiceInAbonnement(this.currentAbonnementSelected,service._id).subscribe(res=>{
      console.log("c bn");
      this.services = res['services'];
      this.showSuccess('Abonnement','Service '+res['servicemodi'].name+' activé','success');
    })
  }
  remove(service){
    console.log(service);
    this.AbonementService.disactivateServiceInAbonnement(this.currentAbonnementSelected,service._id).subscribe(res=>{
      console.log("c bn");
      this.services = res['services'];
      this.showSuccess('Abonnement','Service '+res['servicemodi'].name+' deactivé','warn');
    })
  }
  refreshAbonnementList(){
    this.AbonementService.getAbonementPayeList().subscribe((res) => {
    this.AbonementService.Abonnements = res['abonnements'];
      console.log(this.AbonementService.Abonnements);
      this.source = new LocalDataSource(this.AbonementService.Abonnements);
    });
  
  }
  onReject() {
    this.messageService.clear('d');
  }
  onConfirm() {
    this.deleteAbonnement(this.AbonnementToDelete);
    this.messageService.clear('d');
  }
  deleteAbonnement(abonnement){
    console.log(abonnement);
    this.AbonementService.deleteAbonement(abonnement.data._id).subscribe(res=>{
      this.refreshAbonnementList();
      this.services = [];
    })

  }
  showConfirmToDeleteAbonnement(event) {
    this.AbonnementToDelete = event;
    this.messageService.clear();
    this.messageService.add({key: 'd', sticky: true, severity:'warn', summary:'êtes-vous sûr?', detail:'êtes-vous sûr de vouloir supprimer l\'Abonnement!!'});
  }

  showSuccess(summary,detail,type) {
    this.messageService.add({severity:type, summary: summary, detail: detail});
   }

}
