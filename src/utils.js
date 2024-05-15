import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import enviroment from "./config/enviroment.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//TODO: Mover cada export a un archivo dentro de la carpeta utils (si se puede agrupar segun la funcionalidad)
//----------Clave privada----------//

export const PRIVATE_KEY = enviroment.jwtPrivateKey;

//----------Hasheo de Contraseña----------//

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//----------Validamos Contraseña----------//

export const isValidPassword = (user, password) => {
  console.log(
    `Datos a validar: user-password: ${user.password}, password: ${password}`
  );
  return bcrypt.compareSync(password, user.password);
};

//----------Generamos Token----------//

export const generateToken = (userData) => {
  const token = jwt.sign({ userData }, PRIVATE_KEY, { expiresIn: "1h" });
  return token;
};

//----------Logica de Autorizacion----------//

export const authToken = (request, response, next) => {
  let headerToken = request.headers.Authorization;
  let cookieToken = request.cookies.Authorization;
  let accessToken = "";

  if (!cookieToken && !headerToken) {
    if (request.originalUrl.includes("/api")) {
      return response.status(403).send({
        status: "error",
        error: "No se encontró token de acceso",
      });
    }
    return response.redirect("/login");
  }
  !cookieToken
    ? (accessToken = headerToken.split(" ")[1])
    : (accessToken = cookieToken);

  //----------Verificacion de Token----------//

  jwt.verify(accessToken, PRIVATE_KEY, (error, credentials) => {
    if (error) {
      if (request.originalUrl.includes("/api")) {
        return response.status(403).send({
          status: "error",
          error: "No se encontró token de acceso",
        });
      }
      return response.redirect("/login");
    }
    response.user = credentials.user;
    next();
  });
};

export default __dirname;
