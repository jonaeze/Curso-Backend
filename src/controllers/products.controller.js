import { request, response } from "express";
import productsService from "../services/index.service.js";

class ProductsController {
  constructor() {}

  getProducts = async (request, response) => {
    try {
      const limit = request.query.limit ? request.query.limit : 4; // Los datos de las peticiones se guardan en un objeto que se llama "REQUEST"
      const page = request.query.page ? request.query.page : 1;
      const sortOptions = { ["price"]: request.query.sort || "asc" };
      const filters = {};
      request.query.category
        ? (filters.category = request.query.category)
        : filters;
      request.query.title ? (filters.title = request.query.title) : filters;
      request.query.status ? (filters.status = request.query.status) : filters;

      if (!Number.isInteger(parseInt(limit))) {
        throw new Error("El limite ingresado no es un valor entero positivo.");
      }
      if (!Number.isInteger(parseInt(page))) {
        throw new Error("La pagina ingresada no es un valor entero positivo.");
      }

      const products = await productsService.get(
        limit,
        page,
        filters,
        sortOptions
      );
      let { prevPage, nextPage, hasPrevPage, hasNextPage } = products; // Me traigo de la respuesta del modelo lo que necesito para armar los links
      let prevLink; //creo la variable vacia para almacenar el link
      let nextLink; //creo la variable vacia para almacenar el link

      !hasPrevPage
        ? (prevLink = null)
        : (prevLink = `/api/products?page=${prevPage}&limit=${limit}&sort=${sortOptions.price}`);

      !hasNextPage
        ? (nextLink = null)
        : (nextLink = `/api/products?page=${nextPage}&limit=${limit}&sort=${sortOptions.price}`);

      products.nextLink = nextLink;
      products.prevLink = prevLink;
      response.send(products);
    } catch (error) {
      response.send(error.message);
    }
  };

  getProductById = async (request, response) => {
    try {
      const pid = request.params.pid;
      const foundProduct = await productsService.getById(pid);
      response.send(foundProduct);
    } catch (error) {
      response.send(error.message);
    }
  };

  createProduct = async (request, response) => {
    try {
    } catch (error) {}
  };

  updateProduct = async (request, response) => {
    try {
    } catch (error) {}
  };

  deleteProduct = async (request, response) => {
    try {
    } catch (error) {}
  };
}

export default new ProductsController();
