//Dentro de este archivo se configura la creacion de un script en donde se le va a indicar a mi servidor que hacer con un cliente nuevo.
import { productsService } from "../services/index.service.js";

const productsSocket = async (socketServer) => {
  const result = await productsService.get(10, 1, {}, { price: "asc" });
  socketServer.on("connection", (socket) => {
    //Se avisa al socket del servidor que cuando se conecta el cliente (evento connection) se ejecuta lo que se encuentra dentro de la funcion
    socket.emit("products", result.docs); //Emite un mensaje (evento) dandole aviso a todos los clientes conectados que ocurrio este evento // Todos los clientes que reaccionen a este evento van a ejecutar el codigo de su lado que corresponda a este evento
  });
};

export default productsSocket;

//Este es el socket del lado del servidor
