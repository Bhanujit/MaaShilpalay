const express = require("express");
const app = express()
const errorMiddleware = require('./Middleware/error')
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

//Route Import
const Products = require("./Route/ProductRoute")
const User = require("./Route/UserRoute")

app.use("/api/v1",Products)
app.use("/api/v1",User)




// middleware for errors
app.use(errorMiddleware)

module.exports = app