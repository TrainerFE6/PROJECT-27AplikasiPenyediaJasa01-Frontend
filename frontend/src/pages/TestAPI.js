import React, { useState } from 'react';
import axios from 'axios';

const TestApi = () => {
  const [formData, setFormData] = useState({
    nama_katagori: '',
    judul: '',
    lokasi: '',
    harga: '',
    gambar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
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
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nama Kategori:</label>
        <input type="text" name="nama_katagori" value={formData.nama_katagori} onChange={handleChange} />
      </div>
      <div>
        <label>Judul:</label>
        <input type="text" name="judul" value={formData.judul} onChange={handleChange} />
      </div>
      <div>
        <label>Lokasi:</label>
        <input type="text" name="lokasi" value={formData.lokasi} onChange={handleChange} />
      </div>
      <div>
        <label>Harga:</label>
        <input type="text" name="harga" value={formData.harga} onChange={handleChange} />
      </div>
      <div>
        <label>Gambar:</label>
        <input type="file" name="gambar" onChange={handleFileChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TestApi;
