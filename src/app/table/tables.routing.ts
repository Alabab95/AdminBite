import { Routes } from '@angular/router';

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
import { TableServicesComponent } from './table-services/table-services.component';
import { TableFournisseursInactiveComponent } from './table-fournisseurs-non_active/table-fournisseurs-inactive.component';
import { TableClientComponent } from './table-client/table-clients.component';
import { TableAbonnementsEnAttenteComponent } from './table-abonnements-enattente/table-abonnements-enattente.component';
export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'datatable',
        component: DatatableComponent,
        data: {
          title: 'Data Table',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Data Table' }
          ]
        }
      },
      {
        path: 'basictables',
        component: BasictableComponent,
        data: {
          title: 'Basic Tables',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Basic Tables' }
          ]
        }
      },
      {
        path: 'darktables',
        component: DarktableComponent,
        data: {
          title: 'Dark Tables',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Dark Tables' }
          ]
        }
      },
      {
        path: 'colortables',
        component: ColortableComponent,
        data: {
          title: 'Color Tables',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Color Tables' }
          ]
        }
      },
      {
        path: 'tablesizing',
        component: TablesizeComponent,
        data: {
          title: 'Table Sizing',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Table Sizing' }
          ]
        }
      },
      {
        path: 'smarttable',
        component: SmarttableComponent,
        data: {
          title: 'Smart Table',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Smart Table' }
          ]
        }
      },
      {
        path: 'tablefournisseurs',
        component: TableFournisseursComponent,
        data: {
          title: 'Fournisseurs',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Smart Table' }
          ]
        }
      },
      {
        path: 'tableadmin',
        component: TableAdminComponent,
        data: {
          title: 'Table Admin',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Smart Table' }
          ]
        }
      },
      {
        path: 'tableclient',
        component: TableClientComponent,
        data: {
          title: 'Table Admin',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Smart Table' }
          ]
        }
      },
      {
        path: 'tableabonnements',
        component: TableAbonnementsComponent,
        data: {
          title: 'Table Abonnements',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Smart Table' }
          ]
        }
      },
      {
        path: 'tableabonnementsenattente',
        component: TableAbonnementsEnAttenteComponent,
        data: {
          title: 'Table Abonnements en attente',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Smart Table' }
          ]
        }
      },
      {
        path: 'tablepack',
        component:TablepackagesComponent,
        data: {
          title: 'Table Packs',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Smart Table' }
          ]
        }
      },
      {
        path: 'tablefournisseursinactive',
        component:TableFournisseursInactiveComponent,
        data: {
          title: 'Table fourni',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Smart Table' }
          ]
        }
      },
      {
        
        path: 'tableservices',
        component:TableServicesComponent,
        data: {
          title: 'Services',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Smart Table' }
          ]
        }
      }
    ]
  }
];
