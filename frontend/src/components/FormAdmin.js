import React, { useState } from 'react';
import axios from 'axios';

const FormAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    gambar: null,
    alamat: '',
    no_hp: '',
    role: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      gambar: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Membuat FormData
    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('gambar', formData.gambar);
    data.append('alamat', formData.alamat);
    data.append('no_hp', formData.no_hp);
    data.append('role', formData.role);

    // Debugging: Log nilai setiap key dalam FormData
    console.log('FormData:');
    console.log('Username:', formData.username);
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);
    console.log('Gambar:', formData.gambar);
    console.log('Alamat:', formData.alamat);
    console.log('No HP:', formData.no_hp);
    console.log('Role:', formData.role);

    try {
      const response = await axios.post('http://localhost:5000/admin', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
      alert('Admin added successfully!');
    } catch (error) {
      console.error('Error posting data:', error);
      setErrorMessage('Failed to add admin');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <input type="file" name="gambar" onChange={handleFileChange} />
      <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Alamat" />
      <input type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} placeholder="No HP" />
      <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role" />
      <button type="submit">Submit</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default FormAdmin;
