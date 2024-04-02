import productsModel from "./models/products.model.js"

class ProductManager {

    constructor(){
        console.log("ProductManager funcionando")
    }

    getProducts = async (limit=10, page=1 , filters , sortOptions) => {  // El igual en un parametro indica valor por defecto
        try {
            if (!Number.isInteger(parseInt(limit))) {
                throw new Error("El limite ingresado no es un valor entero positivo.")
            }
            if (!Number.isInteger(parseInt(page))) {
                throw new Error("La pagina ingresada no es un valor entero positivo.")
            }
            let products = await productsModel.paginate(filters, { limit: limit, page: page, sort: sortOptions });
            let { prevPage, nextPage, hasPrevPage, hasNextPage } = products // Me traigo de la respuesta del modelo lo que necesito para armar los links
            let prevLink //creo la variable vacia para almacenar el link
            let nextLink //creo la variable vacia para almacenar el link

            !hasPrevPage
                ? (prevLink = null)
                : (prevLink = `/api/products?page=${prevPage}&limit=${limit}&sort=${sortOptions.price}`)

            !hasNextPage
                ? (nextLink = null)
                : (nextLink = `/api/products?page=${nextPage}&limit=${limit}&sort=${sortOptions.price}`)
            
            products.nextLink = nextLink
            products.prevLink = prevLink
            
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
            let products= await productsModel.updateOne({ _id: id }, { $set: updatedFields })
            return products
        } catch (error) {
            throw new Error(error.message)
        }    
    }
    
    deleteProduct = async (id) => {
        try {
            let product = await productsModel.findOneAndDelete({ _id: id })
            return product
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export default ProductManager;