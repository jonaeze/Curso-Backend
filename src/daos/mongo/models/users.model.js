import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "Users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  role: { type: String, default: "User" },
});

userSchema.plugin(mongoosePaginate);
const usersModel = mongoose.model(collection, userSchema);

export default usersModel;
