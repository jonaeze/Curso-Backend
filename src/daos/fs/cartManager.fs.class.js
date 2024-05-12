import fs from "fs";
import ProductsDaoFs from "../fs/productManager.fs.class.js";

const ProductsDaoFs = new ProductsDaoFs("src/daos/fs/data/products.json");

class CartsDaoFs {
  constructor(filePath) {
    this.path = filePath;
  }

  loadCarts = async () => {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  saveCarts = async (carts) => {
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(carts, null, 2),
      "utf-8"
    );
  };

  getCarts = async (id) => {
    try {
      const carts = await this.loadCarts();
      const cart = carts.find((cart) => cart.id === id);
      if (!cart) {
        throw new Error(
          `Not Found: No se encontró el carrito con el ID ${id}.`
        );
      }
      return cart.products;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getByIdCart = async (id) => {
    try {
      const carts = await this.loadCarts();
      const cart = carts.find((cart) => cart.id === id);

      if (!cart) {
        throw new Error(`El carrito que esta solicitando no se encontro`);
      }
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  //POST
  //TODO:validar todos los productos que lleguen en el arrays prorducts que esten en mi contenedor
  createCart = async (products) => {
    try {
      const carts = await this.loadCarts();
      // Si me mandaron productos, validar que los productos existan en mi contenedor de productos.
      const newCart = {
        id: carts.length + 1, // Autoincrementar el ID
        products: products ? products : [], // SI me mandaron products (?) devuelvo products sino (:) devuelvo un array vacio ([]).
      };
      carts.push(newCart); // Agrego el carrito nuevo a mi contenedor de carritos (carts).
      await this.saveCarts(carts);
      return carts;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addProductToCart = async (cartId, productId, quantity) => {
    try {
      if (
        (!Number.isInteger(cartId) && !Number.isInteger(productId)) ||
        (cartId <= 0 && productId <= 0)
      ) {
        throw new Error(
          `Los IDs deben ser números enteros y mayores que cero (0)`
        );
      }
      // NECESITO QUE QUANTITY SEA UN ENTERO Y MAYOR QUE CERO
      if (!quantity) {
        quantity = 1;
      }
      if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error(
          `La cantidad debe ser un número entero y mayor que cero (0)`
        );
      }

      const carts = await this.loadCarts(); // Se pasa a buscar los carritos

      const cartIndex = carts.findIndex((cart) => cart.id === cartId); // Se busca el indice del carrito

      if (cartIndex === -1) {
        throw new Error(`No existe un carrito con el ID ${cartId}`);
      }
      // CHEQUEAR SI EL PRODUCTO QUE ME PASARON EXISTE EN MIS PRODUCTOS / CONTENEDOR
      const product = await ProductsDaoMongo.getProductById(productId);
      // CUANDO SE EVALUA UN OBJETO EN UN IF SIEMPRE DA TRUE, SI ME DEVUELVE UN ERROR CUANDO LO EVALUO DA FALSE
      if (!product) {
        throw new Error(`No existe un producto con el ID ${productId}`);
      }
      // CHEQUEAR SI EL PRODUCTO ESTA EN EL CARRITO
      const productIndex = carts[cartIndex].products.findIndex(
        (product) => product.id === productId
      );

      if (productIndex === -1) {
        // Si el producto no existe en el carrito, verificar el stock disponible
        if (quantity > product.stock) {
          throw new Error(
            "La cantidad solicitada supera el stock disponible del producto."
          );
        }
        // Agregar el producto al carrito
        carts[cartIndex].products.push({ id: productId, quantity });
      } else {
        const newQuantity =
          quantity + carts[cartIndex].products[productIndex].quantity; // Se suma la cantidad solicitada nueva (quantity) con la cantidad ya en el carrito(carts[cartIndex].products[productIndex].quantity)

        if (newQuantity > product.stock) {
          throw new Error(
            "La cantidad solicitada supera el stock disponible del producto."
          );
        }
        carts[cartIndex].products[productIndex].quantity = newQuantity; // Se pisa la cantidad viaja por la nueva calculada en newQuantity
      }
      await this.saveCarts(carts);
      return `El producto con ID ${productId} se agregó correctamente al carrito ${cartId}. Carrito actualizado: ${JSON.stringify(
        carts[cartIndex],
        null,
        2
      )}`;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

// deleteProductFromCart = async (id) => {
//         try {

//         } catch (error) {

//         }
//     }

export default CartsDaoFs;
