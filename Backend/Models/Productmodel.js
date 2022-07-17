const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Name of the product "],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter some Description about the product"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter The Price of the product"],
        maxLength:[7, "Price cannot exceed 7 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
       {
        publicId:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
       }
    ],
    category:{
        type:String,
        required:[true,"Please Choose One Category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter the number of product you have"],
        default:1,
        maxLength:[4]
    },
    reviews:[
    {
        name:{
            type:String,
            required:true,
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
        
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    createdAt:{
        type:Number,
        default:Date.now
    }
})



module.exports = mongoose.model("Product",productSchema)