const Product = require("../models/product");
const StatusCode = require("../Utils/statusCode");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.createProduct = async (request, response) => {
  try {
    let { name, price, image, description, quantity, category, file } =
      request.body;

    file = file.split(";base64,").pop();

    fs.writeFile("image.png", file, { encoding: "base64" }, function (err) {
      if (err) return res.status(400).send("erro to create the file");
      cloudinary.uploader.upload("image.png", async function (error, result) {
        if (error) {
          return res.status(400).send("erro to upload image to the cloudinary");
        }
        var prodPicture = result.url;

        const newProd = {
          name,
          price,
          image,
          description,
          quantity,
          category,
          prodPicture,
        };

        const product = await Product.create(newProd);
        if (!product) {
          response.status(StatusCode.NOT_FOUND).send({
            message: "An error has occurred",
          });
        } else {
          response.status(StatusCode.CREATED_STATUS).send({
            message: "Product Created created",
            product: newProd,
          });
        }
      });
    });
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.getProducts = async (request, response) => {
  try {
    let { page, limit, name } = request.query;

    if (page < 0 || limit <= 0 || !page || !limit) {
      throw Error("Invalid params");
    }

    page = parseInt(page);
    limit = parseInt(limit);
    let products = await Product.find(
      { name: { $regex: `.*${name}.*`, $options: "i" } },
      {},
      { skip: page * limit, limit: limit, sort: { _id: -1 } }
    );

    if (!products) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "Not found",
      });
    } else {
      response.status(StatusCode.OK).send(products);
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.getProductbyID = async (request, response) => {
  try {
    const id = request.params.id;
    let prod = await Product.findById(id);

    if (!prod) {
      response.status(StatusCode.NOT_FOUND).send("Not found");
    } else {
      response.send(prod);
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.updateProduct = async (request, response) => {
  try {
    const id = request.params.id;
    const prodParams = request.body;
    let updatedProd = await Product.findByIdAndUpdate(id, prodParams);

    if (!updatedProd) {
      response.status(StatusCode.NOT_FOUND).send("Not found");
    } else {
      response
        .status(StatusCode.OK)
        .send({ message: "Product Updated", data: updatedProd });
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};

exports.deleteProduct = async (request, response) => {
  try {
    const id = request.params.id;
    let deletedProd = await Product.findByIdAndDelete(id);

    if (!deletedProd) {
      response.status(StatusCode.NOT_FOUND).send({
        message: "Not found",
      });
    } else {
      response
        .status(StatusCode.OK)
        .send({ message: "Product deleted", data: deletedProd });
    }
  } catch (error) {
    response.status(StatusCode.BAD_REQUEST).send({
      message: error.message,
    });
  }
};
