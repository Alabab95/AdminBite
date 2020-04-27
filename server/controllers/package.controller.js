const mongoose = require('mongoose');
const Package = mongoose.model('Package');
const Service = mongoose.model('Service');

module.exports.add = (req,res,next) => {
    const Package = new Package({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        domaine : req.body.domaine,
        fournisseur :"alaba",
        service :"1"
    });
}

module.exports.delete = (req,res,next)=> {

}

module.exports.update = (req,res,next) => {

}

module.exports.allPackages = (req,res,next) => {

}

module.exports.returnPackage = (req,res,next) => {


}

