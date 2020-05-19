const mongoose = require('mongoose');

 var ServiceSchema = new mongoose.Schema({
  name: {
      type: String,
      required: 'name can\'t be empty'
  },
  price: {
      type: Number,
      required: 'price can\'t be empty',
  },
  description: {
    type: String
  },
  state : {
    type : String
  },
  fournisseurId:{
    type : String,
    required: true
  }
  
});

module.exports = {
    ServiceSchema: ServiceSchema
};
