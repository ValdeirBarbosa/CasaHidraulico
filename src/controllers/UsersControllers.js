class UsersControllers {
  /**  Index  - GET lista todos registros | Show - GET para exibir um usuário especifico | Create -POST criar um registro  | update - PUT atualizar um registros | delete - DELETE para remover um registro */


  create(request, response) {
    const { name, email, password } = request.body;
    return response.status(201).json({ name, email, password });

  }
}
module.exports = UsersControllers