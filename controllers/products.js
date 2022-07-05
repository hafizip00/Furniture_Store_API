const Product = require("../models/product");

const getAllptoducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
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
  let result = Product.find(queryObject);
  //Sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result: result.select(fieldList);
  }
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;
  result: result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

const getAllptoductsStatic = async (req, res) => {
  const search = "aa";
  const products = await Product.find({}).select("name price").limit(4);
  res.status(200).json({ products, q: products.length });
};

module.exports = {
  getAllptoducts,
  getAllptoductsStatic,
};
