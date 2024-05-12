import { config } from "dotenv";
import commander from "../utils/commander.utils.js";

const { mode } = commander.opts();

config({ path: mode === "production" ? "./.env.production" : "./.env" });

const enviroment = {
  port: process.env.PORT,
  mongoPass: process.env.MONGO_PASS,
  mongoUrl: process.env.MONGO_URL,
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
};

export default enviroment;
