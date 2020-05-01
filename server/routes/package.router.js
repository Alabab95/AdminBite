const packages = require('express').Router();
const ctrlPackage = require('../controllers/package.controller');

packages.post('/',ctrlPack.createPackage);
packages.get('/:id',ctrlPack.returnPackage);
packages.get('/',ctrlPack.allPackages);
packages.patch('/:id',ctrlPack.update);
packages.delete('/:id',ctrlPack.delete);

module.exports = packages;