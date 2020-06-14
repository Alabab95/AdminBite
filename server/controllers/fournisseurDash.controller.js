const mongoose = require('mongoose');
const Package = mongoose.model('Package');
const Service = mongoose.model('Service');
const Abonnement = mongoose.model('Abonnement');
const User = mongoose.model('User');

module.exports.Ventes =(req,res,next) => {
  Abonnement.find({"fournisseur": req._id})
    
    .exec() 
    .then(docs => {
      let etat = {"paye":0,"nonpaye":0,"refuse":0}
      docs.map(item=>{
        if(item.etat=="paye"){
          etat.paye++
        }else if (item.etat=="non paye"){
          etat.nonpaye++
        }else{
          etat.refuse++
        }
      })
      console.log("etat ",etat)
      res.status(200).json(etat)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
      
}
module.exports.Clients =(req,res,next) => {
  Abonnement.find({"fournisseur": req._id})
    .select("client")
    .populate({
      path: 'client',
      model: 'User'
    })
    .exec() 
    .then(docs => {
      console.log("clients ",docs)
      res.status(200).json(docs)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
      
}

module.exports.NbPackages = (req,res,next) => {
    Package.find({"fournisseur": req._id})
    .exec()
    .then(docs => {
      res.status(200).json({"count":docs.length});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
}
