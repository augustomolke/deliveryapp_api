const Receipt = require("../models/receipt");
const StatusCode = require("../Utils/statusCode");
exports.createReceipt = async (request, response) => {
  try {
    const { restaurant, orderID, client, productList, price, date } =
      request.body;
    const newReceipt = {
      restaurantID,
      orderID,
      clientID,
      productList,
      price,
      date,
    };
    const receipt = await Receipt.create(newReceipt);
    if (!receipt) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "An error has occurred",
      });
    } else {
      response.status(StatusCode.CREATED_STATUS).send({
        message: "Receipt created",
        data: newReceipt,
      });
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.getReceipts = async (request, response) => {
  try {
    let { page, limit, date } = request.query;

    if (page < 0 || limit <= 0 || !page || !limit) {
      throw Error("Invalid params");
    }

    page = parseInt(page);
    limit = parseInt(limit);
    let receipts = await Receipt.find(
      { date: { $regex: `.*${date}.*`, $options: "i" } },
      {},
      { skip: page * limit, limit: limit, sort: { _id: -1 } }
    );

    if (!receipts) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "Not found",
      });
    } else {
      response.status(StatusCode.OK).send(receipts);
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.getReceiptbyID = async (request, response) => {
  try {
    const id = request.params.id;
    let receipt = await Receipt.findById(id);

    if (!receipt) {
      response.status(StatusCode.NOT_FOUND).send("Not found");
    } else {
      response.send(receipt);
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.updateReceipt = async (request, response) => {
  try {
    const id = request.params.id;
    const receiptParams = request.body;
    let updatedReceipt = await Receipt.findByIdAndUpdate(id, receiptParams);

    if (!updatedReceipt) {
      response.status(StatusCode.NOT_FOUND).send("Not found");
    } else {
      response
        .status(StatusCode.OK)
        .send({ message: "Receipt Updated", data: updatedReceipt });
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.deleteReceipt = async (request, response) => {
  try {
    const id = request.params.id;
    let deletedReceipt = await Receipt.findByIdAndDelete(id);

    if (!deletedReceipt) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "Not found",
      });
    } else {
      response
        .status(StatusCode.OK)
        .send({ message: "Product deleted", data: deletedReceipt });
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};
