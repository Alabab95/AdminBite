const mongoose = require('mongoose');

const AbonnementSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : { type : String , required : true },
    //fournisseur : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required :true},
    fournisseur : {type : String , required : true},
    //client : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required :true},
    client : {type : String , required : true},
    package : {type :mongoose.Schema.Types.ObjectId , ref : 'Package'},
    price : {type : Number},
    etat : {type : String , required:true},
    date : {type : Date}
});

mongoose.model('Abonnement',AbonnementSchema);