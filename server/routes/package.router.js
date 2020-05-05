const packages = require('express').Router();
const ctrlPack = require('../controllers/package.controller');

packages.post('/',ctrlPackage.createPackage);
packages.get('/:id',ctrlPackage.returnPackage);
packages.get('/',ctrlPackage.allPackages);
packages.patch('/:id',ctrlPackage.update);
packages.delete('/:id',ctrlPackage.delete);

packages.post('/addService',ctrlPack.addServicesToPackage);

module.exports = packages;