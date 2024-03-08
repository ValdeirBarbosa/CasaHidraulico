
exports.up = knex => knex.schema.createTable("itemsOrdemServico", table => {
  table.increments("id");
  table.integer("user_id").references("id").inTable("users");
  table.integer("cliente_id").references("id").inTable("cliente");
  table.integer("os_id").references("id").inTable("ordemServico").onDelete("CASCADE")
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.droptable("itemsOrdemServico");

