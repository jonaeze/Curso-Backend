import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//----------Clave privada----------//

const PRIVATE_KEY = "CoderKey";

//----------Hasheo de Contraseña----------//

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
  console.log(
    `Datos a validar: user-password: ${user.password}, password: ${password}`
  );
  return bcrypt.compareSync(password, user.password);
};

//----------Generamos Token----------//

export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "1h" });
  return token;
};

//----------Logica de Autorizacion----------//

export const authToken = (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (!authHeader)
    return response
      .status(401)
      .send({ status: "error", message: "No autorizado" });
  console.log(authHeader);
  const token = authHeader.split(" ")[1];

  //----------Verificacion de Token----------//

  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    console.log(error);
    if (error)
      return res
        .status(401)
        .send({ status: "error", message: "No autorizado" });
    response.user = credentials.user;
    next();
  });
};

export default __dirname;
