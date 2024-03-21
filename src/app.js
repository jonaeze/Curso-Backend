import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import mongoose from 'mongoose';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import router from './routes/views.router.js'
import productsSocket from '../src/sockets/realTimeProducts.socket.js';

const app = express();
const PORT = process.env.PORT || 8080


//Middlawares
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', handlebars.engine());

//Configuracion de archivos estaticos
app.use('/static', express.static(__dirname+'/public'))
app.use(router);

//RUTAS
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//Mi variable server tiene adentro la aplicacion.
const server = app.listen(PORT, () => { console.log("Servidor corriendo en puerto", PORT) }); 

//Inicializo el socket server del lado del servidor
const socketServer = new Server(server) // Instanciando socket.io

//El metodo productsSocket que importe hace que mi socket server le emita los datos al cliente
productsSocket(socketServer);