import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import router from './routes/views.router.js'
import productsSocket from '../src/sockets/realTimeProducts.socket.js';
import chatRouter from './routes/chat.router.js'

const app = express();
const PORT = process.env.PORT || 8080


//Middlawares
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', handlebars.engine());

//Configuracion de archivos estaticos
app.use('/static', express.static(__dirname + '/public'))
app.use('/static', express.static(__dirname+'/chat'))
app.use(router);

//RUTAS
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/chat',chatRouter)


const connectMongoDB = async () => {

const DB_URL = 'mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority'

    try {
        await mongoose.connect(DB_URL)
        console.log("Conectado con MongoDB")
    } catch (error) {
            console.error("No se pudo conectar a la DB", error)
            process.exit()
        }
}

//Mi variable server tiene adentro la aplicacion.
const server = app.listen(PORT, () => { console.log(`Servidor corriendo en http://localhost:${PORT}`)}); 

//Inicializo el socket server del lado del servidor
const socketServer = new Server(server) // Instanciando socket.io

//El metodo productsSocket que importe hace que mi socket server le emita los datos al cliente
productsSocket(socketServer);

const msg = []

socketServer.on('connection', socket =>{

    console.log("Connected!")

    socket.on("message", (data)=> {
        
        msg.push(data)
        socketServer.emit('messageLogs', msg)
        
    })

})

connectMongoDB()