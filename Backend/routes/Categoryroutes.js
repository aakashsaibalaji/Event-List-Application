const { CreateCategorycontroller,updatecategory,CategoryController,singleCategory, deleteCategory} = require('../controllers/Categorycontroller');
const express = require('express');
const router = express.Router()
const {Requiresign} =require('../middleware/Authmiddleware');
router.post('/create-category',Requiresign,CreateCategorycontroller);
router.put('/update-category/:id',Requiresign,updatecategory);
router.get('/get-category',CategoryController);
router.get('/single-category/:slug',singleCategory);
router.delete('/delete-category/:id',Requiresign,deleteCategory);
module.exports=router;