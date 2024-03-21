//Dentro de este archivo se configura la creacion de un script en donde se le va a indicar a mi servidor que hacer con un cliente nuevo.
import ProductManager from '../managers/productManager.fs.class.js'

const productManager = new ProductManager('src/data/products.json');

const productsSocket = async (socketServer) => {
    
    const products = await productManager.getProducts()
        socketServer.on('connection', (socket) => {
        socket.emit('products', products)
    })
}

export default productsSocket;