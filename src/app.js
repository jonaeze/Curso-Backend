import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import connectMongoDB from "./config/database.js";
import mongoose from "mongoose";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import router from "./routes/views.router.js";
import productsSocket from "../src/sockets/realTimeProducts.socket.js";
import chatRouter from "./routes/chat.router.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionsRouter from "./routes/session.router.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

const app = express();
const PORT = process.env.PORT || 8080;
const DBURL = `mongodb+srv://CoderBertonasco:bLsveGKxfX2hEU9J@codercluster.2eipwd5.mongodb.net/e_commerce?retryWrites=true&w=majority&appName=CoderCluster`;
const connection = mongoose.connect(DBURL);

//////////////////////////////////////////////////////Middlawares//////////////////////////////////////////////////////

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine());

//////////////////////////////////////////////////////Session//////////////////////////////////////////////////////
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: DBURL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 10 * 60,
    }),
    secret: "coderS3cr3t",
    resave: false, //guarda en memoria
    saveUninitialized: true, //lo guarda a penas se crea
  })
);

//////////////////////////////////////////////////////PASSPORT//////////////////////////////////////////////////////

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//////////////////////////////////////////////////////Configuracion de archivos estaticos//////////////////////////////////////////////////////

app.use("/static", express.static(__dirname + "/public"));
app.use("/static", express.static(__dirname + "/chat"));
app.use("/", router);

//////////////////////////////////////////////////////RUTAS//////////////////////////////////////////////////////

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/chat", chatRouter);
app.use("/api/sessions", sessionsRouter);

//////////////////////////////////////////////////////Mi variable server tiene adentro la aplicacion.//////////////////////////////////////////////////////

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//////////////////////////////////////////////////////nicializo el socket server del lado del servidor//////////////////////////////////////////////////////

const socketServer = new Server(server); // Instanciando socket.io

//////////////////////////////////////////////////////El metodo productsSocket que importe hace que mi socket server le emita los datos al cliente//////////////////////////////////////////////////////

productsSocket(socketServer);

////////////////////////////////////////////////////////////////////////////////////////////////////////////

const msg = [];
socketServer.on("connection", (socket) => {
  socket.on("message", (data) => {
    msg.push(data);
    socketServer.emit("messageLogs", msg);
  });
});

connectMongoDB();
