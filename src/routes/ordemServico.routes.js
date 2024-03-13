const {Router} = require("express")
const OrdemServicoController = require("../controllers/OrdemServicoController");
const ordemServicoRoutes = Router();
const ordemServicoController = new OrdemServicoController();

ordemServicoRoutes.post("/:user_id", ordemServicoController.create);
ordemServicoRoutes.get("/:os_id", ordemServicoController.show);


module.exports = ordemServicoRoutes