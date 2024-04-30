// import { Router } from "express";
// import ProductManager from '../daos/fs/productManager.fs.class.js'; //Me traigo el molde
import express from "express";
import ProductManager from "../daos/mongo/Products.dao.mongo.js";
import { authToken } from "../utils.js";

const productManager = new ProductManager();
const productsRouter = express.Router();

productsRouter.get("/", authToken, async (request, response) => {
  try {
    const limit = request.query.limit; // Los datos de las peticiones se guardan en un objeto que se llama "REQUEST"
    const page = request.query.page;
    const sortOptions = { ["price"]: request.query.sort || "asc" };
    const filters = {};
    request.query.category
      ? (filters.category = request.query.category)
      : filters;
    request.query.title ? (filters.title = request.query.title) : filters;
    request.query.status ? (filters.status = request.query.status) : filters;

    const allProducts = await productManager.getProducts(
      limit,
      page,
      filters,
      sortOptions
    );
    response.send(allProducts);
  } catch (error) {
    response.send(error.message);
  }
});

productsRouter.get("/:pid", authToken, async (request, response) => {
  try {
    const pid = request.params.pid;
    const foundProduct = await productManager.getProductById(pid);
    response.send(foundProduct);
  } catch (error) {
    response.send(error.message);
  }
});

productsRouter.post("/", authToken, async (request, response) => {
  try {
    const newProduct = request.body;
    const products = await productManager.addProduct(newProduct);
    response.send(products);
  } catch (error) {
    response.send(error.message);
  }
});

productsRouter.put("/:pid", authToken, async (request, response) => {
  try {
    const pid = request.params.pid;
    const updatedProduct = await productManager.updateProduct(
      pid,
      request.body
    );
    response.send(updatedProduct);
  } catch (error) {
    response.send(error.message);
  }
});

productsRouter.delete("/:pid", authToken, async (request, response) => {
  try {
    const pid = request.params.pid;
    const newProductsList = await productManager.deleteProduct(pid);
    response.send(newProductsList);
  } catch (error) {
    response.send(error.message);
  }
});

export default productsRouter;
