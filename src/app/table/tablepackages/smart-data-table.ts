import { multi } from "src/app/dashboards/dashboard-components/visitors/data";
import { CustomTemp } from "./customTemp.component";
import { Cell, DefaultEditor, Editor} from 'ng2-smart-table';

export let settings = {
  columns: {
    name: {
      title: 'Name',
      filter: true,
    },
    domaine: {
      title: 'Domaine',
      filter: true,
    },
    fournisseur: {
      title: 'Fournisseur',
      filter: true,
      editable : false,
      addable:false,
    },
    price: {
      title: 'Price',
      filter: true,
      editable : false,
      addable:false,
    },
    services : {
      title : 'Services',
      filter: false,
      type : 'html',
      editor : {
          type : 'custom',
          editable : false,
          valuePrepareFunction : (cell, row) => {
            return row.ColumnName;
          },
          component : CustomTemp 
      },
      editable : false
    }

  },
  add:{
    confirmCreate:true,
    createButtonContent: '<i style="margin: 10px;" class="skander">add</i>',
    cancelButtonContent: '<button class="btn">cancel</button>',
    
   },
  edit: {
    confirmSave:true,
    editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>',
    mode : 'inline',
  },
  delete: {
    confirmDelete: true,
    deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>',
    mode : 'inline',
  },
};
export let settings2 = {
  columns: {
    id: {
      title: 'ID',
      filter: false
    },
    name: {
      title: 'Name',
      filter: true
    },
    domaine: {
      title: 'Domaine',
      filter: true
    },
    fournisseur: {
      title: 'Fournisseur',
      filter: true
    },
    services: {
      title: 'Services',
      filter: true
    },
    price: {
      title: 'Price',
      filter: true
    },

  champ : {
    title : 'blabla',
    editor : {
      type :'list',
      config : {
        list: [{value : 'azekazek',title : 'azeaze'}]
      }
    }
  },
},
  add:{
    confirmCreate:true
   },
  edit: {
    confirmSave:true,
    editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>'
  },
  delete: {
    confirmDelete: true,
    deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>'
  },
};
export let data = [
  // {
  //   id: 1,
  //   name: 'Leanne Graham',
  //   username: 'Bret',
  //   email: '5'
  // },
  // {
  //   id: 2,
  //   name: 'Ervin Howell',
  //   username: 'Antonette',
  //   email: '156'
  // },
  // {
  //   id: 3,
  //   name: 'Clementine Bauch',
  //   username: 'Samantha',
  //   email: '10'
  // },
  // {
  //   id: 4,
  //   name: 'Patricia Lebsack',
  //   username: 'Karianne',
  //   email: '752'
  // },
  // {
  //   id: 5,
  //   name: 'Chelsey Dietrich',
  //   username: 'Kamren',
  //   email: '0'
  // },
  // {
  //   id: 6,
  //   name: 'Sunil Joshi',
  //   username: 'suniljoshi',
  //   email: '15'
  // },
  // {
  //   id: 7,
  //   name: 'Nirav joshi',
  //   username: 'niravjoshi',
  //   email: '29'
  // },
  // {
  //   id: 8,
  //   name: 'Vishal bhatt',
  //   username: 'vbhatt',
  //   email: '0'
  // },
  // {
  //   id: 9,
  //   name: 'Bhavesh patel',
  //   username: 'bhavesh',
  //   email: '302'
  // },
  // {
  //   id: 10,
  //   name: 'Darshan patel',
  //   username: 'Darshan',
  //   email: '6'
  // },
  // {
  //   id: 11,
  //   name: 'Hitesh patel',
  //   username: 'Hitesh',
  //   email: '123'
  // }
];
