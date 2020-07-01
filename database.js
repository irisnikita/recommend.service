const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '23.98.41.111',
    port: '3306',
    user: 'root',
    password: 'tjmwjm824594',
    database: 'room_schema'
});

module.exports = connection;
