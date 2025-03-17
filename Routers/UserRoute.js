const express=require('express');
const router=express.Router();
const userController=require('../Controller/userController')
const verifyToken=require('../middleware/verifyToken')
const multer  = require('multer');
const appError = require('../utils/appError');
const diskstorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        console.log(file);
        cb(null,'Uploads')
    },
    filename:(req,file,cb)=>{
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null,fileName)
    }
})
const filefilter=(req,file,cb)=>
{
    const imagetype=file.mimetype.split('/')[0];
    if(imagetype==='image')
    {
        return cb(null,true)
    }
    else 
    {
        return cb(appError.create('file must be an image',400),false)
    }

}


const upload = multer({
    storage:  diskstorage,
    fileFilter:filefilter
})

router.route('/').get(verifyToken,userController.getAllUser)
router.route('/register').post(upload.single('avatar'),userController.register)
router.route('/login').post(userController.login)



module.exports=router;