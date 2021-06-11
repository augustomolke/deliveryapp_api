const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const RestaurantController = require("../controllers/restaurant");
const Restaurant = require("../models/restaurant");

//GET

router.get("/", RestaurantController.getRestaurants);
router.get("/:id", RestaurantController.getRestaurantbyID);

//POST

router.post("/", RestaurantController.createRestaurant);

//PUT

router.put("/:id", RestaurantController.updateRestaurant);

//DELETE

router.delete("/:id", RestaurantController.deleteRestaurant);

module.exports = router;
