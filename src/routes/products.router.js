import express from "express";
import productsController from "../controllers/products.controller.js";
import { authToken } from "../utils/utils.js";

const productsRouter = express.Router();

productsRouter.get("/", /*authToken,*/ productsController.getProducts);

productsRouter.get("/:pid", /*authToken,*/ productsController.getProductById);

productsRouter.post(
  "/",
  /*authToken,*/ async (request, response) => {
    try {
      const newProduct = request.body;
      const products = await ProductsDaoMongo.addProduct(newProduct);
      response.send(products);
    } catch (error) {
      response.send(error.message);
    }
  }
);

// productsRouter.put(
//   "/:pid",
//   /*authToken,*/ async (request, response) => {
//     try {
//       const pid = request.params.pid;
//       const updatedProduct = await ProductsDaoMongo.updateProduct(
//         pid,
//         request.body
//       );
//       response.send(updatedProduct);
//     } catch (error) {
//       response.send(error.message);
//     }
//   }
// );

// productsRouter.delete(
//   "/:pid",
//   /*authToken,*/ async (request, response) => {
//     try {
//       const pid = request.params.pid;
//       const newProductsList = await ProductsDaoMongo.deleteProduct(pid);
//       response.send(newProductsList);
//     } catch (error) {
//       response.send(error.message);
//     }
//   }
// );

export default productsRouter;
