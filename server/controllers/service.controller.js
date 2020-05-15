const mongoose = require('mongoose');
//var ObjectId = require('mongoose').Types.ObjectId;
const Service = mongoose.model('Service');
const Package = mongoose.model('Package');
//const Service = require("../models/Service.model");
const User = require('./user.controller');

module.exports.addService = (req, res, next) => {
    console.log(req._id);
    const service = new Service({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
        state : "NOT DONE",
        fournisseurId : req._id
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
            state : "NOT DONE",
            fournisseurId : result.fournisseurId,
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

module.exports.deleteService = async(req,res,next) => {
    const id = req.params.id;
    let count = 0 ; 
    await Package.find().then(tabs => {
      tabs.map(async tab => {
        if(tab.services.includes(id)){
          count++;
          console.log(tab);
          let newServices = tab.services;
          newServices = await newServices.filter(ids => ids != id )
          console.log(newServices);
          await Package.updateOne({_id: tab._id}, { services: newServices })
          .then(result =>{
            Service.deleteOne({_id : id})
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
                      description : 'String',
                      state : 'String'
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
          })
        }
      })
    })
    if(count == 0){
      Service.deleteOne({_id : id})
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
                      description : 'String',
                      state : 'String'
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
}

module.exports.updateService = async(req,res,next) => {
  const id = req.params.id;
  let count = 0;
  await Package.find().then(async tabs => {
    tabs.map(async tab => {
      if(tab.services.includes(id)){
        count++;
        console.log(tab);
        let old_record =  await Service.findById(id);
        let oldPrice = old_record.price;
        let newPrice = (tab.price - oldPrice) + parseInt(req.body.price) ;
        
        await Package.updateOne({_id: tab._id}, { price: newPrice }).then(result=>{
          Service.findByIdAndUpdate(id,{ $set : req.body}, { new: true })
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
        })
      }
    })
  })
  if(count == 0){
    Service.findByIdAndUpdate(id,{ $set : req.body}, { new: true })
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


  

}

module.exports.getService = (req,res,next) => {
  const id = req.params.id;
  Service.findById(id)
    .select('name price description state')
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
  if(req.role == "admin" || req.role == "superadmin") {
    Service.find()
    .select('name price description state fournisseurId')
    .exec()
    .then(docs => {
      const response = {
        count : docs.length,
        services : docs.map(doc => {
          return {
            name : doc.name,
            price : doc.price,
            description: doc.description,
            state:doc.state,
            _id: doc._id,
            fournisseurId : doc.fournisseurId
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
  else {
  Service.find({fournisseurId:req._id})
    .select('name price description state fournisseurId')
    .exec()
    .then(docs => {
      const response = {
        count : docs.length,
        services : docs.map(doc => {
          return {
            name : doc.name,
            price : doc.price,
            description: doc.description,
            state:doc.state,
            _id: doc._id,
            fournisseurId : doc.fournisseurId
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
}

