import { Component } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  templateUrl: './table-abonnements.component.html',
})
export class TableAbonnementsComponent {

  source: LocalDataSource;
  source2: LocalDataSource;
  services = [];
  constructor() {
    this.source = new LocalDataSource(tableData.data); // create the source
    this.source2 = new LocalDataSource(tableData.data); // create the source
   }

   settings = tableData.settings;
   settings2 = tableData.settings2;

  async test(event){
    console.log(event);
    this.services = event.data.services;
    console.log(this.services);
  }

  add(service){
    console.log(service);
    this.services.map(s =>{
      if(s.name == service.name){
        s.state= "done";
      }
    })
  }
  remove(service){
    console.log(service);
    this.services.map(s =>{
      if(s.name == service.name){
        s.state= "not done";
      }
    })
  }

}
