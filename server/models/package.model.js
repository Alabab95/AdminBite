const mongoose = require ('mongoose')

const packageSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : { type : String , required : true },
    domaine : { type : String , required : true },
    fournisseur : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required :true},
    service : {type :mongoose.Schema.Types.ObjectId , ref : 'Service'},

});

module.export = mongoose.model('Package',packageSchema);