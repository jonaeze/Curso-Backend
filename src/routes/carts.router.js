// import { Router, response } from "express";
// import CartsDaoMongo from "../daos/fs/CartsDaoMongo.fs.class.js"
import express from "express";
import CartsController from "../controllers/carts.controller.js";
import { authToken } from "../utils.js";

const cartsRouter = express.Router();

cartsRouter.post("/", CartsController.createCart);

cartsRouter.get("/", CartsController.getCarts);

cartsRouter.get("/:cid", authToken, async (request, response) => {
  try {
    const cid = parseInt(request.params.cid);
    const foundCarts = await cartsManager.getCartById(cid);
    response.send(foundCarts);
  } catch (error) {
    response.send(error.message);
  }
});

cartsRouter.post("/:cid/product/:pid", authToken, async (request, response) => {
  // try {
  //   const pid = request.params.pid;
  //   const cid = request.params.cid;
  //   const productToCart = { product: pid, quantity: 1 };
  //   const newProductToCart = await cartsManager.addProductToCart(cid, pid, 1);
  //   response.send(newProductToCart);
  // } catch (error) {
  //   response.send(error.message);
  // }
});

cartsRouter.delete(
  "/:cid/product/:pid",
  authToken,
  async (request, response) => {
    try {
      const pid = request.params.pid;
      const cid = request.params.cid;
      const newProductsList = await cartsManager.deleteProduct(cid, pid);
      response.send(newProductsList);
    } catch (error) {
      response.send(error.message);
    }
  }
);

cartsRouter.delete("/:cid/products", authToken, async (request, response) => {
  try {
    const cid = request.params.cid;
    await cartsManager.deleteAllProducts(cid);
    response.send("Todos los productos han sido eliminados del carrito.");
  } catch (error) {
    response.send(error.message);
  }
});

export default cartsRouter;
