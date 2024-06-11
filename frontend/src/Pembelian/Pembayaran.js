import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const FormPembayaran = () => {
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
    console.log('Bukti pembayaran dikirim:', transferImage);
    alert('Pembelian Anda Berhasil!');
  };

  return (
    <Container className='mt-5 p-5'>
      <h1 className="text-center mb-4">Bukti Pembayaran</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
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
};

export default FormPembayaran;
