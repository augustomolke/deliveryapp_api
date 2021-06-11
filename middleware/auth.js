const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../src/config/config");
const User = require("../src/models/user");
const BlackList = require("../src/models/blacklist");
const statusCode = require("../src/Utils/statusCode");

const authMiddleware = (permissions) => {
  return async (req, res, next) => {
    try {
      const token = req.headers["authorization"];

      const listed = await BlackList.findOne({ token });

      if (listed) {
        res.status(statusCode.UNAUTHORIZED).send({ message: "Invalid Token" });
      }

      const decoded = await jwt.verify(token, config.secret);

      //add blacklist
      const id = decoded.params.id;

      if (id) {
        const user = await User.findById(id);
        let perm = permissions.filter((item) => {
          return user.permissions == item;
        });

        if (perm.length > 0) {
          return next();
        }
      } else {
        res.status(statusCode.UNAUTHORIZED).send({ message: " Invalid token" });
      }
    } catch (error) {
      res.status(statusCode.UNAUTHORIZED).send({ message: error.message });
    }
  };
};

module.exports = authMiddleware;
