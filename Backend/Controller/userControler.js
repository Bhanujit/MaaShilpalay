const User = require('../Models/usermodel')
const ErrorHandler = require("../Utils/errorHandler")
const asyncErrorHanlder = require("../Middleware/catchAsyncError")

exports.registerUser = asyncErrorHanlder(async (req, res, next) => {
    const {name,email,password}= req.body;
    const user= await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"sample url"
        }  
    });
    const token = user.getJwtTocken()
    res.status(201).json({
        succes:true,
        token
    })
})

exports.loginUser= asyncErrorHanlder(async(req,res,next)=>{
    const {email,password}= req.body

    if(!email || !password){
        return  next(new ErrorHandler("Please Enter Email & Password",400))
    }
    
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return  next(new ErrorHandler("Please Sign UP before Login",401))
    }
    const isPasswordMatched = user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    const token = user.getJwtTocken()
    res.status(200).json({
        succes:true,
        token
    })
})