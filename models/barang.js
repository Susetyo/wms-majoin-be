const connection = require('../database');
const { responseData, responseMessage } = require('../utils/response-handler');
const util = require('util');

const queryPromise = util.promisify(connection.query).bind(connection);

const getTotalRows = async() => {
  const totalRows = await queryPromise('select count(*) from barang');
  return totalRows[0]['count(*)']
}

const getBarang = async(response, statement) => {
  const totalRows = await getTotalRows()
  connection.query(statement, (err, rows, field) => {
    if (err) return response.status(500).json({ message: 'Ada kesalahan', error: err });

    responseData(response, 200, {rows,totalRows});
  });
};

const insertBarang =  (res, statement, data) => {
  connection.query(statement, data, (err, rows, field) => {
    if (err) return res.status(500).json({ message: 'Gagal insert data!', error: err });
    responseMessage(res,201,'Berhasil insert data');
  });
};

const updateBarang = (res, searchStatement, updateStatement,id, data) => {
  connection.query(searchStatement, id, (err, rows, field) => {
    if (err) return res.status(500).json({ message: 'Ada kesalahan', error: err });
  
    if (rows.length) {
      connection.query(updateStatement, [data, id], (err, rows, field) => {
        if (err) return res.status(500).json({ message: 'Ada kesalahan', error: err });
        responseMessage(res, 200, 'Berhasil update data!');
      });
    } else {
      return res.status(404).json({ message: 'Data tidak ditemukan!', success: false });
    }
  });
}

const deleteBarang = (res, searchStatement, deleteStatement, id) => {
  connection.query(searchStatement, id, (err, rows, field) => {
    if (err)  return res.status(500).json({ message: 'Ada kesalahan', error: err });

    if (rows.length) {
      connection.query(deleteStatement, id, (err, rows, field) => {
        if (err) return res.status(500).json({ message: 'Ada kesalahan', error: err });
        responseMessage(res, 200, 'Berhasil hapus data!');
      });
    } else {
      return res.status(404).json({ success: false, message: 'Data tidak ditemukan!' });
    }
  });
};

const searchBarang = (res, query) => {
  connection.query(query,(err,rows,field)=> {
    if(err) return res.status(500).json({ message: 'Ada kesalahan', error: err});
    responseData(res, 200, {rows});
  })
}

module.exports = {
  getBarang,
  insertBarang,
  updateBarang,
  deleteBarang,
  searchBarang
}