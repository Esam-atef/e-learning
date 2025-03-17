const express=require('express');
const router=express.Router();
const courseController=require('../Controller/courseController')
const verify=require('../middleware/verifyToken');
const allowedTo=require('../middleware/allowedTo')
const userRole=require('../utils/userRole')

router.get('/',verify,courseController.getAllCourses);
router.get('/:id',verify,courseController.getCourseById);
router.post('/',verify,allowedTo(userRole.ADMIN,userRole.MANAGER),courseController.addCourse);
router.delete('/:id',verify,allowedTo(userRole.ADMIN,userRole.MANAGER),courseController.removeCourse);
router.patch('/:id',verify,allowedTo(userRole.ADMIN,userRole.MANAGER),courseController.updateCourse);

module.exports=router;