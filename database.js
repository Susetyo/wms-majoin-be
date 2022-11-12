const mysql = require('mysql');


// buat konfigurasi koneksi
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'majoinco_admin',
    password: 'plokijuh1234!',
    database: 'majoinco_wms',
    multipleStatements: true
});

//majoinco_wms | majoinco_admin | majoincoadmin12345

// koneksi database
connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = connection;