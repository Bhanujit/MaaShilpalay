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
    res.status(201).json({
        succes:true,
        user
    })
})