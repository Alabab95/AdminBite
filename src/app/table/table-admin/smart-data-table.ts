export let settings = {
  columns: {
    login: {
      title: 'login',
      width:200,
      filter: true,
    },
    phone: {
      title: 'Phone',
      filter: true
    },
    mail: {
      title: 'Mail',
      filter: true
    },
    password: {
      title: 'password',
      filter: false
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
export let data = [];
