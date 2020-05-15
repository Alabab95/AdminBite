const abonnements = require('express').Router();
const ctrlAbonnement = require('../controllers/abonnement.controller');


abonnements.post('/',ctrlAbonnement.createAbonnement);
abonnements.get('/:id',ctrlAbonnement.returnAbonnement);
abonnements.get('/',ctrlAbonnement.allAbonnements);
abonnements.patch('/:id',ctrlAbonnement.update);
abonnements.delete('/:id',ctrlAbonnement.delete);

abonnements.post('/addPackage',ctrlAbonnement.addPackageToAbonnement);
abonnements.post('/removePackage',ctrlAbonnement.removePackageFromAbonnement);
abonnements.get('/filter/date',ctrlAbonnement.filterParDate);
abonnements.get('/clients/:id',ctrlAbonnement.getAbonnementByClientId);



module.exports = abonnements;