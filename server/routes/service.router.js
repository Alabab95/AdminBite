//var router = require('./index.router');
const service = require('express').Router();
const ctrlService = require('../controllers/service.controller');
const jwtHelper = require('../config/jwtHelper');

service.post('/',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','fournisseur']),ctrlService.addService);
service.delete('/:id',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','admin','fournisseur']),ctrlService.deleteService);
service.put('/:id',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','fournisseur']),ctrlService.updateService);
service.get('/:id',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','admin','fournisseur']),ctrlService.getService);
service.get('/',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','admin','fournisseur']),ctrlService.allServices);

module.exports = service;
