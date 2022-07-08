const app = require("./app")
const dotenv = require("dotenv")
const connectToDatabase = require("./config/dataBase")

// Handling Uncaught Exception **
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
  

//config
dotenv.config({path:"backend/config/port.env"})

//database connection
connectToDatabase()
app.listen(process.env.PORT,()=>{
    console.log("working")
})



// Unhandled Promise Rejection **
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });