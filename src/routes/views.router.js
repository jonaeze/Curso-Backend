import { Router, request, response } from "express";
import ProductManager from '../managers/productManager.fs.class.js';

const productManager = new ProductManager('src/data/products.json');
const router = new Router();


router.get('/', async (request, response) => {
    try {
        const products = await productManager.getProducts();
        response.render('home', { products });// El primer parametro a recibir en el Render es la vista a la que quiro renderizar y el segundo parametro es un objeto CON metadata que le quiero mandar a la vista.
    } catch (error) {
        response.render(error.message)
    } 
});

router.get('/realtimeproducts', (request, response) => {
    try {
        response.render('realTimeProducts')
    } catch (error) {
        response.render(error.message)
    }
})

export default router;