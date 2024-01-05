const Product = require("../modals/productModal");
const moment = require("moment");

// create Product
exports.productpost = async (req, res) => {
  try {
    const { name, quantity, price, image, timestamps } = req.body;

    const product = await Product.create({
      name,
      quantity,
      price,
      image,
      timestamps,
      user_id: req.user.id,
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
// get all Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user_id: req.user.id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single Product
exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update Product

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price, image, timestamps } = req.body;

    const product = await Product.findByIdAndUpdate(
      { _id: id },
      { name, quantity, price, image, timestamps },
      {
        new: true,
      }
    );
    // we cannot find any product in database
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
