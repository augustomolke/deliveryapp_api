const express = require("express");
const router = express.Router();
const receiptController = require("../controllers/receipt");

//GET

router.get("/", receiptController.getReceipts);
router.get("/:id", receiptController.getReceiptbyID);

//POST
router.post("/", receiptController.createReceipt);

//PUT

router.put("/:id", receiptController.updateReceipt);

//DELETE

router.delete("/:id", receiptController.deleteReceipt);

module.exports = router;
