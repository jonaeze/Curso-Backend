import { request, response } from "express";
import { productsService } from "../services/index.service.js";

class ProductsController {
  constructor() {}

  getProducts = async (request, response) => {
    try {
      const limit = request.query.limit ? request.query.limit : 10; // Los datos de las peticiones se guardan en un objeto que se llama "REQUEST"
      const page = request.query.page ? request.query.page : 1;
      const sortOptions = { ["price"]: request.query.sort || "asc" };
      const filters = {};
      request.query.category
        ? (filters.category = request.query.category)
        : filters;
      request.query.title ? (filters.title = request.query.title) : filters;
      request.query.status ? (filters.status = request.query.status) : filters;

      if (!Number.isInteger(parseInt(limit))) {
        return response
          .status(500)
          .send("El limite ingresado no es un valor entero positivo.");
      }
      if (!Number.isInteger(parseInt(page))) {
        return response
          .status(500)
          .send("La pagina ingresada no es un valor entero positivo.");
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
      response.status(500).send(error.message);
    }
  };

  createProduct = async (request, response) => {
    try {
      const productData = request.body;
      // Validar que los campos requeridos estén presentes
      this.validate(productData);
      // Verificar si el código del producto ya está en uso
      const existingProduct = await productsService.getByCode(productData.code);
      if (existingProduct) {
        //Cuando devuelvo un ERROR debo agregarle el return a la respuesta para que corte su ejecucion.
        return response
          .status(500)
          .send(
            `El código ${productData.code} ya se encuentra utilizado por otro producto.`
          );
      }
      const product = await productsService.create(productData);
      response.send(product);
    } catch (error) {
      response.status(500).send(error.message);
    }
  };

  validate = (product) => {
    try {
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.code ||
        !product.stock
      ) {
        throw new Error("Todos los campos son obligatorios.");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateProduct = async (request, response) => {
    try {
      const pid = request.params.pid;
      const productData = request.body;
      //TODO:Hacer validaciones para el UPDATE
      const updatedProduct = await productsService.update(pid, productData);
      response.send(updatedProduct);
    } catch (error) {
      response.status(500).send(error.message);
    }
  };

  deleteProduct = async (request, response) => {
    try {
      //TODO:Validar que el producto exista, sino avisar que no exista
      const pid = request.params.pid;
      const newProductsList = await productsService.delete(pid);
      response.send(newProductsList);
    } catch (error) {}
  };
}

export default new ProductsController();
