import mongoose from "mongoose";
const { Schema } = mongoose

const collection = "Products"

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
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


const productsModel = mongoose.model(collection, schema)

export default productsModel