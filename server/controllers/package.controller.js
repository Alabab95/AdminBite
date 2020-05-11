const mongoose = require('mongoose');
const Package = mongoose.model('Package');
const Service = mongoose.model('Service');

module.exports.filterParDate = (req,res,next) => {
  Package.find({})
    .select("_id name domaine fournisseur service price date")
    .populate('services','name price description state')
    .sort('-date')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        packages: docs.map(doc => {
          console.log("doc.services =",doc.services)
          let price =0;
          doc.services.map(item => {
            price = price + item.price
          })
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            name : doc.name,
            domaine : doc.domaine,
            fournisseur : doc.fournisseur,
            services : doc.services,
            price : price,
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
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
}
module.exports.filterParDomaine = (req,res,next) => {
  console.log("domaine = ",req.body.domaine);
  Package.findOne({ 'domaine':req.body.domaine })
    .select("_id name domaine fournisseur service price date")
    .populate('services','name price description state')
    .exec()
    .then(docs => {
      if(!docs){
        return res.status(404).json({
          message : "domaine not found"
        })
      }
      res.status(200).json({
        count: docs.length,
        
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
module.exports.removeServiceFromPackage = (req,res,next) => {
  console.log("service id === ",req.body.serviceId);
  console.log("package id === ",req.body.packageId);
  Package.findById(req.body.packageId) 
    .then(package => {
      const index = package.services.indexOf(req.body.serviceId);
      if (index > -1) {
        package.services.splice(index, 1);
      }
      else {
        console.log("service not found")
        return res.status(404).json({
          message : "Service not found"
        });
      } 
      console.log("after delete ",package.services);
      res.status(200).json({
        message: "Removed service successfully",
      });
      return package.save() 
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
module.exports.addServicesToPackage = (req,res,next) => {
  console.log("service id === ",req.body.serviceId);
  console.log("package id === ",req.body.packageId);
  Package.findById(req.body.packageId) 
      .then(package => {
        console.log(package);
        Service.findById(req.body.serviceId)
          .then(service => {
            if(!service){
              return res.status(404).json({
                message : "Service not found"
              });
            }
            package.services.push(service)
            var packPrice=0;
            console.log("package price before ==",packPrice)
            package.services.map(id => {
              console.log("item ==",id)
              Service.findById(id)
                .then(service=> {
                  packPrice = packPrice + parseInt(service.price);
                  console.log("price =",parseInt(service.price))
                  console.log("package price after ==",packPrice)
                  
                })
                package.price= packPrice;
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
        console.log(req.body);
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
    Package.findByIdAndUpdate(id, { $set: req.body }, { new: true }, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    });
}

module.exports.allPackages = (req,res,next) => {
    Package.find()
    .select("_id name domaine fournisseur services price date")
    .populate('services','name price description state')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        packages: docs.map(doc => {
          console.log("doc.services =",doc.services)
          let price =0;
          doc.services.map(item => {
            price = price + item.price
          })
          return {
            _id: doc._id,
            name : doc.name,
            domaine : doc.domaine,
            fournisseur : doc.fournisseur,
            services : doc.services,
            price : price,
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

