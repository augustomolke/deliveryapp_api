const { request, response } = require("express");
const Employee = require("../models/employee");
const StatusCode = require("../Utils/statusCode");

exports.getEmployeebyID = async (request, response) => {
  try {
    const id = request.params.id;
    let employee = await Employee.findById(id);

    if (!employee) {
      response.status(StatusCode.NOT_FOUND).send("Not found");
    } else {
      response.send(employee);
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.updateEmployee = async (request, response) => {
  try {
    const id = request.params.id;
    const employeeParams = request.body;
    let updatedEmployee = await Employee.findByIdAndUpdate(id, employeeParams);

    if (!updatedEmployee) {
      response.status(StatusCode.NOT_FOUND).send("Not found");
    } else {
      response.status(StatusCode.OK).send("Employee Updated");
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.getEmployees = async (request, response) => {
  try {
    let { page, limit, name } = request.query;

    if (page < 0 || limit <= 0 || !page || !limit) {
      throw Error("Invalid params");
    }

    page = parseInt(page);
    limit = parseInt(limit);
    let employees = await Employee.find(
      { name: { $regex: `.*${name}.*`, $options: "i" } },
      {},
      { skip: page * limit, limit: limit, sort: { _id: -1 } }
    ).populate({
      path: "user",
      model: "User",
    });
    if (!employees) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "Not found",
      });
    } else {
      response.status(StatusCode.OK).send(employees);
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.createEmployee = async (request, response) => {
  try {
    const newEmployee = request.body;
    const employee = await Employee.create(newEmployee);
    if (!employee) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "An error has occurred",
      });
    } else {
      response
        .status(StatusCode.CREATED_STATUS)
        .send({ message: "Employee created", data: employee });
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.deleteEmployee = async (request, response) => {
  try {
    const id = request.params.id;
    let deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "Not found",
      });
    } else {
      response.status(StatusCode.OK).send("Employee deleted");
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};
