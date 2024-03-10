const { Router } = require("express");

const ClienteControllers = require("../controllers/ClienteController");

const clienteRoutes = Router();

//exemplo de middleware
function MyMiddleware(request, response, next) {
  console.log("Passou pelo MyMiddleware!!!");
  console.log(request.body)
  next()

}


const clienteControllers = new ClienteControllers();

clienteRoutes.post("/", clienteControllers.create);
clienteRoutes.get("/", clienteControllers.index);
clienteRoutes.get("/:id_cliente", clienteControllers.show);

module.exports = clienteRoutes;