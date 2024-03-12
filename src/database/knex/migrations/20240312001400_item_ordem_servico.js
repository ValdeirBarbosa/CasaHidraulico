
exports.up = knex => knex.schema.createTable("item_ordem_servico", table => {
  table.increments("id");
  table.integer("user_id").references("id").inTable("user");
  table.integer("cliente_id").references("id").inTable("cliente");
  table.integer("os_id").references("id").inTable("ordem_servico").onDelete("CASCADE")
  table.integer("produto_id").references("id").inTable("produto");
  table.integer("prod_qtd");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.droptable("item_ordem_servico");

