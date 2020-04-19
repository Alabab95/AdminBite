const mongoose = require('mongoose');

var ServiceSchema = new mongoose.Schema({
  name: {
      type: String,
      required: 'name can\'t be empty',
      unique: true
  },
  price: {
      type: String,
      required: 'price can\'t be empty',
  },
  description: { type: String}
  
});

mongoose.model('Service', ServiceSchema);
