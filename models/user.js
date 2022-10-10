const connection = require('../database');
const { responseData } = require('../utils/response-handler');

const checkUserExists = (response,statement,data) => {
  connection.query(statement,[data.username, data.password],(err, rows, field) =>{
    if(err) return response.status(500).json({ message: 'Ada kesalahan', error: err });
    responseData(response,200,rows)
  })
}

module.exports = {
  checkUserExists
}