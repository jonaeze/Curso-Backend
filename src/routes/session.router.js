import { Router } from "express";
import userModel from "../daos/mongo/models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";
// import passport from "passport";

const sessionsRouter = Router();

sessionsRouter.post("/register", async (request, response) => {
    try {
        const { first_name, last_name, email, age, password } = request.body;
        //no olvidar validar
        const exist = await userModel.findOne({ email: email });
        if (exist) {
            return response.status(400).send({ status: "error", error: "El correo utilizado ya fue registrado" });
        }
        const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
        };
        const result = await userModel.create(user);
        console.log(result);
        response.status(201).send({ status: "success", success: "El usuario se registró con éxito" });
    } catch (error) {
        console.error(error);
        response.status(500).send({ status: "error", error: "Hubo un problema al registrar el usuario" });
    }
});

// sessionsRouter.post("/register", passport.authenticate("register", { failureRedirect: "/failregister" }),
//     async (request, response) => {
//         response.status(201).send({ status: "success", message: "Usuario registrado" });
//     });

// sessionsRouter.get("/failregister", async (request, response) => {
//     console.log("error");
//     response.send({ error: "Falló" });
// });

sessionsRouter.post("/login", async (request, response) => {
    try {
        const { email, password } = request.body;
        //no olvidar validar email y password
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return response.status(400).send({ status: "error", error: "Error en las credenciales" });
        }

        const validatePassword = isValidPassword(user, password)
        console.log("entre a validar",validatePassword)
        if (!validatePassword)
        return response
            .status(401)
            .send({ error: "error", message: "Error de credenciales" });
        
        request.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
        };

        delete user.password;

        response.send({
            status: "success",
            payload: request.session.user,
            message: "Se inició sesión correctamente"
        });
    } catch (error) {
        console.error(error);
        response.status(500).send({ status: "error", error: "Hubo un problema al iniciar sesión" });
    }
});

// sessionsRouter.post('/login', passport.authenticate('login', { failureRedirect: "/faillogin" }), async (request, response) => {
//         if (!request.user) return response.status(400).send('error')
//         request.session.user = {
//             first_name: request.user.first_name,
//             last_name: request.user.last_name,
//             email: request.user.email,
//             age: request.user.age,
//         };
//         response.status(200).send({ status: "success", payload: request.user });
//     });

// sessionsRouter.get("/faillogin", async (request, response) => {
//     console.log("error");
//     response.send({ error: "Fallo" });
// });

sessionsRouter.get("/logout", async (request, response) => {
    try {
        response.clearCookie('connect.sid').redirect('/login');
    } catch (error) {
        console.error(error);  
        response.status(500).send({ status: "error", error: "Hubo un problema al cerrar sesión" });
    }
});

sessionsRouter.post('/restore', async (request, response) => {
    const { email, password } = request.body;
  //validar
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user)
        return response.status(400).send({ status: "error", message: "No se encontro Usuario" });
    const newPass = createHash(password);

    await userModel.updateOne({ _id: user._id }, {$set:{password: newPass}})
    
    response.status(200).send({ status: "success", message: "Se cambio la contraseña correctamente" });

});

export default sessionsRouter;