const mongoose = require('mongoose');
const Package = mongoose.model('Package');
const Service = mongoose.model('Service');
const Abonnement = mongoose.model('Abonnement');
const User = mongoose.model('User');

module.exports.getAbonnementByClientId =(req,res,next) => {
  console.log("client id :",req.params.id)
  Abonnement.find({"client": req.params.id})
    .select("_id name fournisseur client package price etat date")
    .populate([{
      path: 'package',
      model: 'Package',
      populate: {
        path: 'services',
        model: 'Service'
      }
    }, {
      path: 'client',
      model: 'User'
    },{
      path: 'fournisseur',
      model: 'User'
    }])
    .exec() 
    .then(docs => {
      console.log(docs);
          res.status(200).json({
            count: docs.length,
            abonnement: docs.map(doc => {
              return {
                _id: doc._id,
                name : doc.name,
                client : doc.client,
                fournisseur : doc.fournisseur,
                package : doc.package,
                price : doc.price,
                etat : doc.etat,
                date : doc.date,
                request: {
                  type: "GET",
                  url: "http://localhost:3000/abonnements/" + doc._id
                }
              };
            })
          });
        
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
      
}

module.exports.filterParDate = (req,res,next) => {
    Abonnement.find({})
    .select("_id name fournisseur client package price etat date")
    .populate([{
      path: 'package',
      model: 'Package',
      populate: {
        path: 'services',
        model: 'Service'
      }
    }, {
      path: 'client',
      model: 'User'
    },{
      path: 'fournisseur',
      model: 'User'
    }])
    .sort('-date')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        abonnements: docs.map(doc => {
          return {
            _id: doc._id,
            name : doc.name,
            client : doc.client,
            fournisseur : doc.fournisseur,
            package : doc.package,
            price : doc.price,
            etat : doc.etat,
            date : doc.date,
            request: {
              type: "GET",
              url: "http://localhost:3000/abonnements/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
}

module.exports.removePackageFromAbonnement = (req,res,next) => {
  console.log("abonnement id === ",req.body.abonnementId);
  console.log("package id === ",req.body.packageId);
  Abonnement.findById(req.body.abonnementId) 
    .then(abonnement => {
      abonnement.package ={};
      res.status(200).json({
        message: "Removed package from abonnement successfully",
      });
      return abonnement.save() 
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
module.exports.addPackageToAbonnement = (req,res,next) => {
  console.log("abonnement id === ",req.body.abonnementId);
  console.log("package id === ",req.body.packageId);
  Abonnement.findById(req.body.abonnementId) 
      .then(abonnement => {
        console.log(abonnement);
        Package.findById(req.body.packageId)
          .then(package => {
            if(!package){
              return res.status(404).json({
                message : "package not found"
              });
            }
            abonnement.package =package;
            res.status(201).json({
              message: "Added package to abonnement successfully",
            });
            return abonnement.save()
          })
          
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
       
}

module.exports.createAbonnement = (req,res,next) => {
    package = req.body.package;
    let services = [];
    let i =0;
    package.services.forEach(async id_service => {
      i++;
      console.log(id_service)
      service = await Service.findById(id_service).select('name price description state fournisseurId');
      if(!service){
        return console.log("famch");
      }
      s = {
        name:service.name,
        price : service.price,
        description: service.description,
        state : service.state,
        fournisseurId:service.fournisseurId
      }
      services.push(s) 
      if( i == package.services.length){
        console.log(services);
        console.log(req._id);
        const abonnement = new Abonnement({
          _id : new mongoose.Types.ObjectId(),
          client :req._id,
          fournisseur:req.body.package.fournisseur,
          package : {
            _id : new mongoose.Types.ObjectId(),
            name:"sqccs",
            domaine :"qsdqsd",
            price : 40,
            fournisseur: "5eb24d37356dd20894e8d250",
            date:"2020-05-17T10:59:50.653+00:00",
            services: ["5ec118d43384dc1f38235c5e"]
          },
          services:services,
          price : req.body.package.price,
          date : new Date(),
          etat : "en cours",
      }); 
      console.log(abonnement); 
      console.log(req.body.package); 
      abonnement
        .save()
        .then(result => {
            res.status(201).json({
                message : "Abonnement created",
                createdAbonnement : {
                    _id : result._id,
                    name : result.name,
                    fournisseur :result.fournisseur,
                    client : result.client,
                    package :result.package,
                    services:result.services,
                    price : result.price,
                    etat : result.etat,
                    date : result.date
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/abonnements/" + result._id
                    }
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err
            });
        });
          }     
        });   
    
}

module.exports.delete = (req,res,next)=> {
    Abonnement.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Abonnement deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/abonnements",
          body: { packageId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

module.exports.update = (req,res,next) => {
    const id = req.params.id;
    Abonnement.findByIdAndUpdate(id, { $set: req.body }, { new: true }, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    });
}

module.exports.allAbonnements = (req,res,next) => {
    Abonnement.find()
    .select("_id name fournisseur client package price etat date")
    .populate([{
      path: 'package',
      model: 'Package',
      populate: {
        path: 'services',
        model: 'Service'
      }
    }, {
      path: 'client',
      model: 'User'
    },{
      path: 'fournisseur',
      model: 'User'
    }])
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        abonnements: docs.map(doc => {
          let price =0;
          price = doc.package.price
          return {
            _id : doc._id,
            name : doc.name,
            fournisseur :doc.fournisseur,
            client : doc.client,
            package :doc.package,
            price : price,
            etat : doc.etat,
            date : doc.date,
            request: {
              type: "GET",
              url: "http://localhost:3000/abonnements/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

module.exports.returnAbonnement = (req,res,next) => {
    Abonnement.findById(req.params.id)
    .populate([{
      path: 'package',
      model: 'Package',
      populate: {
        path: 'services',
        model: 'Service'
      }
    }, {
      path: 'client',
      model: 'User'
    },{
      path: 'fournisseur',
      model: 'User'
    }])
    .exec()
    .then(abonnement => {
      if (!abonnement) {
        return res.status(404).json({
          message: "Abonnement not found"
        });
      }
      res.status(200).json({
        request: {
          Id : abonnement._id,
          Name:abonnement.name,
          package : abonnement.package,
          price : abonnement.price,
          date : abonnement.date,
          etat : abonnement.etat,
          client : abonnement.client,
          fournisseur : abonnement.fournisseur,
          type: "GET",
          url: "http://localhost:3000/abonnements"
        }
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      });
    });
}

