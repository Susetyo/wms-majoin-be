const {
  incoming
} = require('../models/incoming')

const incomingData = (req, res) => {
  const data = { ...req.body };
  const querySql = 'INSERT INTO transaction SET ?';
  incoming(res,querySql,data);
}
module.exports = {
  incomingData
}