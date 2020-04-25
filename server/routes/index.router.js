const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');
//les routers de services

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.put('/update/:id', ctrlUser.update)
router.delete('/delete/:id', ctrlUser.delete)
router.get('/list', ctrlUser.list);
router.get('/list1/:id', ctrlUser.list1);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/listAdmins/:society', ctrlUser.listAdmins);



module.exports = router;
