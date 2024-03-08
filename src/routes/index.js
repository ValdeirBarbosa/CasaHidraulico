const { Router } = require("express");

const userRouter = require("./users.routes")
const clienteRouter = require("./clientes.routes")
const produtoRouter = require("./produtos.routes")

const routes = Router();

routes.use("/users", userRouter);
routes.use("/clientes", clienteRouter);
routes.use("/produtos", produtoRouter);

module.exports = routes;