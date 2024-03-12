
exports.up = knex => knex.schema.createTable("ordemServico", table => {
  table.increments("id");
  table.integer("user_id").references("id").inTable("users");
  table.integer("cliente_id").references("id").inTable("clientes");
  table.string("descricao_os").notNullable();
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("ordemServico");


