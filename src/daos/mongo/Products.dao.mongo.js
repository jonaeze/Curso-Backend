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

  getByCode = async (code) => {
    return await productsModel.findOne({ code: code });
  };

  create = async (product) => {
    // Crear el producto si pasa la validación
    return await productsModel.create(product);
  };

  update = async (id, updatedFields) => {
    return await productsModel.updateOne(
      { _id: id },
      { $set: updatedFields, new: true }
    );
  };

  delete = async (id) => {
    return await productsModel.findOneAndDelete({ _id: id });
  };
}
export default ProductsDaoMongo;
