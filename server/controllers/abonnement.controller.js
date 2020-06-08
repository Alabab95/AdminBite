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

module.exports.createAbonnement = async (req,res,next) => {
    let package = await Package.findById(req.params.id);
    console.log(package);
    let services = [];
    let i =0;
    if(package.services.length == 0){
      console.log("blabla")
      const abonnement = new Abonnement({
        _id : new mongoose.Types.ObjectId(),
        name:package.name,
        client :req._id,
        fournisseur:package.fournisseur,
        package : {
          _id : new mongoose.Types.ObjectId(),
          name: package.name,
          domaine : package.domaine,
          price : package.price,
          fournisseur: package.fournisseur,
          date:package.date,
          services: package.services
        },
        services:package.services,
        price : package.price,
        date : new Date(),
        etat : "non paye",
    });
    abonnement
      .save()
      .then(result => {
          res.status(200).json({
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
              }
          });
      })
      .catch(err => {
          res.status(500).json({
              error : err
          });
      });
    }else {
    package.services.forEach(async id_service => {
      console.log(i);
      console.log(package.services.length); 
      let service = await Service.findById(id_service).select('name price description state fournisseurId');
      if(!service){
        return console.log("famch");
      }
      let s = {
        _id: new mongoose.Types.ObjectId(),
        name: service.name,
        price : service.price,
        description: service.description,
        state : service.state,
        fournisseurId: service.fournisseurId
      }
      services.push(s);
      i++;
      if( i == package.services.length){
        console.log(i + " = " + package.services.length);
        console.log(services);
        const abonnement = new Abonnement({
          _id : new mongoose.Types.ObjectId(),
          name:package.name,
          client :req._id,
          fournisseur:package.fournisseur,
          package : {
            _id : new mongoose.Types.ObjectId(),
            name: package.name,
            domaine : package.domaine,
            price : package.price,
            fournisseur: package.fournisseur,
            date:package.date,
            services: package.services
          },
          services:services,
          price : package.price,
          date : new Date(),
          etat : "non paye",
      }); 
      console.log(abonnement);
      console.log(package);
      abonnement
        .save()
        .then(result => {
            res.status(200).json({
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
}

module.exports.delete = (req,res,next)=> {
    Abonnement.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Abonnement deleted",
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

module.exports.update =async (req,res,next) => {
  console.log(req.body);
  let servicemodif;
  let abonnement = await Abonnement.findById(req.params.id);
   abonnement.etat = 'paye';
  abonnement.save().then(()=>{
    return res.status(200).json({
      message : "ok",
    })
  });
}

module.exports.allAbonnements = (req,res,next) => {
    if(req.role == 'superadmin' || req.role == 'admin'){
      Abonnement
      .find({etat:'paye'})
      .populate('fournisseur','firstName')
      .populate('client','firstName')
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          abonnements: docs.map(doc => {
            return {
              _id : doc._id,
              name : doc.name,
              fournisseur : doc.fournisseur.firstName,
              client : doc.client.firstName,
              package : doc.package.name,
              services : doc.services,
              price : doc.price,
              etat : doc.etat,
              date : doc.date,
            };
          })
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
    });
    }else if(req.role == 'fournisseur'){
      Abonnement.find({fournisseur:req._id,etat :'paye'})
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
            services : doc.services,
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
    }else {
      Abonnement.find({client:req._id,etat :'paye'})
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
}

module.exports.allAbonnementsNonPaye = (req,res,next) => {
  if(req.role == 'superadmin' || req.role == 'admin'){
    Abonnement
    .find({etat:'non paye'})
    .populate('fournisseur','firstName')
    .populate('client','firstName')
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        abonnements: docs.map(doc => {
          return {
            _id : doc._id,
            name : doc.name,
            fournisseur : doc.fournisseur.firstName,
            client : doc.client.firstName,
            package : doc.package.name,
            price : doc.price,
            etat : doc.etat,
            date : doc.date,
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
  });
  }else {
  Abonnement.find({fournisseur:req._id,etat:'non paye'})
  .populate('fournisseur','firstName')
  .populate('client','firstName')
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      abonnements: docs.map(doc => {
        let price =0;
        price = doc.package.price
        return {
          _id : doc._id,
          name : doc.name,
          fournisseur : doc.fournisseur.firstName,
            client : doc.client.firstName,
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
}

module.exports.returnAbonnement = (req,res,next) => {
    Abonnement.findById(req.params.id)
    .then(abonnement => {
      if (!abonnement) {
        return res.status(404).json({
          message: "Abonnement not found"
        });
      }
      res.status(200).json({abonnement:abonnement});
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      });
    });
}


module.exports.activateService = async (req,res,next)=>{
  console.log(req.body);
  let servicemodif;
   let abonnement = await Abonnement.findById(req.body._id);
   abonnement.services.map(service =>{
      if(service._id == req.params.id){
        console.log(service.state);
        service.state = "DONE";
        servicemodif = service;
       // return res.json({message:"ok",service_state : service.state});
      }
   })
  abonnement.save().then(()=>{
    return res.status(200).json({
      message : "ok",
      services:abonnement.services,
      servicemodi : servicemodif
    })
  });
}

module.exports.disactivateService= async (req,res,next)=>{
  console.log(req.body);
  let servicemodif;
   let abonnement = await Abonnement.findById(req.body._id);
   abonnement.services.map(service =>{
      if(service._id == req.params.id){
        console.log(service.state);
        service.state = "NOT DONE";
        servicemodif = service;
       // return res.json({message:"ok",service_state : service.state});
      }
   })
  abonnement.save().then(()=>{
    return res.status(200).json({
      message : "ok",
      services:abonnement.services,
      servicemodi : servicemodif
    })
  });
}
