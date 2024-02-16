import express from 'express';
import ProductManager from './productManagar.class.js';

const productManager = new ProductManager('src/products.json');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/products', async (request, response) => {
    try {
        const limit = request.query.limit
        const allProducts = await productManager.getProducts();
        response.send(allProducts.slice(0, limit));
    }
    catch (error) {
        response.send(error.message);
    }
});

app.get('/products/:pid', async (request, response) => {
    try {
        const pid = parseInt(request.params.pid);
        const foundProduct = await productManager.getProductById(pid);
        response.send(foundProduct);
    }
    catch (error) {
        response.send(error.message);
    }
});

app.listen(PORT, () => {
    console.log("escuchando en el puerto 8080");
});