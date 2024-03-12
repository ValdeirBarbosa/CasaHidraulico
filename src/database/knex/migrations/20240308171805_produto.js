
exports.up = knex => knex.schema.createTable("produto", table => {
  table.increments("id");
  table.text("codigo");
  table.text("descricao");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());


});

exports.down = knex => knex.schema.droptable("produto");
