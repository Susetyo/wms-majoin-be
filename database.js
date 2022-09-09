const mysql = require('mysql');


// buat konfigurasi koneksi
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5U53ty0mul14p4mbud1!',
    database: 'majoin-wms',
    multipleStatements: true
});

// koneksi database
connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = connection;