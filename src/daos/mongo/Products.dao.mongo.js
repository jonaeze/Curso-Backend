import productsModel from "./models/products.model.js";

class ProductManager {
  constructor() {}

  getProducts = async (limit = 10, page = 1, filters, sortOptions) => {
    // El igual en un parametro indica valor por defecto
    try {
      if (!Number.isInteger(parseInt(limit))) {
        throw new Error("El limite ingresado no es un valor entero positivo.");
      }
      if (!Number.isInteger(parseInt(page))) {
        throw new Error("La pagina ingresada no es un valor entero positivo.");
      }
      let products = await productsModel.paginate(filters, {
        limit: limit,
        page: page,
        sort: sortOptions,
        lean: true,
        new: true,
      });
      let { prevPage, nextPage, hasPrevPage, hasNextPage } = products; // Me traigo de la respuesta del modelo lo que necesito para armar los links
      let prevLink; //creo la variable vacia para almacenar el link
      let nextLink; //creo la variable vacia para almacenar el link

      !hasPrevPage
        ? (prevLink = null)
        : (prevLink = `/api/products?page=${prevPage}&limit=${limit}&sort=${sortOptions.price}`);

      !hasNextPage
        ? (nextLink = null)
        : (nextLink = `/api/products?page=${nextPage}&limit=${limit}&sort=${sortOptions.price}`);

      products.nextLink = nextLink;
      products.prevLink = prevLink;

      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getProductById = async (id) => {
    try {
      let product = await productsModel.findById(id);
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addProduct = async (product) => {
    try {
      // Validar que los campos requeridos estén presentes
      this.validate(product);

      // Verificar si el código del producto ya está en uso
      const existingProduct = await productsModel.findOne({
        code: product.code,
      });
      if (existingProduct) {
        throw new Error(
          `El código ${product.code} ya se encuentra utilizado por otro producto.`
        );
      }

      // Crear el producto si pasa la validación
      let newProduct = await productsModel.create(product);
      return newProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateProduct = async (id, updatedFields) => {
    try {
      let products = await productsModel.updateOne(
        { _id: id },
        { $set: updatedFields }
      );
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteProduct = async (id) => {
    try {
      let product = await productsModel.findOneAndDelete({ _id: id });
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  validate = (product) => {
    try {
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.code ||
        !product.stock
      ) {
        throw new Error("Todos los campos son obligatorios.");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default ProductManager;
