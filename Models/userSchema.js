const mongoose = require('mongoose');
const validator = require('validator');
const userRole=require('../utils/userRole')
const userSchema = new mongoose.Schema({

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,'Please provide a valid email']
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:[userRole.ADMIN,userRole.USER,userRole.MANAGER],
        default:userRole.USER
    },
    avatar:{
        type:String, 
        default:'Uploads/Profile.png'
    }



})
module.exports = mongoose.model('User', userSchema);