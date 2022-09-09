const {
  readData,
  searchData
} = require('../controllers/transaction-controller');
const express = require('express');
const transactionRouter = express.Router();

transactionRouter.route('/')
    .get(readData)
    
transactionRouter.route('/search')
  .get(searchData)

module.exports = transactionRouter;