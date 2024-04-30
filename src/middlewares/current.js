import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../utils.js";

export const currentStrategy = (request, response, next) => {
  // Extraemos el token de la cookie
  const cookieToken = request.cookies.Authorization;
  // Si no hay token en la cookie, devolvemos un error
  if (!cookieToken) {
    return response
      .status(401)
      .json({ error: "No se encontró token en la cookie" });
  }
  // Verificamos el token y extraemos los datos del usuario
  jwt.verify(cookieToken, PRIVATE_KEY, (error, decoded) => {
    if (error) {
      return response.status(401).json({ error: "Token inválido o expirado" });
    }
    // Guardamos los datos del usuario en la respuesta
    response.locals.user = decoded.userData;
    next(); // Continuamos con el siguiente middleware
  });
};
