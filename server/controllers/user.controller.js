const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;


const User = mongoose.model('User');


module.exports.register = (req,role, res, next) => {
  console.log(req.body);
  var user = new User();
  user.login = req.body.login;
  user.password = req.body.password;
  user.society = req.body.society;
  user.activity = req.body.activity;
  user.phone = req.body.phone;
  user.mail = req.body.mail;
  user.role = role;
  user.role == "fournisseur" ? user.etat = "en attente":user.etat = "approuvé";
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.adress = req.body.adress;
  user.save((err, doc) => {
      if (!err)
          res.send(doc);
      else {
          if (err.code == 11000)
              res.status(422).send(['Duplicate email adrress or login found.']);
          else
              return next(err);
      }

  });
console.log('here');
}
module.exports.resetpassword = (req, res, next) => {
  User.findOne({ _id: req._id },
    (err, user) => {
        if (!user)
            return res.status(404).json({ status: false, message: 'User record not found.' });
        console.log(user);
        let hash = bcrypt.hashSync(req.body.newpassword,10);
        if (user.verifyPassword(req.body.password)){ 
        User.findByIdAndUpdate(req._id, { $set: {password : hash} }, { new: true }, (err, doc) => {
          if (!err) { res.send(doc); }
          else { console.log('Error in updating password :' + JSON.stringify(err, undefined, 2)); }
        }); 
      } else return res.status(400).json({"message":"wrong password!"});  
    }
);
}
module.exports.authenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate('local', (err, user, info) => {
      // error from passport middleware
      if (err) return res.status(400).json(err);
      // registered user
      else if (user){
        if(user.role == "fournisseur" && user.etat == "en attente"){
          return res.status(400).json({"message":"you need to wait"});
        }
       
        return res.status(200).json({ "token": user.generateJwt() });
      } 
      // unknown user or wrong password
      else return res.status(404).json(info);
  })(req, res);
}

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id },
      (err, user) => {
          if (!user)
              return res.status(404).json({ status: false, message: 'User record not found.' });
          else
              return res.status(200).json({ status: true, user : _.pick(user,['_id','society','login','activity','etat','firstName','lastName','adress','phone','mail','role']) });
      }
  );
}

module.exports.list = (req, res, next) => {
  User.find({role : 'fournisseur'},(err, docs) => {
      if (!err) { res.send(docs); }
      else { console.log('Error in Retriving users :' + JSON.stringify(err, undefined, 2)); }
  });
}
module.exports.listadmin = (req, res, next) => {
  User.find({role : 'admin'},(err, docs) => {
      console.log(docs);
      if (!err) { res.send(docs); }
      else { console.log('Error in Retriving users :' + JSON.stringify(err, undefined, 2)); }
  });
}

module.exports.list1 = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  User.findById(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
  });
}

module.exports.listAdmins= (req, res) => {
  if (!ObjectId.isValid(req.params.society))
      return res.status(400).send(`No record with given id : ${req.params.society}`);

  User.findById(req.params.society, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
  });
}

module.exports.update = (req, res) => {
  console.log(req.user);
  if (!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id : ${req.params.id}`);

var user = {
  login : req.body.login,
  password : req.body.password,
  society : req.body.society,
  activity : req.body.activity,
  phone : req.body.phone,
  etat : req.body.etat,
  mail : req.body.mail,
};
User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, doc) => {
  if (!err) { res.send(doc); }
  else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
});
}

module.exports.updateProfile = (req, res) => {
  if (!ObjectId.isValid(req._id))
  return res.status(400).send(`No record with given id : ${req._id}`);
User.findByIdAndUpdate(req._id, { $set: req.body }, { new: true }, (err, doc) => {
  if (!err) { res.send(doc); }
  else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
});
}


module.exports.delete = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  User.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
  });
}




