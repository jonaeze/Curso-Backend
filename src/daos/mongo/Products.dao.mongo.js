import productsModel from "./models/products.model.js"

class ProductManager {

    constructor(){
        console.log("ProductManager funcionando")
    }

    getProducts = async () => {
        try {
            let products = await productsModel.find()
            return products
        } catch (error) {
            throw new Error(error.message)
        }
    }

    getProductById = async (id) => {
        try {
            let product = await productsModel.findById(id)
            return product
        } catch (error) {
            throw new Error(error.message)
        }  
    }

    addProduct = async (product) => {
        try {
            let products = await productsModel.create(product)            
            return products            
        } catch (error) {
            throw new Error(error.message)
        }    
    }

    updateProduct = async (id, updatedFields) => {
        try {
            let products= await productsModel.updateOne({_id:id}, {$set: updatedFields})
            return products
        } catch (error) {
            throw new Error(error.message)
        }    
    }
    
    deleteProduct = async (id) => {
        try {
            let product = await productsModel.deleleOne({_id:id})
            return product
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export default ProductManager;