const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee");

//GET

router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployeebyID);

//POST
router.post("/", employeeController.createEmployee);

//PUT

router.put("/:id", employeeController.updateEmployee);

//DELETE

router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
