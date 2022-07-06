const express = require("express");
const app = express()
app.use(express.json())
const errorMiddleware = require('./Middleware/error')


//Route Import
const Products= require("./Route/ProductRoute")

// middleware for errors
app.use(errorMiddleware)

app.use("/api/v1",Products)

module.exports = app