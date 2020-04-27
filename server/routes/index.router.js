const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlService = require('../controllers/service.controller');

const jwtHelper = require('../config/jwtHelper');

//register fournisseur
router.post('/register-fournisseur', (req,res,next)=>{
    ctrlUser.register(req,'fournisseur',res,next);
});
//register client
router.post('/register-client', (req,res,next)=>{
    ctrlUser.register(req,'client',res,next);
});
//register admin
router.post('/register-admin', (req,res,next)=>{
    ctrlUser.register(req,'admin',res,next);
});
//register super-admin
router.post('/register-superadmin', (req,res,next)=>{
    ctrlUser.register(req,'superadmin',res,next);
});
router.post('/authenticate', ctrlUser.authenticate);
router.put('/update/:id',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','fournisseur']),ctrlUser.update);
router.delete('/delete/:id',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','fournisseur']),ctrlUser.delete);
router.get('/list',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','admin','fournisseur']),ctrlUser.list);
router.get('/list1/:id',ctrlUser.list1);
router.get('/userProfile',jwtHelper.verifyJwtToken,jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','fournisseur']), ctrlUser.userProfile);
router.get('/listAdmins/:society',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','fournisseur']),ctrlUser.listAdmins);
router.post('/service',ctrlService.f1);
module.exports = router;
