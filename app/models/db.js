import mysql from 'mysql2/promise'; //conexión a la base de datos

const db = await mysql.createConnection({
    host: 'mysql.railway.internal',
    user: 'root',
    password: 'xaveWluBuYHfErwWXMvoPiRRZCdJSXAe',
    database: 'railway',
    port: '3306'
});

export default db;
