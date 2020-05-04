const mongoose = require('mongoose');
const Package = mongoose.model('Package');
const Service = mongoose.model('Service');

module.exports.createPackage = (req,res,next) => {
    console.log("service id === ",req.body.serviceId);
    Service.findById(req.body.serviceId)
        .then(service => {
            if(!service) {
                return res.status(404).json({
                    message : "Service not found"
                });
            }
            const package = new Package({
                _id : new mongoose.Types.ObjectId(),
                name : req.body.name,
                domaine : req.body.domaine,
                fournisseur :"alaba",
                service :req.body.serviceId,
                price : 10,
                date : new Date()
            });
            return package.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message : "Package created",
                createdPackage : {
                    _id : result._id,
                    name : result.name,
                    domaine : result.domaine,
                    fournisseur :result.fournisseur,
                    service :result.id,
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
            service : doc.service,
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
    .populate('service')
    .exec()
    .then(package => {
      if (!package) {
        return res.status(404).json({
          message: "Package not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/packages"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

