const barangRouter = require('./barang-route');
const userRouter = require('./user-route');
const incomingRouter = require('./incoming-route');
const outgoingRouter = require('./outgoing-route');
const transactionRouter = require('./transaction-route');

module.exports = {
  barangRouter,
  userRouter,
  incomingRouter,
  outgoingRouter,
  transactionRouter
}