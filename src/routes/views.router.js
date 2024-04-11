import { Router } from "express";
import ProductManager from "../../src/daos/mongo/Products.dao.mongo.js";

const productManager = new ProductManager();
const router = new Router();

router.get('/', async (request, response) => {
    try {
        const result = await productManager.getProducts();
        response.render('home', { products: result.docs }); // El primer parametro a recibir en el Render es la vista a la que quiro renderizar y el segundo parametro es un objeto CON metadata que le quiero mandar a la vista.
    } catch (error) {
        response.render(error.message);
    } 
});

router.get('/realtimeproducts', (request, response) => {
    try {
        response.render('realTimeProducts');
    } catch (error) {
        response.render(error.message);
    }
})

router.get('/chat', (request, response) => {
    try {
        response.render('chat');
    } catch (error) {
        response.render(error.message);
    }
})

router.get('/register', (request, response) => {
    try {
        response.render('register');
    } catch (error) {
        response.render(error.message);
    }  
})

router.get('/login', (request, response) => {
    try {
        response.render('login');
    } catch (error) {
        response.render(error.message);
    }   
})

// router.get('/', (request, response) => {
//     response.render('profile', {
//         user: request.session.user
//     });
// })

export default router;