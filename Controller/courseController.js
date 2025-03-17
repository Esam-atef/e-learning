const Course=require('../Models/courseSchema')
const {validationResult} = require('express-validator');
const httpStatusText=require('../utils/httpStatusText');
const asyncWrapper=require('../middleware/asyncWrapper');
const appError=require('../utils/appError');

const getAllCourses=asyncWrapper( async(req,res)=>
{
    const query=req.query;
    console.log(query);
    const limit=query.limit || 10;
    const page=query.page || 1;
    const skip=(page - 1) * limit;
    const courses=await Course.find({},{"__v":false ,"_id":false}).limit(limit).skip(skip);
    res.json( {status:httpStatusText.SUCCESS, data:{courses} });
})

const getCourseById=asyncWrapper( async(req,res,next)=>
{
    const courseId=await Course.findById(req.params.id,{"__v":false ,"_id":false});
    if(!courseId)
    {
        const error=appError.create('Course not found',404,httpStatusText.FAIL);
        return next(error);
    }
    res.json( {status:httpStatusText.SUCCESS, data:{courseId}} );
})

const addCourse=asyncWrapper( async(req,res,next)=>
{
    const errors = validationResult(req);
    if(!errors.isEmpty()) 
    {
        const error=appError.create(errors.array(),400,httpStatusText.FAIL);
        return next(error);
    }
    const course = new Course(req.body);
    await course.save();
    res.json({status:httpStatusText.SUCCESS , data:course});
   
})

const removeCourse=asyncWrapper(async(req,res)=>
{
  
    await Course.findByIdAndDelete(req.params.id);
    res.json({status:httpStatusText.SUCCESS, data:null});
})

const updateCourse=asyncWrapper(async(req,res)=>
{
    const courseId=req.params.id;
    const updatedCourse = await Course.findByIdAndUpdate(courseId,{ $set: req.body },{ new: true, runValidators: true });
    return res.status(200).json({status:httpStatusText.SUCCESS , data:updatedCourse});  
})
module.exports =
{
    getAllCourses,
    getCourseById,
    addCourse,
    removeCourse,
    updateCourse
}