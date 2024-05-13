import express from "express";
import productsController from "../controllers/products.controller.js";
import { authToken } from "../utils/utils.js";

const productsRouter = express.Router();

productsRouter.get("/", /*authToken,*/ productsController.getProducts);

productsRouter.get("/:pid", /*authToken,*/ productsController.getProductById);

productsRouter.post("/", /*authToken,*/ productsController.createProduct);

productsRouter.put("/:pid", /*authToken,*/ productsController.updateProduct);

productsRouter.delete("/:pid", /*authToken,*/ productsController.deleteProduct);

export default productsRouter;
