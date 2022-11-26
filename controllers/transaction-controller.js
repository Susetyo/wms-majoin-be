const {
  getTransaction,
  searchTransaction
} = require('../models/transaction')

const readData = (req, res) => {
  const queryString = { ...req.query }
  const search = queryString.keyword ? `transaction.nomor_material LIKE '%${queryString.keyword}%' or barang.nama_material LIKE '%${queryString.keyword}%'` :null;
  const range = queryString.startDate && queryString.endDate ? `transaction.date between '${queryString.startDate}' and '${queryString.endDate}'`: null;
  const type = queryString.type ? `transaction.type = '${queryString.type}'` : null;
  const orderBy = range ? 'order by transaction.date asc' : 'order by transaction.date desc'

  let param = 'where ';
  if(search && type && range){
    param+=`${search} AND ${type} AND ${range}`; 
  }else if(search && type){
    param+=`${search} AND ${type}`; 
  } else if(search && range){
    param+= `${search} AND ${range}`
  } else if(type && range){
    param+= `${type} AND ${range}`;
  }else if(search){
    param+=search
  }else if(type){
    param+=type
  }else if(range){
    param+=range
  }else{
    param=''
  }

  const limit = queryString.limit ? `LIMIT ${queryString.limit}` : '';
  const offset = queryString.limit ? `OFFSET ${queryString.offset}` : '';

  const querySql = `SELECT user.username,barang.nama_material,transaction.* FROM barang 
  inner join transaction on transaction.nomor_material = barang.nomor_material 
  inner join user on transaction.user_id = user.id
  ${param} ${orderBy} ${limit} ${offset}`;

  getTransaction(res, querySql);
};

const searchData = (req, res) => {
  const queryString = {...req.query}
  const search = queryString.keyword ? `where transaction.nomor_material LIKE '%${queryString.keyword}%' or barang.nama_material LIKE '%${queryString.keyword}%'` : '';
  const sql = `SELECT barang.nama_material,transaction.* FROM barang 
  inner join transaction on transaction.nomor_material = barang.nomor_material 
  inner join user on transaction.user_id = user.id
  ${search}`
  searchTransaction(res,sql)
}

module.exports = {
  readData,
  searchData
}