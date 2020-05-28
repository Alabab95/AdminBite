import { Routes } from '@angular/router';

import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { AuthGuard } from '../apps/auth/auth.guard';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: Dashboard1Component,canActivate:[AuthGuard],
        data: {
          title: 'Dashboard',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Dashboard' }
          ]
        }
      },
      {
        path: 'dashboard2',
        component: Dashboard2Component,
        data: {
          title: 'Dashboard Fournisseur',
          urls: [
            { title: 'Dashboard', url: '/dashboard2' },
            { title: 'Dashboard 2' }
          ]
        }
      },
      {
        path: 'dashboard3',
        component: Dashboard3Component,
        data: {
          title: 'Dashboard 3',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Dashboard 3' }
          ]
        }
      }
    ]
  }
];
