const mongoose = require("mongoose")

const connectToDatabase = ()=>{
    mongoose.connect(process.env.DB_URI,{
     useNewUrlParser:true
}).then((data)=>{
    console.log("db connected with server")
}).catch((err)=>{
    console.log(err)
})
}

module.exports= connectToDatabase