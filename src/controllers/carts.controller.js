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

  addProductToCart = async (request, response) => {
    // try {
    //   const pid = request.params.pid;
    //   const cid = request.params.cid;
    //   let product = cart.products.find(
    //     (product) => product.product.toString() === pid
    //   );
    //   if (product) {
    //     product.quantity += quantity;
    //   } else {
    //     cart.products.push({ product: pid, quantity });
    //   }
    //   const productToCart = { product: pid, quantity: 1 };
    //   const newProductToCart = await cartsService.addToCart(cid, pid, 1);
    //   return await cart.save();
    //   response.send(newProductToCart);
    // } catch (error) {
    //   response.send(error.message);
    // }
  };

  getCartById = async (request, response) => {};

  deleteProduct = async (request, response) => {};

  deleteAllProducts = async (request, response) => {};
}

export default new CartsController();
