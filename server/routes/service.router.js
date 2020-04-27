//var router = require('./index.router');
const service = require('express').Router();
const ctrlService = require('../controllers/service.controller');

service.post('/add',ctrlService.addService);
service.post('/remove/:id',ctrlService.deleteService);
service.patch('/update/:id',ctrlService.updateService);
service.get('/:id',ctrlService.getService);
service.get('/',ctrlService.allServices);

module.exports = service;
