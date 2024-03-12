const { Router } = require("express");

const userRouter = require("./users.routes")
const clienteRouter = require("./clientes.routes")
const produtoRouter = require("./produtos.routes")
const ordemServicoRoutes = require("./ordemServico.routes");

const routes = Router();

routes.use("/users", userRouter);
routes.use("/clientes", clienteRouter);
routes.use("/produtos", produtoRouter);
routes.use("/os", ordemServicoRoutes);

module.exports = routes;