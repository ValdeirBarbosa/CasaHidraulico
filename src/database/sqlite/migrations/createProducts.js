const createProducts =`
CREATE TABLE IF NOT EXISTS produto(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo VARCHAR,
  descricao VARCHAR,
  quantidade INTEGER NOT NULL,
 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

module.exports = createProducts