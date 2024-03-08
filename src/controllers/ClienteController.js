const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const knex = require("../database/knex")


class ClienteControllers {
  async create(request, response) {
    const { nome, email, telefone } = request.body;
    const database = await sqliteConnection();
    const checkClienteEmailExists = await database.get("SELECT * FROM clientes WHERE email = (?) OR telefone = (?)",[email, telefone])
    if(checkClienteEmailExists){
      throw new AppError("Email ou telefone ja em uso!",403)
    }
    await knex("clientes").insert({
      nome, email, telefone
    })
    return response.status(200).json({})
  }

  async index(request, response){
    const clientes = await knex.select('*').from("clientes");
    return response.status(200).json(clientes)
  }
}

module.exports = ClienteControllers