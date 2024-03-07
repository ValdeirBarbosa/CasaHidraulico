const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite");
const { application } = require("express");
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
    const { name, email} = request.body;
    const { id } = request.params;
    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
    if(!user){
      throw new AppError("Usuário nao encontrado!")
    }
    
    const userWithUpatedEmail = await database.get("SELECT * FROM users WHERE email = (?)",[email]);



    if (userWithUpatedEmail && userWithUpatedEmail.id !== user.id){
      throw new AppError("Este email ja esta em uso!");
    }


    user.name = name;
    user.email = email;

    await database.run(`
      UPDATE users SET 
      name = ?,
      email = ?
      WHERE id = ?
    
    `,[name, email,id]
    );

    return response.status(200).json({})



  }

 



  }

module.exports = UsersControllers