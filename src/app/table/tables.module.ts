import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { TablesRoutes } from './tables.routing';
import { DatatableComponent } from './data-table/data-table.component';
import { SmarttableComponent } from './smart-table/smart-table.component';

import { BasictableComponent } from './basic/basic.component';
import { DarktableComponent } from './dark-basic/dark.component';
import { ColortableComponent } from './color-table/color.component';
import { TablesizeComponent } from './sizing/size.component';
import { TableFournisseursComponent } from './table-fournisseurs/table-fournisseurs.component';
import { TableAdminComponent } from './table-admin/table-admin.component';
import { TableAbonnementsComponent } from './table-abonnements/table-abonnements.component';
import { TablepackagesComponent } from './tablepackages/tablepackages.component';
import { TableReservationsComponent } from './table-reservations/table-reservations.component';

@NgModule({
  imports: [
    RouterModule.forChild(TablesRoutes),
    CommonModule,
    NgxDatatableModule,
    Ng2SmartTableModule
  ],
  declarations: [
    DatatableComponent,
    BasictableComponent,
    DarktableComponent,
    ColortableComponent,
    TablesizeComponent,
    SmarttableComponent,
    TableFournisseursComponent,
    TableAdminComponent,
    TableAbonnementsComponent,
    TablepackagesComponent,
    TableReservationsComponent
  ]
})
export class TablesModule {}
