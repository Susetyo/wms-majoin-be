const {
  getBarang,
  insertBarang,
  updateBarang,
  deleteBarang,
  searchBarang
} = require('../models/barang')

const createData = (req, res) => {
  const data = { ...req.body };
  const querySql = 'INSERT INTO barang SET ?';
  insertBarang(res,querySql,data);
}

const readData = (req, res) => {
  const queryString = { ...req.query }
  const search = queryString.keyword ? `where nomor_material LIKE '%${queryString.keyword}%' or nama_material LIKE '%${queryString.keyword}%'` : '';
  const querySql = `SELECT * FROM barang ${search} LIMIT ${queryString.limit} OFFSET ${queryString.offset};`;
  getBarang(res, querySql);
};

const updateData = (req, res) => {
  const data = { ...req.body };
  const querySearch = 'SELECT * FROM barang WHERE id = ?';
  const queryUpdate = 'UPDATE barang SET ? WHERE id = ?';

  updateBarang(res, querySearch, queryUpdate, req.params.id, data);
};

const deleteData = (req, res) => {
  const querySearch = 'SELECT * FROM barang WHERE id = ?';
  const queryDelete = 'DELETE FROM barang WHERE id = ?';

  deleteBarang(res, querySearch, queryDelete, req.params.id);
};

const searchData = (req, res) => {
  const queryUrl = {...req.query}
  const sqlSearchIncoming = `SELECT * FROM transaction
    INNER JOIN barang on barang.nomor_material = transaction.nomor_material
    WHERE barang.nomor_material = '${queryUrl.nomorMaterial}' 
    OR barang.nama_material like '%${queryUrl.namaMaterial}%'
    AND transaction.type = 'incoming'`

    console.log(sqlSearchIncoming,"aaa")

  const sql = `SELECT * FROM barang 
    WHERE nomor_material like '%${queryUrl.nomorMaterial}%' 
    OR nama_material like '%${queryUrl.namaMaterial}%'`

  searchBarang(res,sql,queryUrl,sqlSearchIncoming)
}

module.exports = {
  readData,
  createData,
  updateData,
  deleteData,
  searchData
}