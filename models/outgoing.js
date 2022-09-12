const connection = require('../database');
const { responseMessage } = require('../utils/response-handler');
const util = require('util')
const queryPromise = util.promisify(connection.query).bind(connection);

const getQty = async(nomor_material) => {
  const query = await queryPromise(`SELECT * FROM barang WHERE nomor_material='${nomor_material}'`);
  
  return JSON.parse(JSON.stringify(query))[0]
}


const outgoing = async(res, statement,body) => {
  const {nomor_material,qty,date, nama_barang,note,posisi, user_id} = body 
  const {id, qty:q} = await getQty(body.nomor_material)
  const qtyNew = q - parseInt(qty);

  const data = {
    nomor_material,
    qty,
    date,
    posisi,
    user_id,
    note,
    type:'outgoing'
  }


  const queryUpdate = `UPDATE barang SET qty=${qtyNew} WHERE id = ${id} and nomor_material = '${body.nomor_material}'`;
  
  connection.query(queryUpdate, data, (err, rows, field) => {
    if (err) return res.status(500).json({ message: 'Gagal insert data!', error: err });

    connection.query(statement,data,(error,rows,field) => {
      console.log({error,rows,field})
      if(error) return res.status(500).json({ message: 'Gagal insert data!', error: err });

      responseMessage(res,201,'Berhasil insert data', {nomor_material,qty,date, nama_barang,note,posisi});
    })

  });
}

module.exports = {
  outgoing
}