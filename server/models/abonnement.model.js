const mongoose = require('mongoose');
const ServiceSchema = require('./serviceShema')
const packageSchema = require('./packageShcema');

const AbonnementSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    //name : { type : String , required : true },
    //fournisseur : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required :true},
    //fournisseur : {type : String , required : true},
    client : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required :true},
    //client : {type : String , required : true},
    package : packageSchema,
    services :[ServiceSchema],
    price : {type : Number},
    etat : {type : String , required:true},
    date : {type : Date}
});

mongoose.model('Abonnement',AbonnementSchema);