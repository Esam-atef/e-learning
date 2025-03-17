const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const courseRoute=require('./Routers/courseRoute');
const httpStatusText=require('./utils/httpStatusText');
const userRoute=require('./Routers/UserRoute');
const cors=require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/Uploads',express.static(path.join(__dirname, 'Uploads')));

const uri=process.env.MONGO_URL;
const connectToDB = async () => 
{
    try 
    {
        mongoose.set('strictQuery', false);
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully");
    } 
    catch (error) 
    {
        console.log("The error: ", error);
        process.exit();
    }
};

connectToDB();

app.use('/api/course',courseRoute);
app.use('/api/user',userRoute);


app.listen(process.env.PORT || 5070,()=>
{
    console.log(`Server is running on port ${process.env.PORT}`)
})

// global middleware for not routes
app.all('*',(req,res,next)=>
{
    return res.status(404).json({status:httpStatusText.ERROR, message:"lef we 2rga tany"});
})


// global error handler
app.use((error,req,res,next)=>
{
    // res.status(error.statusCode || 500).json({status:httpStatusText.ERROR ,message:error.message});
    res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null});
})

