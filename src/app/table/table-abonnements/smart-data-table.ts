export let settings = {
    columns: {
    name: {
      title: 'Name',
      filter: true
    },
    fournisseur: {
      title: 'Package',
      filter: true
    },
    client: {
      title: 'client',
      filter: true
    },
    price: {
      title: 'price',
      filter: true
    },
    etat: {
      title: 'etat',
      filter: true
    },
    date: {
      title: 'date',
      filter: true
    }
  },
  actions:{
    add : false,
    edit:false
  },
  edit: {
    confirmSave:true,
    editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>'
  },
  delete: {
    confirmDelete:true,
    deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>'
  }
};
export let settings2 = {
  columns: {
    id: {
      title: 'ID',
      filter: false
    },
    name: {
      title: 'Full Name',
      filter: true
    },
    username: {
      title: 'User Name',
      filter: true
    },
    email: {
      title: 'Email',
      filter: true
    }
  },
  edit: {
    editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>'
  },
  delete: {
    deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>'
  }
};
export let data = [
  // {
  //   id: 1,
  //   name: 'abonement 5',
  //   fournisseur: "syrine",
  //   client:"skander",
  //   price:140,
  //   etat:"accepté",
  //   date:"2020-05-19T22:36:03.463Z",
  //   services:[{
  //     name : "service 1",
  //     price : 40,
  //     description : "description service 1 ",
  //     state:'done'
  //   },
  //   {
  //     name : "service 2",
  //     price : 100,
  //     description : "description service 2",
  //     state:'not done'
  //   }
  // ]
  // },
  // {
  //   id: 1,
  //   name: 'abonement 4',
  //   fournisseur: "amira",
  //   client:"skander",
  //   price:78,
  //   etat:"accepté",
  //   date:"2020-05-19T22:36:03.463Z",
  //   services:[{
  //     name : "service 5",
  //     price : 30,
  //     description : "description service 5 ",
  //     state:'done'
  //   },
  //   {
  //     name : "service 6",
  //     price : 48,
  //     description : "description service 6 ",
  //     state:'done'
  //   }
  // ]
  // },
  // {
  //   id: 1,
  //   name: 'abonement 8',
  //   fournisseur: "ala",
  //   client:"skander",
  //   price:130,
  //   etat:"accepté",
  //   date:"2020-09-19T22:36:03.463Z",
  //   services:[{
  //     name : "service 7",
  //     price : 30,
  //     description : "description service 7 ",
  //     state:'done'
  //   },
  //   {
  //     name : "service 2",
  //     price : 100,
  //     description : "description service 2 ",
  //     state:'done'
  //   }
  // ]
  // }
];
