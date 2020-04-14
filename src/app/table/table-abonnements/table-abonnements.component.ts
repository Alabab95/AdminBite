import { Component } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  templateUrl: './table-abonnements.component.html',
})
export class TableAbonnementsComponent {

  source: LocalDataSource;
  source2: LocalDataSource;
  constructor() {
    this.source = new LocalDataSource(tableData.data); // create the source
    this.source2 = new LocalDataSource(tableData.data); // create the source
   }

   settings = tableData.settings;
   settings2 = tableData.settings2;


}
