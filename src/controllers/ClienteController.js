const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const knex = require("../database/knex")


class ClienteControllers {
  async create(request, response) {
    const { nome, email, telefone } = request.body;
    const database = await sqliteConnection();
    const checkClienteEmailExists = await database.get("SELECT * FROM cliente WHERE email = (?) ",[email])
    if(checkClienteEmailExists){
      throw new AppError("Email ja em uso!",403)
    }
    await knex("cliente").insert({
      nome, email, telefone
    })
    return response.status(200).json({})
  }

  async index(request, response){
    const clientes = await knex.select('*').from("cliente");
    return response.status(200).json(clientes)
  }
  async show(request, response){
    const {id_cliente}  = request.params
    const clientes = await knex.select().from("cliente").where({ id: id_cliente });
    return response.status(200).json(clientes)
  }
}

module.exports = ClienteControllers