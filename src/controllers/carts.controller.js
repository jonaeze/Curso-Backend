import { cartsService } from "../services/index.service.js";

class CartsController {
  constructor() {}

  createCart = async (request, response) => {
    try {
      const cartProducts = request.body.products;
      const newCart = await cartsService.create(cartProducts);
      response.send(newCart);
    } catch (error) {
      response.send(error.message);
    }
  };

  getCarts = async (request, response) => {
    try {
      const foundCarts = await cartsService.get();
      response.send(foundCarts);
    } catch (error) {
      response.send(error.message);
    }
  };

  addProductToCart = async (request, response) => {};

  getCartById = async (request, response) => {};

  deleteProduct = async (request, response) => {};

  deleteAllProducts = async (request, response) => {};
}

export default new CartsController();
