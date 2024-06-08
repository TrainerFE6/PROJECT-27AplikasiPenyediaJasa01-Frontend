import React, { useState } from 'react';
import axios from 'axios';
import classes from './FormKategory.module.css';
import { useNavigate } from 'react-router-dom';

const FormKategory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama_katagori: '',
    judul: '',
    lokasi: '',
    harga: '',
    gambar: null,
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
      gambar: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nama_katagori', formData.nama_katagori);
    data.append('judul', formData.judul);
    data.append('lokasi', formData.lokasi);
    data.append('harga', formData.harga);
    data.append('gambar', formData.gambar);

    try {
      const response = await axios.post('http://localhost:5000/kategori', data, {
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
            <label className={classes.label}>Nama Kategori 123:</label>
            <input type="text" name="nama_katagori" value={formData.nama_katagori} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Judul:</label>
            <input type="text" name="judul" value={formData.judul} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Lokasi:</label>
            <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Harga:</label>
            <input type="text" name="harga" value={formData.harga} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Gambar:</label>
            <input type="file" name="gambar" onChange={handleFileChange} />
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

export default FormKategory;
