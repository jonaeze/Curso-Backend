import cartModel from "./models/carts.model.js"


class CartManager {

    constructor(){
        
    }

    createCart = async () => {
        let cart = await cartModel.create({})
        return cart
    }

    getCarts = async (cid) => {
        try {
            let carts = await productsModel.find(cid)
            return carts
        } catch (error) {
            throw new Error(error.message)
        }
    }

    addProductToCart = async (cid, pid, quantity) => {
        let cart = await cartModel.findById(cid)
        let product = cart.products.find((product) => product.product.toString() === pid)

        if (product) {
            product.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }

        return await cart.save();
    }

    getCartById = async (id) => {
        let cart = await cartModel.findById(id)
        return cart
    }

    deleteProduct = async (cid, pid) => {
        let cart = await cartModel.findById(cid)
        let product = cart.products.findIndex((product) => product.product.toString() === pid)

        if(product === -1){
            console.log("Producto no encontrado")
        }else{
            cart.products.splice(product,1)
        }

        return await cart.save();
    }
}

export default CartManager;