const  { Router } = require( "express");

const UserControllers = require("../controllers/UsersControllers");

const userRoutes = Router();

//exemplo de middleware
function MyMiddleware(request, response, next){
  console.log("Passou pelo MyMiddleware!!!");
  console.log(request.body)
  next()

}


const userControllers = new UserControllers();

userRoutes.get("/",userControllers.create);
module.exports = userRoutes;