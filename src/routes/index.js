const { Router } = require("express");

const userRouter = require("./users.routes")
const clienteRouter = require("./clientes.routes")

const routes = Router();

routes.use("/users", userRouter);
routes.use("/clientes", clienteRouter);

module.exports = routes;