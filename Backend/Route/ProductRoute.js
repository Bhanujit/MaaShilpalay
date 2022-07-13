const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../Controller/ProductController")
const router = express.Router()



//routes
router.route("/Products").get(getAllProducts)
router.route("/Product/new").post(createProduct)
router.route("/Product/:id")
.put(updateProduct)
.delete(deleteProduct)
.get(getProductDetails)

module.exports= router