const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

//GET

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductbyID);

//POST
router.post("/", productController.createProduct);

//PUT

router.put("/:id", productController.updateProduct);

//DELETE

router.delete("/:id", productController.deleteProduct);

module.exports = router;
