const express= require("express");
const router = express.Router();
const {Requiresign, isAdmin } =require('../middleware/Authmiddleware');
const {login,  register} = require("../controllers/Authcontroller");
router.post('/login',login);
router.post('/register',register);
module.exports=router;