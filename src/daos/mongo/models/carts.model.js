import mongoose from "mongoose";
const { Schema } = mongoose
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = "carts"

const cartSchema = new Schema({

    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: "products"
        },
        quantity: {
            type: Number,
            require: true
        }
    }]

})

cartSchema.plugin(mongoosePaginate);
const cartsModel = mongoose.model(collection, cartSchema)

export default cartsModel