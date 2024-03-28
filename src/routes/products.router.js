// import { Router } from "express";
// import ProductManager from '../daos/fs/productManager.fs.class.js'; //Me traigo el molde
import express from "express"
import ProductManager from '../daos/mongo/Products.dao.mongo.js'

const productManager = new ProductManager()
const productsRouter = express.Router()

productsRouter.get("/", async (request, response) => {
    try {
        const limit = request.query.limit  // Los datos de las peticiones se guardan en un objeto que se llama "REQUEST"
        const allProducts = await productManager.getProducts();
        response.send(allProducts.slice(0, limit));
    }
    catch (error) {
        response.send(error.message);
    }
});

productsRouter.get("/:pid", async (request, response) => {
    try {
        const pid = request.params.pid;
        const foundProduct = await productManager.getProductById(pid);
        response.send(foundProduct);
    }
    catch (error) {
        response.send(error.message);
    }
});

productsRouter.post("/", async (request, response) => {
    try {
        const newProduct = request.body
        const products = await productManager.addProduct(newProduct)
        response.send(products);
    }
    catch (error) {
        response.send(error.message);
    }
});

productsRouter.put("/:pid", async (request, response) => {
    try {
        const pid = request.params.pid;
        const updatedProduct = await productManager.updateProduct(pid, request.body)
        response.send(updatedProduct);
    }
    catch (error) {
        response.send(error.message);
    }
});

productsRouter.delete("/:pid", async (request, response) => {
    try {
        const pid = request.params.pid;
        console.log("product id", pid)
        const newProductsList = await productManager.deleteProduct(pid)
        response.send(newProductsList);
    }
    catch (error) {
        response.send(error.message);
    }
});

export default productsRouter