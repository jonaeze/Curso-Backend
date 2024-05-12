import mongoose from "mongoose";
import enviroment from "./enviroment.config.js";

const connectMongoDB = async () => {
  try {
    const mongoUrl = enviroment.mongoUrl;
    await mongoose.connect(mongoUrl);
    console.log("Conectado con MongoDB");
  } catch (error) {
    console.error("No se pudo conectar a la DB", error);
    process.exit();
  }
};

export default connectMongoDB;
