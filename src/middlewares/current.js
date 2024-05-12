import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../utils/utils.js";

export const currentStrategy = (request, response, next) => {
  // Extraemos el token de la cookie
  const cookieToken = request.cookies.Authorization;
  // Extraemos el token del encabezado
  const headerToken = request.headers.Authorization;

  // Verificamos si hay token en la cookie o en el encabezado
  if (!cookieToken && !headerToken) {
    return response
      .status(401)
      .json({ error: "No se encontró token en la cookie o en el encabezado" });
  }

  // Elegimos el token a utilizar (preferimos el token de la cookie si está presente)
  const accessToken = cookieToken || headerToken;

  // Verificamos el token y extraemos los datos del usuario
  jwt.verify(accessToken, PRIVATE_KEY, (error, decoded) => {
    if (error) {
      return response.status(401).json({ error: "Token inválido o expirado" });
    }
    // Filtramos los datos del usuario para excluir la contraseña
    const userDataWithoutPassword = { ...decoded.userData };
    delete userDataWithoutPassword.password;
    // Guardamos los datos filtrados del usuario en la respuesta
    response.locals.user = userDataWithoutPassword;
    next(); // Continuamos con el siguiente middleware
  });
};
