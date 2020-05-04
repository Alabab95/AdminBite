const express = require('express');
const multer = require('multer');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');
//les routers de services
const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
};

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if(isValid){
            error = null;
        }else 
        cb(error,"/images");
    },
    filename:(req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name+'-'+Date.now()+'.'+ ext);
    }

});
//register fournisseur
router.post('/register-fournisseur',multer({storage:storage}).single("image"), (req,res,next)=>{
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
router.put('/update/:id',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','admin','fournisseur']),
multer({storage:storage}).single("image"),ctrlUser.update);
router.delete('/delete/:id',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','admin','fournisseur']),ctrlUser.delete);
router.get('/list',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','admin','fournisseur']),ctrlUser.list);
router.get('/listadmin',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','admin','fournisseur']),ctrlUser.listadmin);
router.get('/list1/:id',ctrlUser.list1);
router.get('/userProfile',jwtHelper.verifyJwtToken,jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','admin','fournisseur']), ctrlUser.userProfile);
router.get('/listAdmins/:society',jwtHelper.verifyJwtToken,jwtHelper.cheackRole(['superadmin','admin','fournisseur']),ctrlUser.listAdmins);

module.exports = router;
