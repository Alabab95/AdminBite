const abonnements = require('express').Router();
const ctrlAbonnement = require('../controllers/abonnement.controller');
const jwtHelper = require('../config/jwtHelper');


abonnements.post('/:id',jwtHelper.verifyJwtToken,ctrlAbonnement.createAbonnement);
abonnements.get('/singleAbonement/:id',ctrlAbonnement.returnAbonnement);
abonnements.get('/',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','admin','fournisseur','client']),ctrlAbonnement.allAbonnements);
abonnements.put('/:id',ctrlAbonnement.update);
abonnements.get('/nonpaye',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','admin','fournisseur','client']),ctrlAbonnement.allAbonnementsNonPaye);
abonnements.put('/activateService/:id',ctrlAbonnement.activateService);
abonnements.put('/disactivateService/:id',ctrlAbonnement.disactivateService);

abonnements.delete('/:id',ctrlAbonnement.delete);

abonnements.post('/addPackage',ctrlAbonnement.addPackageToAbonnement);
abonnements.post('/removePackage',ctrlAbonnement.removePackageFromAbonnement);
abonnements.get('/filter/date',ctrlAbonnement.filterParDate);
abonnements.get('/clients/:id',ctrlAbonnement.getAbonnementByClientId);
abonnements.get('/groupement',ctrlAbonnement.abonnementGrop);
abonnements.get('/packgrop',ctrlAbonnement.packGrop);



module.exports = abonnements;