const {
  createData,
  readData,
  updateData,
  deleteData,
  searchData
} = require('../controllers/barang-controller');
const express = require('express');
const barangRouter = express.Router();

barangRouter.route('/')
    .post(createData)
    .get(readData)
    
barangRouter.route('/search')
  .get(searchData)

barangRouter.route('/:id')
    .put(updateData)
    .delete(deleteData);

module.exports = barangRouter;