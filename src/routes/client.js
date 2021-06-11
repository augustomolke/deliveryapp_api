const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client");

//GET

router.get("/", clientController.getClients);
router.get("/:id", clientController.getClientbyID);

//POST
router.post("/", clientController.createClient);

//PUT

router.put("/:id", clientController.updateClient);

//DELETE

router.delete("/:id", clientController.deleteClient);

module.exports = router;
