const Product = require("../models/product");

const getAllptoducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

const getAllptoductsStatic = async (req, res) => {
  const search = "aa";
  const products = await Product.find({});
  res.status(200).json({ products });
};

module.exports = {
  getAllptoducts,
  getAllptoductsStatic,
};
