const express = require("express");
const router = new express.Router();
const UserControllers = require("../Controllers/userControllers");
const productControllers = require("../Controllers/productsControllers");

//User
router.post("/user/register", UserControllers.userpost);
router.get("/user/getAlluser", UserControllers.getUsers);
router.get("/user/singleuser/:id", UserControllers.getSingleuser);
router.delete("/user/deleteuser/:id", UserControllers.deleteuser);
router.put("/user/updateuser/:id", UserControllers.updateUser);

//Products

//get all products
router.get("/products", productControllers.getProducts);
// get a product
router.get("/products/:id", productControllers.getSingleProduct);
// add a product
router.post("/products", productControllers.productpost);
// update a product
router.put("/products/:id", productControllers.updateProduct);
// delete a product
router.delete("/products/:id", productControllers.deleteProduct);

module.exports = router;
