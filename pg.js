const { Pool } = require('pg');

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  database: "demo_edo",
  password: "1618"
});

// host: "queenie.db.elephantsql.com",
//   user: "earfxxpz",
//   port: 5432,
//   database: "earfxxpz",
//   password: "fXCjh9nnSLc_emALmCtFh5DpHdli4QQ5"

const rows = async (SQL, ...params) => {
  const client = await pool.connect()

  try {
    const { rows } = await client.query(SQL, params)
    return rows
  }
  finally {
    client.release()
  }
}

const row = async (SQL, ...params) => {
  const client = await pool.connect()

  try {
    const { rows: [row] } = await client.query(SQL, params)
    return row
  }
  finally {
    client.release()
  }
}

module.exports.rows = rows;
module.exports.row = row;