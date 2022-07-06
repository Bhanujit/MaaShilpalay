const app = require("./app")
const dotenv = require("dotenv")
const connectToDatabase = require("./config/dataBase")

//config
dotenv.config({path:"backend/config/port.env"})

//database connection
connectToDatabase()
app.listen(process.env.PORT,()=>{
    console.log("working")
})