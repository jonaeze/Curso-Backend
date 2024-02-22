import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

//Middlawares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/public)`))

//RUTAS

app.use('/api/products', productsRouter);

app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log("Servidor corriendo en", PORT);
});