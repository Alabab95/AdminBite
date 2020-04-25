const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');
//les routers de services

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
router.put('/update/:id',jwtHelper.verifyJwtToken,ctrlUser.update);
router.delete('/delete/:id',ctrlUser.delete);
router.get('/list',ctrlUser.list);
router.get('/list1/:id', ctrlUser.list1);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/listAdmins/:society', ctrlUser.listAdmins);



module.exports = router;
