const Driver = require("../models/driver");
const StatusCode = require("../Utils/statusCode");
exports.createDriver = async (request, response) => {
  try {
    const newDriver = request.body;
    const driver = await Driver.create(newDriver);
    if (!driver) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "An error has occurred",
      });
    } else {
      response.status(StatusCode.CREATED_STATUS).send({
        message: "Driver created",
        data: newDriver,
      });
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.getDrivers = async (request, response) => {
  try {
    let { page, limit, name } = request.query;

    if (page < 0 || limit <= 0 || !page || !limit) {
      throw Error("Invalid params");
    }

    page = parseInt(page);
    limit = parseInt(limit);
    let drivers = await Driver.find(
      { name: { $regex: `.*${name}.*`, $options: "i" } },
      {},
      { skip: page * limit, limit: limit, sort: { _id: -1 } }
    );

    if (!drivers) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "Not found",
      });
    } else {
      response.status(StatusCode.OK).send(drivers);
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.getDriverbyID = async (request, response) => {
  try {
    const id = request.params.id;
    let driver = await Driver.findById(id);

    if (!driver) {
      response.status(StatusCode.NOT_FOUND).send("Not found");
    } else {
      response.send(driver);
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.updateDriver = async (request, response) => {
  try {
    const id = request.params.id;
    const driverParams = request.body;
    let udatedDriver = await Driver.findByIdAndUpdate(id, driverParams);

    if (!udatedDriver) {
      response.status(StatusCode.NOT_FOUND).send("Not found");
    } else {
      response
        .status(StatusCode.OK)
        .send({ message: "Client Updated", data: udatedDriver });
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.deleteDriver = async (request, response) => {
  try {
    const id = request.params.id;
    let deletedDriver = await Driver.findByIdAndDelete(id);

    if (!deletedDriver) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "Not found",
      });
    } else {
      response
        .status(StatusCode.OK)
        .send({ message: "Client deleted", data: deletedDriver });
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};
