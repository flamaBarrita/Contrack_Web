import mysql from 'mysql2/promise'; //conexión a la base de datos

const db = mysql.createPool({
    host: process.env.DB_HOST || 'mysql.railway.internal',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'xaveWluBuYHfErwWXMvoPiRRZCdJSXAe',
    database: process.env.DB_NAME || 'railway',
    port: process.env.DB_PORT || 3306,
  });

export default db;
