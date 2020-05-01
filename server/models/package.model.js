const mongoose = require ('mongoose')

const packageSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : { type : String , required : true },
    domaine : { type : String , required : true },
    //fournisseur : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required :true},
    fournisseur : {type : String , required : true},
    service : {type :mongoose.Schema.Types.ObjectId , ref : 'Service'},
    price : {type : Number},
    date : {type : Date}
});

module.export = mongoose.model('Package',packageSchema);