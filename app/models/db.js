import mysql from 'mysql2/promise'; //conexión a la base de datos

const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contrack'
});

export default db;
