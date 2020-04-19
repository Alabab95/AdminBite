const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;


const Service = mongoose.model('Service');

module.exports.f1 = (req, res, next) => {
    var service = new Service();
    service.name = "vska";
    service.price = "aze";
    service.description = "aze";
    service.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress or login found.']);
            else
                return next(err);
        }
  
    });

}