import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function FormPembelian() {
  const [jenisLayanan, setJenisLayanan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [nama, setNama] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [totalHarga, setTotalHarga] = useState('');
  const [status, setStatus] = useState('');
  const [paymentMode, setPaymentMode] = useState('transfer');
  const [transferImage, setTransferImage] = useState(null);

  const handleModeChange = (mode) => {
    setPaymentMode(mode);
  };

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setTransferImage(image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Data Pembelian:', { jenisLayanan, tanggal, nama, nomorTelepon, totalHarga, status });
    if (paymentMode === 'transfer') {
      console.log('Bukti pembayaran dikirim:', transferImage);
    }
    alert('Pembelian Anda Berhasil!');
  };

  return (
    <Container className='mt-5'>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Form Pembelian</h2>
          <Form onSubmit={handleSubmit}>
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
            <Form.Group>
              <Form.Label >Pilih Mode Pembayaran:</Form.Label>
              <Form.Check type="radio" label="Transfer" name="paymentMode" checked={paymentMode === 'transfer'} onChange={() => handleModeChange('transfer')}/>
              <Form.Check type="radio" label="COD (Cash On Delivery)" name="paymentMode" checked={paymentMode === 'cod'} onChange={() => handleModeChange('cod')} />
            </Form.Group>
            {paymentMode === 'transfer' && (
              <Form.Group>
                <Form.Label>Upload Gambar Bukti Transfer:</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageUpload}/>
              </Form.Group>
            )}
            <Button variant="primary" type="submit" className="mt-3" style={{ backgroundColor: '#1D204F' }}>
              Kirim
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default FormPembelian;
