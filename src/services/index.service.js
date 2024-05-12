import ProductsDaoMongo from "../daos/mongo/Products.dao.mongo.js";
import CartsDaoMongo from "../daos/mongo/Carts.dao.mongo.js";
import UsersDaoMongo from "../daos/mongo/Users.dao.mongo.js";

// const cartsService = new CartsRepository(CartsDaoMongo);
const productsService = new ProductsDaoMongo();
// const usersService = new UsersRepository(UsersDaoMongo);

export default productsService /*cartsService, usersService*/;
