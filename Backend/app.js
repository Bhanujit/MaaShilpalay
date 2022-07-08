const express = require("express");
const app = express()
app.use(express.json())
const errorMiddleware = require('./Middleware/error')



//Route Import
const Products= require("./Route/ProductRoute")



app.use("/api/v1",Products)


// middleware for errors
app.use(errorMiddleware)

module.exports = app