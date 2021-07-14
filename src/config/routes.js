const usersRoutes = require("../routes/user");
const restaurantsRoutes = require("../routes/restaurant");
const productRoutes = require("../routes/product");
const receiptRoutes = require("../routes/receipt");
const clientRoutes = require("../routes/client");
const employeeRoutes = require("../routes/employee");
const driverRoutes = require("../routes/driver");
const mailRoutes = require("../routes/mail.router");
module.exports = (app) => {
  app.use("/api/receipts", receiptRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/restaurants", restaurantsRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/clients", clientRoutes);
  app.use("/api/employees", employeeRoutes);
  app.use("/api/drivers", driverRoutes);
  app.use("/api/mail", mailRoutes);

  app.get("/api", (request, response) => {
    console.log("welcome to delivery app api");
    response.send("welcome to delivery app api ");
  });
};
