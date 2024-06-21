
let mysql = require('mysql2');

let connection = mysql.createConnection({
     host: 'educalab.id',
     user: 'PVs539vwtNMt7Ncb',
     password: 'qfJ6wzIyecQBWPMN',
     database: 'YsSqE2MU7M9rlns5',
     port: 3307
    });

connection.connect(function(error){
 if(!!error){
 console.log(error);
 }else{
 console.log('Koneksi ke database MySql Berhasil!');
 }
})
module.exports = connection;

// let mysql = require('mysql');
// let connection = mysql.createConnection({
//  host: 'localhost',
//  user: 'root',
//  password: '',
//  database: 'service-provider'
// });
// connection.connect(function(error){
//  if(!!error){
//  console.log(error);
//  }else{
//  console.log('Koneksi ke database MySql Berhasil!');
//  }
// })
// module.exports = connection;

