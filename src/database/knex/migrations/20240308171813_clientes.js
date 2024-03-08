
exports.up = knex => knex.schema.createTable("clientes", table => {
  table.increments("id");
  table.string("nome").notNullable();
  table.string("email").unique().notNullable()
  table.string("telefone");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.droptable("clientes");
