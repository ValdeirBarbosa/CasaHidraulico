const { log } = require("console");
const AppError = require("../utils/AppError")
const knex = require("../database/knex")
class ProdutoController {

  async create(request, response) {
    const { codigo, descricao } = request.body
    if (!codigo || !descricao) {
      throw new AppError("Dados de codigo e descrição devem ser informados")
    }

    const [checkIfTheCodeProductExists] = await knex("produtos").where({ codigo: codigo })

    if (checkIfTheCodeProductExists) {
      throw new AppError("Codigo ja utilizado!")
    }
    const produto = await knex("produtos").insert({ codigo, descricao })
    console.log(produto);

    return response.status(200).json({})

  }

  async index(request, response){

    const produtos  = await knex.select().from("produtos");

    return response.json(produtos)

  }

  async show(request, response){
    const {codigo} = request.params;

   
    const produto = await knex.select().from("produtos").where({codigo:codigo});


    return response.json(produto)
  }

}
module.exports = ProdutoController