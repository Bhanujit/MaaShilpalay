const User = require('../Models/usermodel')
const ErrorHandler = require("../Utils/errorHandler")
const asyncErrorHanlder = require("../Middleware/catchAsyncError")
const sendToken = require('../Utils/jwtToken')
const sendEmail = require('../Utils/sendEmail')

exports.registerUser = asyncErrorHanlder(async (req, res, next) => {
    const {name,email,password}= req.body;
    const user= await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"sample url"
        }  
    });
   
    sendToken(user, 201, res);
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
    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    sendToken(user, 200, res);
    
})

// Logout User
exports.logout = asyncErrorHanlder(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });

  // Forgot Password
exports.forgotPassword = asyncErrorHanlder(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Maa Shilpalay Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});


// Reset Password
exports.resetPassword = asyncErrorHanlder(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// // Get User Detail
// exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.user.id);

//   res.status(200).json({
//     success: true,
//     user,
//   });
// });