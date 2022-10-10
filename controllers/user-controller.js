const {checkUserExists} = require('../models/user');

const auth = (req,res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const data = { ...req.body };
  const querySql = `SELECT * FROM user WHERE username = ? and password = ?`
  checkUserExists(res,querySql,data)
}

module.exports = {
  auth
}