const Pool = require("pg").Pool

const pool = new Pool({ database: 'habitapp'});

module.exports = pool;
