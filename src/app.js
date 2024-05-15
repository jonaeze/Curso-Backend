// import mongoose from "mongoose";
// import session from "express-session";
// import MongoStore from "connect-mongo";
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";

import handlebars from "express-handlebars";
import { Server } from "socket.io";
import connectMongoDB from "./config/database.js";

import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import usersRouter from "./routes/user.router.js";
import chatRouter from "./routes/chat.router.js";
import sessionsRouter from "./routes/session.router.js";
import router from "./routes/views.router.js";

import productsSocket from "../src/sockets/realTimeProducts.socket.js";

import initializePassport from "./config/passport.config.js";

import enviroment from "./config/enviroment.config.js";

console.log("LLAMANDO AL PUERTO", enviroment.port);

const app = express();
const PORT = process.env.PORT || 8080;

//----------Middlawares----------//

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine());

//----------Sessions----------//

// const DBURL = `mongodb+srv://CoderBertonasco:bLsveGKxfX2hEU9J@codercluster.2eipwd5.mongodb.net/e_commerce?retryWrites=true&w=majority&appName=CoderCluster`;
// const connection = mongoose.connect(DBURL);

// app.use(
//   session({
//     store: MongoStore.create({
//       mongoUrl: DBURL,
//       mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
//       ttl: 10 * 60,
//     }),
//     secret: "coderS3cr3t",
//     resave: false, //guarda en memoria
//     saveUninitialized: true, //lo guarda a penas se crea
//   })
// );

/*----------Passport----------*/

initializePassport();
app.use(passport.initialize());
app.use(cookieParser("coderS3cr3t"));
// app.use(passport.session());

//----------Configuracion de archivos estaticos----------//

app.use("/static", express.static(__dirname + "/public"));
app.use("/static", express.static(__dirname + "/chat"));
app.use("/", router);

//----------Rutas----------//

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/chat", chatRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);

//----------Mi variable server tiene adentro la aplicacion.----------//

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//----------Inicializo el socket server del lado del servidor----------//

const socketServer = new Server(server); // Instanciando socket.io

productsSocket(socketServer);

const msg = [];
socketServer.on("connection", (socket) => {
  socket.on("message", (data) => {
    msg.push(data);
    socketServer.emit("messageLogs", msg);
  });
});

connectMongoDB();
