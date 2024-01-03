const express = require("express");
const router = new express.Router();
const UserControllers = require("../Controllers/userControllers");
const productControllers = require("../Controllers/productsControllers");
const commentControllers = require("../Controllers/commentsControllers");

const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);
//User
router.post("/users/register", UserControllers.registerUser);
router.post("/users/login", UserControllers.loginUser);
router.post("/users", UserControllers.userpost);
router.get("/users", UserControllers.getUsers);
router.get("/users/:id", UserControllers.getSingleuser);
router.delete("/users/id", UserControllers.deleteuser);
router.put("/users/:id", UserControllers.updateUser);

//Products

//get all products
router.get("/products", validateToken, productControllers.getProducts);
// get a product
router.get("/products/:id", productControllers.getSingleProduct);
// add a product
router.post("/products", productControllers.productpost);
// update a product
router.put("/products/:id", productControllers.updateProduct);
// delete a product
router.delete("/products/:id", productControllers.deleteProduct);

//user comments
router.post("/user/comments", commentControllers.commentpost);

module.exports = router;
