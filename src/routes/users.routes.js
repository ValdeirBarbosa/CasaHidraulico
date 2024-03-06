const  { Router } = require( "express");

const UserControllers = require("../controllers/UsersControllers");

const userRoutes = Router();
const userControllers = new UserControllers();

userRoutes.get("/", userControllers.create);
module.exports = userRoutes;