//var router = require('./index.router');
const service = require('express').Router();
const ctrlService = require('../controllers/service.controller');

service.post('/',ctrlService.addService);
service.post('/:id',ctrlService.deleteService);
service.patch('/:id',ctrlService.updateService);
service.get('/:id',ctrlService.getService);
service.get('/',ctrlService.allServices);

module.exports = service;
