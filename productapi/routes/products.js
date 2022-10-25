const router = require("express").Router();
const { fetchAllProducts, fetchProduct, createProduct } = require("../controllers/products");
const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}`);
  },
});

const upload = multer({ storage });

router.route("").get(fetchAllProducts).post(upload.array("images", 5), createProduct);
router.route("/:productID").get(fetchProduct);

module.exports = router;
