
exports.up = knex=>knex.schema.createTable("produtos", table=>{
  table.increments("id");
  table.text("codigo");
  table.text("descricao")

});

exports.down =  knex => knex.schema.droptable("produtos");
