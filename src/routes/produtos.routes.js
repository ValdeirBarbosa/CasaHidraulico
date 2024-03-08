const {Router } = require("express")

const ProdutoController = require("../controllers/ProdutoController");

const produtoRoutes = Router();

const produtoController = new ProdutoController();

produtoRoutes.post("/",produtoController.create);
produtoRoutes.get("/",produtoController.index);

module.exports = produtoRoutes