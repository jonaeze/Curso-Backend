import productsModel from "./models/products.model.js";

class ProductsDaoMongo {
  constructor() {}

  get = async (limit, page, filters, sortOptions) => {
    return await productsModel.paginate(filters, {
      limit: limit,
      page: page,
      sort: sortOptions,
      lean: true,
      new: true,
    });
  };

  getById = async (id) => {
    return await productsModel.findById(id);
  };

  create = async (product) => {
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

  update = async (id, updatedFields) => {
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

  delete = async (id) => {
    try {
      let product = await productsModel.findOneAndDelete({ _id: id });
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default ProductsDaoMongo;
