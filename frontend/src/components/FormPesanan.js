import React, { useState } from 'react';
import axios from 'axios';
import classes from './FormKategory.module.css';
import { useNavigate } from 'react-router-dom';

const FormPesanan = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_admin: '', // Admin ID
    id_user: '',  // User ID
    id_teknisi: '', // Technician ID
    id_katagori: '', // Category ID
    tanggal_bayar: '', // Payment Date
    tanggal_pelayanan: '', // Service Date
    total_harga: '', // Total Price
    opsi_pembayaran: '', // Payment Option
    bukti_pembayaran: null, // Payment Proof
    status: '' // Status
  });

  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      bukti_pembayaran: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('id_admin', formData.id_admin);
    data.append('id_user', formData.id_user);
    data.append('id_teknisi', formData.id_teknisi);
    data.append('id_katagori', formData.id_katagori);
    data.append('tanggal_bayar', formData.tanggal_bayar);
    data.append('tanggal_pelayanan', formData.tanggal_pelayanan);
    data.append('total_harga', formData.total_harga);
    data.append('opsi_pembayaran', formData.opsi_pembayaran);
    if (formData.bukti_pembayaran) {
      data.append('bukti_pembayaran', formData.bukti_pembayaran);
    }
    data.append('status', formData.status);

    try {
      const response = await axios.post('http://localhost:5000/pesanan', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      setIsFormVisible(false);
      setIsSubmitted(true);
      navigate('/dashboard/tambah-layanan');
    } catch (error) {
      console.error('Error posting data:', error);
      setErrorMessage('Gagal mengirim data, coba lagi nanti.');
    }
  };

  return (
    <>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div>
            <label className={classes.label}>Admin ID:</label>
            <input type="text" name="id_admin" value={formData.id_admin} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>User ID:</label>
            <input type="text" name="id_user" value={formData.id_user} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Technician ID:</label>
            <input type="text" name="id_teknisi" value={formData.id_teknisi} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Category ID:</label>
            <input type="text" name="id_katagori" value={formData.id_katagori} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Payment Date:</label>
            <input type="date" name="tanggal_bayar" value={formData.tanggal_bayar} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Service Date:</label>
            <input type="date" name="tanggal_pelayanan" value={formData.tanggal_pelayanan} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Total Price:</label>
            <input type="text" name="total_harga" value={formData.total_harga} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Payment Option:</label>
            <input type="text" name="opsi_pembayaran" value={formData.opsi_pembayaran} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Payment Proof:</label>
            <input type="file" name="bukti_pembayaran" onChange={handleFileChange} />
          </div>
          <div>
            <label className={classes.label}>Status:</label>
            <input type="text" name="status" value={formData.status} onChange={handleChange} />
          </div>
          <button type="submit" className={classes.buttonSubmit}>Submit</button>
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
        </form>
      )}
      {isSubmitted && (
        <>
          <p>Form submitted successfully!</p>
        </>
      )}
    </>
  );
};

export default FormPesanan;
