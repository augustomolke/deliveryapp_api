const Client = require("../models/client");
const StatusCode = require("../Utils/statusCode");
exports.createClient = async (request, response) => {
  try {
    const newClient = request.body;
    const client = await Client.create(newClient);
    if (!client) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "An error has occurred",
      });
    } else {
      response.status(StatusCode.CREATED_STATUS).send({
        message: "Client created",
        data: newClient,
      });
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.getClients = async (request, response) => {
  try {
    let { page, limit, name } = request.query;

    if (page < 0 || limit <= 0 || !page || !limit) {
      throw Error("Invalid params");
    }

    page = parseInt(page);
    limit = parseInt(limit);
    let clients = await Client.find(
      { name: { $regex: `.*${name}.*`, $options: "i" } },
      {},
      { skip: page * limit, limit: limit, sort: { _id: -1 } }
    );

    if (!clients) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "Not found",
      });
    } else {
      response.status(StatusCode.OK).send(clients);
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.getClientbyID = async (request, response) => {
  try {
    const id = request.params.id;
    let client = await Client.findById(id);

    if (!client) {
      response.status(StatusCode.NOT_FOUND).send("Not found");
    } else {
      response.send(client);
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.updateClient = async (request, response) => {
  try {
    const id = request.params.id;
    const clientParams = request.body;
    let updatedClient = await Client.findByIdAndUpdate(id, clientParams);

    if (!updatedClient) {
      response.status(StatusCode.NOT_FOUND).send("Not found");
    } else {
      response
        .status(StatusCode.OK)
        .send({ message: "Client Updated", data: updatedClient });
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.deleteClient = async (request, response) => {
  try {
    const id = request.params.id;
    let deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "Not found",
      });
    } else {
      response
        .status(StatusCode.OK)
        .send({ message: "Client deleted", data: deletedClient });
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};
