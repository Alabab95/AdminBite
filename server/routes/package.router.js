const packages = require('express').Router();
const ctrlPack = require('../controllers/package.controller');
const jwtHelper = require('../config/jwtHelper');


packages.post('/',jwtHelper.verifyJwtToken,ctrlPack.createPackage);
packages.get('/:id',jwtHelper.verifyJwtToken,ctrlPack.returnPackage);
packages.get('/',jwtHelper.verifyJwtToken,ctrlPack.allPackages);
packages.put('/:id',jwtHelper.verifyJwtToken,ctrlPack.update);
packages.delete('/:id',jwtHelper.verifyJwtToken,ctrlPack.delete);
packages.get('/allservices/:id',jwtHelper.verifyJwtToken,ctrlPack.allServiceOfPackage);
packages.get('/servicesCanAdd/:id',jwtHelper.verifyJwtToken,ctrlPack.servicesCanAdd);


packages.post('/addService',jwtHelper.verifyJwtToken,ctrlPack.addServicesToPackage);
packages.post('/removeService',jwtHelper.verifyJwtToken,ctrlPack.removeServiceFromPackage);
packages.get('/filter/date',jwtHelper.verifyJwtToken,ctrlPack.filterParDate);
packages.get('/filter/domaine',jwtHelper.verifyJwtToken,ctrlPack.filterParDomaine);
module.exports = packages;