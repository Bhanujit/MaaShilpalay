const mongoose = require("mongoose")

const connectToDatabase = ()=>{
    mongoose.connect(process.env.DB_URI,{
     useNewUrlParser:true,
     useUnifiedTopology: true,
     useCreateIndex:true
}).then((data)=>{
    console.log("db connected with server")
})
}

module.exports= connectToDatabase