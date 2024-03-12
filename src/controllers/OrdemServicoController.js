const AppError = require("../utils/AppError");
const knex = require("../database/knex")

class OrdemServicoController {

  async create(request, response) {
    const { user_id } = request.params
    const { cliente_id, descricao_os, produtos } = request.body

    const [currentUser] = await knex("users").where({ id: user_id });
    const [currentCliente] = await knex("clientes").where({ id: cliente_id });
    console.log(currentCliente);
    if (!currentUser || !currentCliente) {
      throw new AppError("Usuario / Cliente  nao existe")
    }

    return response.json({ cliente_id, descricao_os, produtos })
  }

}
module.exports = OrdemServicoController