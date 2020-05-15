import { RouteInfo } from './sidebar.metadata';

export const ROUTES_SA: RouteInfo[] = [
  
  {
    path: '',
    title: 'Personal',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/dashboard/dashboard',
    title: 'Dashboard',
    icon: 'icon-Car-Wheel',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Utilisateurs',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/apps/email',
    title: 'Gestion des Utilisateurs',
    icon: 'icon-Administrator',
    class: 'has-arrow',
    extralink: false,
    submenu: [
    {
      path: '/clients/tableadmin',
      title: 'Gestion des Admins',
      icon: '',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/fournisseurs/tablefournisseurs',
      title: 'Gestions des fournisseurs',
      icon: '',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/fournisseursinactive/tablefournisseursinactive',
      title: 'Fournisseurs En attente',
      icon: '',
      class: '',
      extralink: false,
      submenu: []
    }
  ]
  },
  {
    path: '',
    title: 'packages / abonnements',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/packages/tablepack',
    title: 'Gestion des packages',
    icon: 'icon-Paint-Brush',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/abonnements/tableabonnements',
    title: 'Gestion des Abonnements',
    icon: 'mdi mdi-notification-clear-all',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Services',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/services/tableservices',
    title: 'Gestion des Services',
    icon: 'mdi mdi-notification-clear-all',
    class: '',
    extralink: false,
    submenu: []
  }

];


export const ROUTES_A: RouteInfo[] = [
  {
    path: '',
    title: 'dfsdf',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '',
    title: 'Personal',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/dashboard/dashboard',
    title: 'Dashboard',
    icon: 'icon-Car-Wheel',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Utilisateurs',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/apps/email',
    title: 'Gestion des Utilisateurs',
    icon: 'icon-Administrator',
    class: 'has-arrow',
    extralink: false,
    submenu: [
    {
      path: '/fournisseurs/tablefournisseurs',
      title: 'Gestions des fournisseurs',
      icon: '',
      class: '',
      extralink: false,
      submenu: []
    },
    {
      path: '/admins/tableAdmins',
      title: 'Gestions des fournisseurs inactive',
      icon: '',
      class: '',
      extralink: false,
      submenu: []
    }
  ]
  },
  {
    path: '',
    title: 'packages / abonnements',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/packages/tablepackages',
    title: 'Gestion des packages',
    icon: 'icon-Paint-Brush',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/services/tableservices',
    title: 'Gestion des services',
    icon: 'icon-Paint-Brush',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/abonnements/tableabonnements',
    title: 'Gestion des Abonnements',
    icon: 'mdi mdi-notification-clear-all',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Reservations',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/services/tableservices',
    title: 'Gestion des Services',
    icon: 'mdi mdi-notification-clear-all',
    class: '',
    extralink: false,
    submenu: []
  }

];

export const ROUTES_F: RouteInfo[] = [
  {
    path: '',
    title: 'dfsdf',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '',
    title: 'Personal',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/dashboard/dashboard',
    title: 'Dashboard',
    icon: 'icon-Car-Wheel',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Utilisateurs',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/packages/tablepackages',
    title: 'Gestion des packages',
    icon: 'icon-Paint-Brush',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/services/tableservices',
    title: 'Gestion des services',
    icon: 'icon-Paint-Brush',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/abonnements/tableabonnements',
    title: 'Gestion des Abonnements',
    icon: 'mdi mdi-notification-clear-all',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Reservations',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/services/tableservices',
    title: 'Gestion des Services',
    icon: 'mdi mdi-notification-clear-all',
    class: '',
    extralink: false,
    submenu: []
  }

];
