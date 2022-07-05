const express = require("express");
const router = express.Router();

const {
  getAllptoducts,
  getAllptoductsStatic,
} = require("../controllers/products");

router.route("/").get(getAllptoducts);
router.route("/static").get(getAllptoductsStatic);

module.exports = router;
