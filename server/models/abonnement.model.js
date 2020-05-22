const mongoose = require('mongoose');

const AbonnementSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : { type : String , required : true, unique:true},
    fournisseur : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required :true},
    //fournisseur : {type : String , required : true},
    client : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required :true},
    //client : {type : String , required : true},
    package : {
        _id : mongoose.Schema.Types.ObjectId,
        name : { type : String , required : true },
        domaine : { type : String , required : true },
        fournisseur : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required :true},
        //fournisseur : {type : String , required : true},
        services : [{type :mongoose.Schema.Types.ObjectId , ref : 'Service'}],
        price : {type : Number},
        date : {type : Date}   
    },
    services :[
        {
            _id : mongoose.Schema.Types.ObjectId,
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
        }
    ],
    price : {type : Number},
    etat : {type : String , required:true,enum:["non paye","paye"]},
    date : {type : Date}
});

mongoose.model('Abonnement',AbonnementSchema);