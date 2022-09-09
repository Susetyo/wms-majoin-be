const connection = require('../database');
const { responseData } = require('../utils/response-handler');
const util = require('util');

const queryPromise = util.promisify(connection.query).bind(connection);

const getTotalRows = async() => {
  const totalRows = await queryPromise('select count(*) from transaction');
  return totalRows[0]['count(*)']
}

const getTransaction = async(response, statement) => {
  const totalRows = await getTotalRows()
  connection.query(statement, (err, rows, field) => {
    if (err) return response.status(500).json({ message: 'Ada kesalahan', error: err });

    responseData(response, 200, {rows,totalRows});
  });
};


const searchTransction = (res, query) => {
  connection.query(query,(err,rows,field)=> {
    if(err) return res.status(500).json({ message: 'Ada kesalahan', error: err});
    responseData(res, 200, {rows});
  })
}

module.exports = {
  searchTransction,
  getTransaction
}