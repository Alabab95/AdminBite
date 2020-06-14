const mongoose = require('mongoose');
const Package = mongoose.model('Package');
const Service = mongoose.model('Service');
const Abonnement = mongoose.model('Abonnement');
const User = mongoose.model('User');

module.exports.TableAbonnements =(req,res,next) => {
    let details = []
    let occu = {}
    Abonnement.find()
    .populate("fournisseur","firstName")
      .exec() 
      .then(docs => {
        docs.map(item=>{
            !occu[item.package.name]?occu[item.package.name] = 1:occu[item.package.name]++;
            
            //occu.find(item.package.name)<0?occu['price'] = item.package.price:occu['price']+=item.package.price;
            let obj = {}
            obj['package'] = item.name;
            obj['fournisseur'] = item.fournisseur.firstName;
            obj['domaine'] = item.package.domaine;
            obj['price'] = item.package.price;

            details.push(obj)
        })
        console.log(details);
        console.log(occu);
        details.map(item=>{
            item['price'] *= occu[item.package];
            item['occu'] = occu[item.package];
        })
        res.status(200).json({
            'detail' : details
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
        
  }
module.exports.Services =(req,res,next) => {
  Service.find()
    .exec() 
    .then(docs => {
  
      res.status(200).json({count:docs.length})
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
      
}
module.exports.Clients =(req,res,next) => {
    User.find({"role":"client"})
      .exec() 
      .then(docs => {
    
        res.status(200).json({count:docs.length})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
        
  }
module.exports.Fournisseurs =(req,res,next) => {
    User.find({"role":"fournisseur"})
      .exec() 
      .then(docs => {
    
        res.status(200).json({count:docs.length})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
        
  }
module.exports.Packages =(req,res,next) => {
  Package.find()
    .exec() 
    .then(docs => {
      console.log("packages ",docs)
      res.status(200).json({
          count : docs.length
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
      
}

