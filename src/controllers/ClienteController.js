const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");


class ClienteControllers {

  async create(request, response) {
    const { nome, email, telefone } = request.body;
    const database = await sqliteConnection();
    const checkClienteEmailExists = await database.get("SELECT * FROM clientes WHERE email = (?) OR telefone = (?)",[email, telefone])
    console.log(checkClienteEmailExists);

    return response.status(200).json({})

  }


}

module.exports = ClienteControllers