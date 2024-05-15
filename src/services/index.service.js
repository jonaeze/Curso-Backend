import ProductsDaoMongo from "../daos/mongo/Products.dao.mongo.js";
import CartsDaoMongo from "../daos/mongo/Carts.dao.mongo.js";
import UsersDaoMongo from "../daos/mongo/Users.dao.mongo.js";

export const cartsService = new CartsDaoMongo();
export const productsService = new ProductsDaoMongo();
export const usersService = new UsersDaoMongo();
