import express from "express";
import UsersManager from "../daos/mongo/Users.dao.mongo.js";
import { authToken } from "../utils/utils.js";
import { currentStrategy } from "../middlewares/current.js";

const usersManager = new UsersManager();
const usersRouter = express.Router();

usersRouter.get("/", authToken, currentStrategy, async (request, response) => {
  try {
    const limit = request.query.limit; // Los datos de las peticiones se guardan en un objeto que se llama "REQUEST"
    const page = request.query.page;
    const sortOptions = { ["first_name"]: request.query.sort || "asc" };
    const filters = {};
    request.query.role ? (filters.role = request.query.role) : filters;
    request.query.email ? (filters.email = request.query.email) : filters;
    request.query.last_name
      ? (filters.last_name = request.query.last_name)
      : filters;

    const allUsers = await usersManager.getUsers(
      limit,
      page,
      filters,
      sortOptions
    );
    response.send(allUsers);
  } catch (error) {
    response.send(error.message);
  }
});

usersRouter.get(
  "/:uid",
  authToken,
  currentStrategy,
  async (request, response) => {
    try {
      const uid = request.params.uid;
      const foundUser = await usersManager.getUserById(uid);
      response.send(foundUser);
    } catch (error) {
      response.send(error.message);
    }
  }
);

usersRouter.post("/", authToken, currentStrategy, async (request, response) => {
  try {
    /*Recordar validar si el mail ya fue usado anteriormente*/
    const newUser = request.body;
    const user = await usersManager.addUser(newUser);
    response.send(user);
  } catch (error) {
    response.send(error.message);
  }
});

usersRouter.put(
  "/:uid",
  authToken,
  currentStrategy,
  async (request, response) => {
    try {
      const uid = request.params.uid;
      const updatedUser = await usersManager.updateUser(uid, request.body);
      response.send(updatedUser);
    } catch (error) {
      response.send(error.message);
    }
  }
);

usersRouter.delete(
  "/:uid",
  authToken,
  currentStrategy,
  async (request, response) => {
    try {
      const uid = request.params.uid;
      const newUsersList = await usersManager.deleteUser(uid);
      response.send(newUsersList);
    } catch (error) {
      response.send(error.message);
    }
  }
);

export default usersRouter;
