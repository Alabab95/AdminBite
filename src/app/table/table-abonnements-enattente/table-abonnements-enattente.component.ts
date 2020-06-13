import { Component,OnInit } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { AbonementService } from '../../shared/abonement.service';
import {MessageService} from 'primeng/api';

@Component({
  templateUrl: './table-abonnements-enattent.component.html',
  providers:[AbonementService,MessageService]
})
export class TableAbonnementsEnAttenteComponent implements OnInit {

  source: LocalDataSource;
  source2: LocalDataSource;
  services = [];
  abonements = tableData.data;
  AbonnementToDelete;
  AbonnementToAdd;
  constructor(private AbonementService:AbonementService,private messageService:MessageService) {
    this.source = new LocalDataSource(tableData.data); // create the source
    this.source2 = new LocalDataSource(tableData.data); // create the source
   }

   settings = tableData.settings;
   settings2 = tableData.settings2;

   ngOnInit(){
    this.AbonementService.Abonnements = [];
    this.refreshAbonnementList();
    this.source2 = new LocalDataSource(tableData.data); // create the source
   }
   test(abonement){
    console.log(abonement);
   }
   accepter(abonement){
    console.log(abonement);
    this.AbonementService.putabonement(abonement._id).subscribe(res=>{
      this.refreshAbonnementList();
      this.showSuccess('Abonnement','Abonnement passe a l\'état payé','success');
    })
   }
   refuser(abonement){
    this.abonements.map(a =>{
      if(a==abonement) a.etat = "refuser"
    })
    
  }

  refreshAbonnementList(){
    this.AbonementService.getAbonementNonPayeList().subscribe((res) => {
    this.AbonementService.Abonnements = res['abonnements'];
      console.log(this.AbonementService.Abonnements);
      this.source = new LocalDataSource(this.AbonementService.Abonnements);
    });
  
  }
  showSuccess(summary,detail,type) {
    this.messageService.add({severity:type, summary: summary, detail: detail});
   }

   showConfirmToAcceptAbonnement(event){
    this.AbonnementToAdd  = event;
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'êtes-vous sûr?', detail:'êtes-vous sûr de vouloir passer l\'Abonnement a l\état accepter!!'});
   }

   showConfirmToDeleteAbonnement(event) {
    this.AbonnementToDelete = event;
    this.messageService.clear();
    this.messageService.add({key: 'd', sticky: true, severity:'warn', summary:'êtes-vous sûr?', detail:'êtes-vous sûr de vouloir supprimer l\'Abonnement!!'});
  }
  onReject() {
    this.messageService.clear('d');
  }
  onConfirm() {
    this.deleteAbonnement(this.AbonnementToDelete);
    this.messageService.clear('d');
  }
  onRejectacc() {
    this.messageService.clear('c');
  }
  onConfirmacc() {
    this.accepter(this.AbonnementToAdd);
    this.messageService.clear('c');
  }
  deleteAbonnement(abonnement){
    console.log(abonnement);
    this.AbonementService.deleteAbonement(abonnement._id).subscribe(res=>{
      this.refreshAbonnementList();
    })

  }

}
