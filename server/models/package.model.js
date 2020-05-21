const mongoose = require ('mongoose')
const packageSchema = require('./packageShcema');


module.export = mongoose.model('Package',packageSchema.packageSchema);
