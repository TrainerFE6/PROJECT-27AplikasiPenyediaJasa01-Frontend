var fs = require('fs');
var path = require('path');
var connection = require('../library/database');

/**
 * INDEX order
 */
const getAllorder = function (req, res) {
    connection.query('SELECT * FROM tbl_orders', function (err, rows) {
        if (err) {
            res.send('error', err);
        } else {
            res.json({
                data: rows
            });
        }
    });
};

const getorderId = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM tbl_orders WHERE id_pesanan = ' + id, function (err, rows) {
        if (err) {
            res.send('error', err);
        } else {
            res.json({
                data: rows
            });
        }
    });
};

const createorder = function (req, res) {
    let id_admin = req.body.id_admin;
    let id_user = req.body.id_user;
    let id_teknisi = req.body.id_teknisi;
    let nama_teknisi = req.body.nama_teknisi;
    let tanggal_bayar = req.body.tanggal_bayar;
    let tanggal_pembayaran = req.body.tanggal_pembayaran;
    let total_harga = req.body.total_harga;
    let opsi_pembayaran = req.body.opsi_pembayaran;
    let bukti_pembayaran = req.file.filename;
    let status = req.body.status;
    let errors = false;

       if(!id_admin) {
    errors = true;
    res.json({pesan :'Field id_admin belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!id_user) {
        errors = true;
        res.json({pesan :'Field id_user cabang belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!id_teknisi) {
        errors = true;
        res.json({pesan :'Field id_teknisi hp belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!nama_teknisi) {
        errors = true;
        res.json({pesan :'Field nama_teknisi belum diisi, Field harus diisi dengan lengkap'});
    }

    
    if(!tanggal_bayar) {
        errors = true;
        res.json({pesan :'Field tanggal_bayar belum diisi, Field harus diisi dengan lengkap'});
    }

    
    if(!tanggal_pembayaran) {
        errors = true;
        res.json({pesan :'Field tanggal_pembayaran belum diisi, Field harus diisi dengan lengkap'});
    }

    
    if(!total_harga) {
        errors = true;
        res.json({pesan :'Field total_harga belum diisi, Field harus diisi dengan lengkap'});
    }

    
    if(!opsi_pembayaran) {
        errors = true;
        res.json({pesan :'Field opsi_pembayaran belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!status) {
        errors = true;
        res.json({pesan :'Field opsi_pembayaran belum diisi, Field harus diisi dengan lengkap'});
    }    
    


    if (!errors) {
        let formData = {
            id_admin: id_admin,
            id_user: id_user,
            id_teknisi: id_teknisi,
            nama_teknisi: nama_teknisi,
            tanggal_bayar: tanggal_bayar,
            tanggal_pelayanan: tanggal_pelayanan,
            total_harga: total_harga,
            opsi_pembayaran: opsi_pembayaran,
            bukti_pembayaran: bukti_pembayaran,
            status: status
        };

        connection.query('INSERT INTO tbl_orders SET ?', formData, function (err, result) {
            if (err) {
                res.json({ pesan: 'Data gagal disimpan' });
            } else {
                res.send('Data Berhasil Disimpan!');
            }
        });
    }
};

const updateorder = function (req, res) {
    let id_admin = req.body.id_admin;
    let id_user = req.body.id_user;
    let id_teknisi = req.body.id_teknisi;
    let nama_teknisi = req.body.nama_teknisi;
    let tanggal_bayar = req.body.tanggal_bayar;
    let tanggal_pelayanan = req.body.tanggal_pelayanan;
    let total_harga = req.body.total_harga;
    let opsi_pembayaran = req.body.opsi_pembayaran;
    let bukti_pembayaran = req.file.filename;
    let status = req.body.status;
    let errors = false;

       if(!nama) {
    errors = true;
    res.json({pesan :'Field nama belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!alamat_cabang) {
        errors = true;
        res.json({pesan :'Field alamat cabang belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!no_hp) {
        errors = true;
        res.json({pesan :'Field nomer hp belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!status) {
        errors = true;
        res.json({pesan :'Field role belum diisi, Field harus diisi dengan lengkap'});
    }

    if (!errors) {
        let formData = {
            id_admin: id_admin,
            id_user: id_user,
            id_teknisi: id_teknisi,
            nama_teknisi: nama_teknisi,
            tanggal_bayar: tanggal_bayar,
            tanggal_pelayanan: tanggal_pelayanan,
            total_harga: total_harga,
            opsi_pembayaran: opsi_pembayaran,
            bukti_pembayaran: bukti_pembayaran,
            status: status
        };

        connection.query('UPDATE tbl_orders SET ? WHERE id_pesanan = ' + id, formData, function (err, result) {
            if (err) {
                res.send('error', err);
            } else {
                res.send('Data Berhasil Diupdate!');
            }
        });
    }
};


const deleteorder = function (req, res) {
  let id = req.params.id;

  // Pertama, ambil nama file bukti_pembayaran dari database
  connection.query('SELECT bukti_pembayaran FROM tbl_orders WHERE id_pesanan = ?', [id], function (err, rows) {
      if (err) {
          res.send('error', err);
          return;
      }

      if (rows.length === 0) {
          res.send('Data tidak ditemukan');
          return;
      }

      let bukti_pembayaran = rows[0].bukti_pembayaran;
      let bukti_pembayaranPath = path.join(__dirname, '../public/uploads/order', bukti_pembayaran);

      // Hapus data order dari database
      connection.query('DELETE FROM tbl_orders WHERE id_pesanan = ?', [id], function (err, result) {
          if (err) {
              res.send('error', err);
              return;
          }

          // Hapus file bukti_pembayaran dari sistem file
          fs.unlink(bukti_pembayaranPath, (err) => {
              if (err) {
                  res.send('Data berhasil dihapus, tetapi gagal menghapus bukti_pembayaran: ' + err);
                  return;
              }

              res.send('Data dan bukti_pembayaran berhasil dihapus!');
          });
      });
  });
};

module.exports = {
  getAllorder,
  getorderId,
  createorder,
  updateorder,
  deleteorder
};

