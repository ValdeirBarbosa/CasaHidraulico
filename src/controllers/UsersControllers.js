const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite");

class UsersControllers {
  /**  Index  - GET lista todos registros | Show - GET para exibir um usuário especifico | Create -POST criar um registro  | update - PUT atualizar um registros | delete - DELETE para remover um registro */


  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users where email =(?)", [email])
    if (checkUserExists) {
      throw new AppError("Este email ja esta em uso!")
    }
    const hashedPassword = await hash(password, 8);
    await database.run("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, hashedPassword])
    return response.status(201).json({ message: "Usuario criado com exito!" });
  }

  async update(request, response) {
    const { name, email, currentPassword, newPAssword } = request.body;
    const { id } = request.params;
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
    console.log(user);
    if (!user) {
      throw new AppError("Usuário nao encontrado!")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email ja esta em uso!");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (!currentPassword && newPAssword) {
      throw new AppError("Digite a Sennha atual!");
    }

    if (currentPassword && newPAssword) {
      const checkCurrentPassword = await compare(currentPassword, user.password);
      if (!checkCurrentPassword) {
        throw new AppError("Senha inválida")
      }
      user.password = await hash(newPAssword, 8)
    }
    await database.run(`
      UPDATE users SET 
      name = ?,
      email = ?,
      password = ?
      WHERE id = ?
    
    `, [user.name, user.email, user.password, id]
    );
    return response.status(200).json({})
  }
}
module.exports = UsersControllers