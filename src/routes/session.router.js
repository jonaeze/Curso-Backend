import { Router } from "express";
import userModel from "../daos/mongo/models/users.model.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", async (request, response) => {
  const {first_name, last_name, email, age, password} = request.body
  const exist = await userModel.findOne({ email: email });
  if (exist) {
    return response.status(400).send({status:"error", error:"El correo utilizado ya fue registrado"})
  };
  const user = { first_name, last_name, email, age, password };
  const result = await userModel.create(user);
  console.log(result);
  response.status(201).send({ status: "success", success: "El usuario se registro con exito" });
});

sessionsRouter.post("/login", async (request, response) => {
  const {email, password} = request.body
  const user = await userModel.findOne({ email, password });
  if (!user) {
    return response.status(400).send({status:"error", error:"error en las credenciales"})
  };

request.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
  };
  response.send({
    starus: "success",
    payload: request.session.user,
    message: "Se inicio sesión correctamente"
  });
});

export default sessionsRouter;