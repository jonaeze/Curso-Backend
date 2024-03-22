// import { Router, response } from "express";
// import CartManager from "../daos/fs/cartManager.fs.class.js"
import express from "express"
import CartManager from '../daos/mongo/Carts.dao.mongo.js'

const cartsManager = new CartManager()
const cartsRouter = express.Router()

cartsRouter.post("/", async (request, response) => {
    try {
        const cartProducts = request.body.products
        const newCart = await cartsManager.createCart(cartProducts)
        response.send(newCart);
    }
    catch (error) {
        response.send(error.message);
    }
});

cartsRouter.get("/:cid", async (request, response) => {
    try {
        const cid = parseInt(request.params.cid);
        const foundCarts = await cartsManager.getCarts(cid)
        response.send(foundCarts)
    } catch (error) {
        response.send(error.message)
    }
});

cartsRouter.post("/:cid/product/:pid", async (request, response) => {
    try {
        const pid = parseInt(request.params.pid);
        const cid = parseInt(request.params.cid);
        const productToCart = { product: pid, quantity: 1 }
        
        const newProductToCart = await cartsManager.addProductToCart(cid, pid, 1);
        response.send(newProductToCart);
    }
    catch (error) {
        response.send(error.message);
    }
});

export default cartsRouter