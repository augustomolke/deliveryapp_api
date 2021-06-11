const { request, response } = require("express");
const Restaurant = require("../models/restaurant");
const StatusCode = require("../Utils/statusCode");

exports.getRestaurantbyID = async (request, response) => {
  try {
    const id = request.params.id;
    let restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      response.status(StatusCode.NOT_FOUND).send("Not found");
    } else {
      response.send(restaurant);
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.updateRestaurant = async (request, response) => {
  try {
    const id = request.params.id;
    const restParams = request.body;
    let updatedRest = await Restaurant.findByIdAndUpdate(id, restParams);

    if (!updatedRest) {
      response.status(StatusCode.NOT_FOUND).send("Not found");
    } else {
      response.status(StatusCode.OK).send("Restaurant Updated");
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.getRestaurants = async (request, response) => {
  try {
    let { page, limit, name } = request.query;

    if (page < 0 || limit <= 0 || !page || !limit) {
      throw Error("Invalid params");
    }

    page = parseInt(page);
    limit = parseInt(limit);
    let restaurants = await Restaurant.find(
      { name: { $regex: `.*${name}.*`, $options: "i" } },
      {},
      { skip: page * limit, limit: limit, sort: { _id: -1 } }
    )
      .populate({
        path: "user",
        model: "User",
      })
      .populate({
        path: "products",
        model: "Product",
      });
    if (!restaurants) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "Not found",
      });
    } else {
      response.status(StatusCode.OK).send(restaurants);
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.createRestaurant = async (request, response) => {
  try {
    const { name, owner, address, email, user, products } = request.body;
    const newRestaurant = { name, owner, address, email, user, products };
    const restaurant = await Restaurant.create(newRestaurant);
    if (!restaurant) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "An error has occurred",
      });
    } else {
      response.status(StatusCode.CREATED_STATUS).send("User created");
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.deleteRestaurant = async (request, response) => {
  try {
    const id = request.params.id;
    let deletedRest = await Restaurant.findByIdAndDelete(id);

    if (!deletedRest) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "Not found",
      });
    } else {
      response.status(StatusCode.OK).send("Restautant deleted");
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};
