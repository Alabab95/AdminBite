const mongoose = require('mongoose');
//var ObjectId = require('mongoose').Types.ObjectId;
const Service = mongoose.model('Service');
//const Service = require("../models/Service.model");
const User = require('./user.controller');

module.exports.addService = (req, res, next) => {
    const service = new Service({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        description : req.body.description
    });
    
    service
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created service successfully",
        createdService: {
            _id: result._id,
            name: result.name,
            price: result.price,
            description : result.description,
            request: {
                type: 'GET',
                url: "http://localhost:3000/service/" + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

module.exports.deleteService = (req,res,next) => {
    const id = req.params.id;
    Service.remove({_id : id})
    .exec()
    .then(result =>{
      res.status(200).json({
        message:'Service deleted',
        request : {
          type:'POST',
          url:'http://localhost:3000/service/list',
          body : {
            name: 'String',
            price: 'Number',
            description : 'String'
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:err
      });
    });
}

module.exports.updateService = (req,res,next) => {
  const id = req.params.id;
  const updateOps = {};
  for(const ops of req.body){
      updateOps[ops.propName] = ops.value;
  }
  Service.update({_id : id},{ $set : updateOps})
    .exec()
    .then(result => {
      res.status(200).json({
        message : 'Service updated',
        request : {
          type : 'GET',
          url : 'http://localhost:3000/service/'+id
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

module.exports.getService = (req,res,next) => {
  const id = req.params.id;
  Service.findById(id)
    .select('name price description')
    .exec()
    .then(doc => {
      console.log("From database :",doc);
      if(doc){
        res.status(200).json({
          service : doc,
          request : {
            type: 'GET',
            url: 'http://localhost:3000/service/list'
          }
        });
      } else {
        res
          .status(404)
          .json({ message : 'No valid entry found for provided id'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error:err });
    });
}

module.exports.allServices = (req,res,next) => {
  
  Service.find()
    .select('name price description')
    .exec()
    .then(docs => {
      const response = {
        count : docs.length,
        services : docs.map(doc => {
          return {
            name : doc.name,
            price : doc.price,
            description: doc.description,
            _id: doc._id,
            request: {
              type : "GET",
              url : "http://localhost:3000/service/list"
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

