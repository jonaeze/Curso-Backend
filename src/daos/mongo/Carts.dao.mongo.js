import cartModel from "./models/carts.model.js";

class CartsDaoMongo {
  constructor() {}

  create = async (cartData) => {
    return await cartModel.create({ cartData });
  };

  get = async () => {
    return await cartModel.paginate(
      {},
      { populate: "products.product", lean: true, new: true }
    );
  };

  addProductToCart = async (cid, pid, quantity) => {
    let cart = await cartModel.findById(cid);
    let product = cart.products.find(
      (product) => product.product.toString() === pid
    );

    if (product) {
      product.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    return await cart.save();
  };

  getCartById = async (cid) => {
    let cart = await cartModel.findById(cid);
    return cart;
  };

  deleteProduct = async (cid, pid) => {
    let cart = await cartModel.findById(cid);
    let product = cart.products.findIndex(
      (product) => product.product.toString() === pid
    );

    if (product === -1) {
      console.log("Producto no encontrado");
    } else {
      cart.products.splice(product, 1);
    }
    return await cart.save();
  };
  deleteAllProducts = async (cid) => {
    let cart = await cartModel.findById(cid);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }
    cart.products = [];
    return await cart.save();
  };
}

export default CartsDaoMongo;
