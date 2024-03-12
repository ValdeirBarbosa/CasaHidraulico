const sqliteConnection = require("../../sqlite");
const sqlConnection = require("../../sqlite");
const createUsers = require("./createUser");
const createProduct = require("./createProducts")

async function migrationsRun() {
  const schemas = [
    createUsers,
   // createProduct  exemplo de como add mais de uma query 
  ].join(';');

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));

};

module.exports = migrationsRun;