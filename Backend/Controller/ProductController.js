const Product = require('../Models/Productmodel')
const ErrorHandler = require("../Utils/errorHandler")
const asyncErrorHanlder = require("../Middleware/catchAsyncError")

//create Product --Admin
exports.createProduct= asyncErrorHanlder(
    async (req,res,next) =>{
        const product = await Product.create(req.body)
    
        res.status(200).json({
            succees:true,
            product
        })
    }
)

// get all products  

exports.getAllProducts = asyncErrorHanlder (async (req,res) =>{
    const products = await Product.find()
   await res.status(200).json({
    succees:true,
    products
   })
})

// update product -- admin
exports.updateProduct = asyncErrorHanlder(async (req,res,next) =>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            succees:false,
            message:"Product Not found"
        })
    }
    product= await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        succees:true,
        product
    })
})


// Delete method -- admin
exports.deleteProduct=asyncErrorHanlder( async(req,res,next)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            succees:false,
            message:"Product Not found"
        })
    }
   await product.remove()
   res.status(200).json({
    succees:true,
    message:"Product deleted successfully"
})
})


//get product detalis
exports.getProductDetails = asyncErrorHanlder(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  });
  

// return next(new ErrorHanlder("Product Not Found",404))