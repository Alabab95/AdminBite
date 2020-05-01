require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');
const serviceRouter = require('./routes/service.router');
const packageRouteur = require('./routes/package.router');

var app = express();


// middleware
app.use(bodyParser.json());
app.use(cors());
app.use((req,res,next)=>{
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader(
   "Access-Control-Allow-Headers",
   "Origin, x-Requested-With; Content-Type, Accept, Authorization"
 );
 res.setHeader(
  "Access-Control-Allow-Headers",
  "GET, POST, PATCH, PUT, DELETE, OPTIONS"
 );
 next();
});
app.use(passport.initialize());
app.use('/api', rtsIndex);
app.use('/services',serviceRouter);
app.use('/packages',packageRouteur);


// error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
      var valErrors = [];
      Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
      res.status(422).send(valErrors)
  }
});

//start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));
