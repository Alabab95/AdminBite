 const mongoose = require('mongoose');

 const ServiceSchema = require('./serviceShema')

mongoose.model('Service', ServiceSchema.ServiceSchema);
