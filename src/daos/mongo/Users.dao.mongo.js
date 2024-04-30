import usersModel from "./models/users.model.js";

class UsersManager {
  constructor() {}

  getUsers = async (limit = 10, page = 1, filters, sortOptions) => {
    // El igual en un parametro indica valor por defecto
    try {
      if (!Number.isInteger(parseInt(limit))) {
        throw new Error("El limite ingresado no es un valor entero positivo.");
      }
      if (!Number.isInteger(parseInt(page))) {
        throw new Error("La pagina ingresada no es un valor entero positivo.");
      }
      let users = await usersModel.paginate(filters, {
        limit: limit,
        page: page,
        sort: sortOptions,
        lean: true,
        new: true,
      });
      let { prevPage, nextPage, hasPrevPage, hasNextPage } = users; // Me traigo de la respuesta del modelo lo que necesito para armar los links
      let prevLink; //creo la variable vacia para almacenar el link
      let nextLink; //creo la variable vacia para almacenar el link

      !hasPrevPage
        ? (prevLink = null)
        : (prevLink = `/api/users?page=${prevPage}&limit=${limit}&sort=${sortOptions.email}`);

      !hasNextPage
        ? (nextLink = null)
        : (nextLink = `/api/users?page=${nextPage}&limit=${limit}&sort=${sortOptions.email}`);

      users.nextLink = nextLink;
      users.prevLink = prevLink;

      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getUserByEmail = async (email) => {
    try {
      let user = await usersModel.findOne({ email: email });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getUserById = async (id) => {
    try {
      let user = await usersModel.findById(id);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addUser = async (user) => {
    try {
      let newUser = await usersModel.create(user);
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateUser = async (id, updatedFields) => {
    try {
      let user = await usersModel.updateOne(
        { _id: id },
        { $set: updatedFields }
      );
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteUser = async (id) => {
    try {
      let user = await usersModel.findOneAndDelete({ _id: id });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default UsersManager;
