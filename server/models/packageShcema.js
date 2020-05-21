const mongoose = require ('mongoose')

const packageSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : { type : String , required : true, unique: true, sparse: true},
    domaine : { type : String , required : true },
    fournisseur : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required :true},
    //fournisseur : {type : String , required : true},
    services : [{type :mongoose.Schema.Types.ObjectId , ref : 'Service'}],
    price : {type : Number},
    date : {type : Date}
});
module.exports = {
    packageSchema: packageSchema
};