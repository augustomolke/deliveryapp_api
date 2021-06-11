const { request } = require("express");
const { CREATED_STATUS } = require("../Utils/statusCode");
const bcrypt = require("bcrypt");
const StatusCode = require("../Utils/statusCode");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const BlackList = require("../models/blacklist");

const generateToken = (params = {}) => {
  return jwt.sign({ params }, config.secret, { expiresIn: config.timer });
};

exports.createUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const newUser = { name, email, password };
    const user = await User.create(newUser);
    if (!user) {
      response.status(StatusCode.BAD_REQUEST).send({
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

exports.getUsers = async (request, response) => {
  try {
    let { page, limit, name } = request.query;

    if (page < 0 || limit <= 0 || !page || !limit) {
      throw Error("Invalid params");
    }
    page = parseInt(page);
    limit = parseInt(limit);
    const users = await User.find(
      { name: { $regex: `.*${name}.*`, $options: "i" } },
      {},
      { skip: page * limit, limit: limit, sort: { _id: -1 } }
    );

    if (!users) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "Not found",
      });
    } else {
      response.send(users);
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: "Bad request",
    });
  }
};

exports.getUsersById = async (request, response) => {
  try {
    const id = request.params.id;

    const user = await User.findById(id);
    if (!user) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "User not found",
      });
    } else {
      response.send(user);
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.deleteUserById = async (request, response) => {
  try {
    const id = request.params.id;
    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      response.status(StatusCode.NOT_FOUND).send("User not found");
    } else {
      response.status(StatusCode.OK).send("User deleted");
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.updateUserById = async (request, response) => {
  try {
    const id = request.params.id;
    const user = request.body;
    const updatedUser = await User.findByIdAndUpdate(id, user);

    if (!updatedUser) {
      response.status(StatusCode.NOT_MODIFIED).send("An error has occurred");
    } else {
      response.status(StatusCode.OK).send("User Updated");
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.login = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return response.status(StatusCode.NOT_FOUND).send({
        message: "User not found",
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return response.status(StatusCode.BAD_REQUEST).send({
        message: "Invalid Password! Try again",
      });
    }

    user.password = undefined;
    response.status(StatusCode.OK).send({
      message: "Login successfull",
      data: user,
      token: generateToken({ id: user._id }),
    });
  } catch (error) {
    response.send({
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const decoded = await jwt.verify(token, config.secret);
    const id = decoded.params.id;

    if (id) {
      const listed = await BlackList.create({ token });
      res.status(StatusCode.OK).send({ message: "Logout Succesful" });
    } else {
      res.status(StatusCode.BAD_REQUEST).send({ message: "Error" });
    }
  } catch (error) {
    res.status(StatusCode.BAD_REQUEST).send({ message: error.message });
  }
};
