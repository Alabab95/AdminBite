const mongoose = require('mongoose');
const Package = mongoose.model('Package');
const Service = mongoose.model('Service');

module.exports.addServicesToPackage = (req,res,next) => {
  console.log("service id === ",req.body.serviceId);
  console.log("package id === ",req.body.packageId);
  Package.findById(req.body.packageId)
    /* .then(service => {
        if(!service) {
            return res.status(404).json({
                message : "Service not found"
            });
        }
        else {
          console.log("serviceee ",service)
        }
        Package.findById(req.body.packageId)
          .then(package => {
            if(!package){
              return res.status(404).json({
                message : "Package not found"
              });
            }
            else {
              package.services.push(service);
              console.log("package found",Package);
            }
          })
      })
     */  
      .then(package => {
        console.log(package);
        Service.findById(req.body.serviceId)
          .then(service => {
            package.services.push(service)
            var packPrice;
            package.services.map(id => {
              console.log("item ==",id)
              Service.findById(id)
                .then(service=> {
                  console.log("service mapping",service);
                  packPrice = packPrice + service.price;
                  console.log("package price ==",packPrice)
                  package.price= packPrice;
                })
                
            })
            
            res.status(201).json({
              message: "Added service successfully",
            });
            return package.save()
          })
          
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
       
}

module.exports.createPackage = (req,res,next) => {
    /* console.log("service id === ",req.body.serviceId);
    Service.findById(req.body.serviceId)
        .then(service => {
            if(!service) {
                return res.status(404).json({
                    message : "Service not found"
                });
            }
            else {
              console.log("serviceee ",service)
            } */
        const pack = new Package({
            _id : new mongoose.Types.ObjectId(),
            name : req.body.name,
            domaine : req.body.domaine,
            fournisseur :"alaba",
            services :[],
            price : 0,
            date : new Date()
        });
            
        //})
        pack
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message : "Package created",
                createdPackage : {
                    _id : result._id,
                    name : result.name,
                    domaine : result.domaine,
                    fournisseur :result.fournisseur,
                    services :result.services,
                    price : result.price,
                    date : result.date
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/packages/" + result._id
                  }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        });
}

module.exports.delete = (req,res,next)=> {
    Package.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Package deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/packages",
          body: { serviceId: "ID", quantity: "Number" }
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
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Service.update({_id : id},{ $set : updateOps})
      .exec()
      .then(result => {
        res.status(200).json({
          message : 'package updated',
          request : {
            type : 'GET',
            url : 'http://localhost:3000/packages/'+id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error : err
        });
    });
}

module.exports.allPackages = (req,res,next) => {
    Package.find()
    .select("_id name domaine fournisseur service price date")
    .populate('service', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        packages: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            name : doc.name,
            domaine : doc.domaine,
            fournisseur : doc.fournisseur,
            services : doc.services,
            price : doc.price,
            date : doc.date,
            request: {
              type: "GET",
              url: "http://localhost:3000/packages/" + doc._id
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

module.exports.returnPackage = (req,res,next) => {
    Package.findById(req.params.id)
    .populate('services','name price description state')
    .exec()
    .then(package => {
      if (!package) {
        return res.status(404).json({
          message: "Package not found"
        });
      }
      res.status(200).json({
        request: {
          PackageId : package._id,
          PackageName:package.name,
          Services : package.services,
          price : package.price,
          date : package.date,
          fournisseur : package.fournisseur,
          type: "GET",
          url: "http://localhost:3000/packages"
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

