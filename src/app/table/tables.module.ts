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
import { TableFournisseursInactiveComponent } from './table-fournisseurs-non_active/table-fournisseurs-inactive.component';
import { TableAbonnementsComponent } from './table-abonnements/table-abonnements.component';
import { TableAbonnementsEnAttenteComponent } from './table-abonnements-enattente/table-abonnements-enattente.component';
import { TablepackagesComponent } from './tablepackages/tablepackages.component';
import { CustomTemp } from './tablepackages/customTemp.component';
import { TableServicesComponent } from './table-services/table-services.component';
import { TableClientComponent } from './table-client/table-clients.component';
import { FormsModule } from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';



@NgModule({
  imports: [
    RouterModule.forChild(TablesRoutes),
    CommonModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    FormsModule,
    MultiSelectModule,
    ToastModule,
    ButtonModule
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
    TableAbonnementsEnAttenteComponent,
    TablepackagesComponent,
    TableServicesComponent,
    TableFournisseursInactiveComponent,
    TableClientComponent,
    CustomTemp,
  ],
  entryComponents:[
    CustomTemp,
  ]
})
export class TablesModule {}
