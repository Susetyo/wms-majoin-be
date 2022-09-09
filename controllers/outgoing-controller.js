const {
  outgoing
} = require('../models/outgoing')

const outgoingData = (req, res) => {
  const data = { ...req.body };
  const querySql = 'INSERT INTO transaction SET ?';
  outgoing(res,querySql,data);
}
module.exports = {
  outgoingData
}