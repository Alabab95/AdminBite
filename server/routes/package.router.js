const packages = require('express').Router();
const ctrlPack = require('../controllers/package.controller');

packages.post('/',ctrlPack.createPackage);
packages.get('/:id',ctrlPack.returnPackage);
packages.get('/',ctrlPack.allPackages);
packages.patch('/:id',ctrlPack.update);
packages.delete('/:id',ctrlPack.delete);

packages.post('/addService',ctrlPack.addServicesToPackage);

module.exports = packages;