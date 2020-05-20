import { Component } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  templateUrl: './table-abonnements-enattent.component.html',
})
export class TableAbonnementsEnAttenteComponent {

  source: LocalDataSource;
  source2: LocalDataSource;
  services = [];
  abonements = tableData.data;
  constructor() {
    this.source = new LocalDataSource(tableData.data); // create the source
    this.source2 = new LocalDataSource(tableData.data); // create the source
   }

   settings = tableData.settings;
   settings2 = tableData.settings2;
   test(abonement){
    console.log(abonement);
   }
   accepter(abonement){
    this.abonements.map(a =>{
      if(a==abonement) a.etat = "accepté"
    })
   }
   refuser(abonement){
    this.abonements.map(a =>{
      if(a==abonement) a.etat = "refuser"
    })
    
  }

}
