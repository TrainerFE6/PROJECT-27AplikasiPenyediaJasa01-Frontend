import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Pembelian() {
  const [jenisLayanan, setJenisLayanan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [nama, setNama] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [totalHarga, setTotalHarga] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container m-5">
      <h2>Form Pembelian</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Jenis Layanan:</label>
          <input type="text" className="form-control" value={jenisLayanan} onChange={(e) => setJenisLayanan(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Tanggal:</label>
          <input type="date" className="form-control" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Nama:</label>
          <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Nomor Telepon:</label>
          <input type="tel" className="form-control" value={nomorTelepon} onChange={(e) => setNomorTelepon(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Total Harga:</label>
          <input type="number" className="form-control" value={totalHarga} onChange={(e) => setTotalHarga(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <input type="text" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>
        <Link to="/formpembayaran" className='text-decoration-none'><button type="submit" className='btn btn-primary'style={{ backgroundColor: '#1D204F' }}>
        Submit
        </button></Link>
      </form>
    </div>
  );
}

export default Pembelian;
