const User=require('../Models/userSchema')
const httpStatusText=require('../utils/httpStatusText');
const asyncWrapper=require('../middleware/asyncWrapper');
const appError=require('../utils/appError');
const bcrypt=require('bcrypt')
const generateToken=require('../utils/generate_jwt');




const getAllUser=asyncWrapper( async(req,res)=>
{
    const query=req.query;
   
    const limit=query.limit || 10;
    const page=query.page || 1;
    const skip=(page - 1) * limit;
    const users=await User.find({},{"__v":false ,"_id":false,'password':false}).limit(limit).skip(skip);
    res.json( {status:httpStatusText.SUCCESS, data:{users} });
})




const register=asyncWrapper( async(req,res,next)=>{
    const {firstname, lastname, email, password,role}=req.body;
    const oldUser=await User.findOne({email:email})
    console.log(req.file)
    if(oldUser)
    {
        const error=appError.create('User already exists',400,httpStatusText.FAIL);
        return next(error);
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=new User({
        firstname,
        lastname,
        email,
        password:hashedPassword,
        role,
        avatar:req.file.filename
    })
    const token=await generateToken({id:user._id,email:user.email,role:user.role});
    await user.save();
    res.json({status:httpStatusText.SUCCESS, data:{user}, token}); 
});




const login=asyncWrapper( async(req,res,next)=>
{
    const {email, password}=req.body;
    if((!email || !password) || (!email && !password))
    {
        const error=appError.create('email and password are required',400,httpStatusText.FAIL);
        return next(error);
    }
    const user=await User.findOne({email:email});
    if(!user)
    {
        const error=appError.create('email is Wrong',404,httpStatusText.FAIL);
        return next(error);
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(user && isMatch)
    {
        const token=await generateToken({id:user._id,email:user.email,role:user.role});
        res.json({status:httpStatusText.SUCCESS, message:'login success', token});
    }
    else
    {
        const error=appError.create('email or password is wrong',500,httpStatusText.FAIL);
        return next(error);
    }
});









module.exports = {
    getAllUser,
    register,
    login
}
