var fs = require('fs');
var path = require('path');
var connection = require('../library/database');
/**
 * INDEX admin
 */
const getAlladmin = function (req, res) {
 //query
 connection.query('SELECT * FROM tbl_admins', function (err, rows) {
 if (err) {
 res.send('error', err);
 res.json({
 data: ''
 });
 } else {
 //menampilkan hasil data admin
 res.json( {
 data: rows // <-- tampilkan data admin
 });
 }
 });
};

const getadminId = function (req, res) {
    let id = req.params.id;
    //query
    connection.query('SELECT * FROM tbl_admins WHERE id_admin ='+ id, function (err, rows) {
    if (err) {
    res.send('error', err);
    res.json({
    data: ''
    });
    } else {
    res.json( {
    data: rows
    });
    }
    });
   };
 

  const createadmin = function (req, res) {

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let gambar = req.file.filename;
    let alamat = req.body.alamat;
    let no_hp =  req.body.no_hp;
    let role = req.body.role;
    let errors = false;

    if(!username) {
    errors = true;
    res.json({pesan :'Field username belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!email) {
    errors = true;
    res.json({pesan :'Field email belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!password) {
        errors = true;
        res.json({pesan :'Field password belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!alamat) {
        errors = true;
        res.json({pesan :'Field alamat belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!no_hp) {
        errors = true;
        res.json({pesan :'Field nomer hp belum diisi, Field harus diisi dengan lengkap'});
    }

    if(!role) {
        errors = true;
        res.json({pesan :'Field role belum diisi, Field harus diisi dengan lengkap'});
    }

    // if no error
    if(!errors) {
    let formData = {
    username: username,
    email: email,
    password: password,
    gambar: gambar,
    alamat: alamat,
    no_hp: no_hp,
    role: role
    }
   
    // insert query
    connection.query('INSERT INTO tbl_admins SET ?', formData, function(err, result) {
    //if(err) throw err
    if (err) {
    res.json({pesan :'Data gagal disimpan'});
    } else {
    res.send('Data Berhasil Disimpan!');
    }
    })
   
   }
   }
   
   
/*
 * UPDATE kelas
 */
const updateadmin = function(req, res) {
    let id = req.params.id;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let gambar = req.file.filename;
    let alamat = req.body.alamat;
    let no_hp =  req.body.no_hp;
    let role = req.body.role;
    let errors = false;
    
    if(!username) {
        errors = true;
        res.json({pesan :'Field username belum diisi, Field harus diisi dengan lengkap'});
        }
    
        if(!email) {
        errors = true;
        res.json({pesan :'Field email belum diisi, Field harus diisi dengan lengkap'});
        }
    
        if(!password) {
            errors = true;
            res.json({pesan :'Field password belum diisi, Field harus diisi dengan lengkap'});
        }

        
        if(!alamat) {
            errors = true;
            res.json({pesan :'Field alamat belum diisi, Field harus diisi dengan lengkap'});
        }

        if(!no_hp) {
            errors = true;
            res.json({pesan :'Field nomer hp belum diisi, Field harus diisi dengan lengkap'});
        }

        if(!role) {
            errors = true;
            res.json({pesan :'Field role belum diisi, Field harus diisi dengan lengkap'});
        }
    
    // if no error
    if( !errors ) {
    let formData = {
        username: username,
        email: email,
        password: password,
        gambar: gambar,
        alamat: alamat,
        no_hp: no_hp,
        role: role
    }
    // update query
    connection.query('UPDATE tbl_admins SET ? WHERE id_admin = ' + id, formData, function(err, result) {
    //if(err) throw err
    if (err) {
    res.send('error', err);
    res.json({
    id_admin: req.params.id_admin,
    username: formData.username,
    email: formData.email,
    password: formData.password,
    gambar: formData.gambar,
    alamat: formData.alamat,
    no_hp: formData.no_hp,
    role: formData.role,
    })
    } else {
    res.send('Data Berhasil Diupdate!');
    }
    })
    }
   }

   const deleteadmin = function(req, res) {
    let id = req.params.id;
  
    // Pertama, ambil nama file gambar dari database
    connection.query('SELECT gambar FROM tbl_admins WHERE id_admin = ?', [id], function (err, rows) {
        if (err) {
            res.send('error', err);
            return;
        }
  
        if (rows.length === 0) {
            res.send('Data tidak ditemukan');
            return;
        }
  
        let gambar = rows[0].gambar;
        let gambarPath = path.join(__dirname, '../public/uploads/admin', gambar);
  
        // Hapus data teknisi dari database
        connection.query('DELETE FROM tbl_admins WHERE id_admin = ?', [id], function (err, result) {
            if (err) {
                res.send('error', err);
                return;
            }
  
            // Hapus file gambar dari sistem file
            fs.unlink(gambarPath, (err) => {
                if (err) {
                    res.send('Data berhasil dihapus, tetapi gagal menghapus gambar: ' + err);
                    return;
                }
  
                res.send('Data dan gambar berhasil dihapus!');
            });
        });
    });
  };





   module.exports = {
    getAlladmin,
    getadminId,
    createadmin,
    updateadmin,
    deleteadmin
   }