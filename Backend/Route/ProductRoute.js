const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../Controller/ProductController")
const { isAuthenticatedUser,authorizeRoles } = require("../Middleware/auth")
const router = express.Router()



//routes
router.route("/Products").get( getAllProducts)

router.route("/Product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)

router.route("/Product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
.get(getProductDetails)

module.exports=router