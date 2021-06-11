const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driver");

//GET

router.get("/", driverController.getDrivers);
router.get("/:id", driverController.getDriverbyID);

//POST
router.post("/", driverController.createDriver);

//PUT

router.put("/:id", driverController.updateDriver);

//DELETE

router.delete("/:id", driverController.deleteDriver);

module.exports = router;
