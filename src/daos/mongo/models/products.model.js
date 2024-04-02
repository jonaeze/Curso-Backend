import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose

const collection = "Products"

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    thumbnails: {
        type: [String],
        default: [],
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

productSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(collection, productSchema);

export default productsModel;