// import React, { useState } from 'react';
// import axios from 'axios';

// const FormAdmin = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     gambar: null,
//     alamat: '',
//     no_hp: '',
//     role: ''
//   });
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData(prevData => ({
//       ...prevData,
//       gambar: e.target.files[0]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Membuat FormData
//     const data = new FormData();
//     data.append('username', formData.username);
//     data.append('email', formData.email);
//     data.append('password', formData.password);
//     data.append('gambar', formData.gambar);
//     data.append('alamat', formData.alamat);
//     data.append('no_hp', formData.no_hp);
//     data.append('role', formData.role);

//     // Debugging: Log nilai setiap key dalam FormData
//     console.log('FormData:');
//     console.log('Username:', formData.username);
//     console.log('Email:', formData.email);
//     console.log('Password:', formData.password);
//     console.log('Gambar:', formData.gambar);
//     console.log('Alamat:', formData.alamat);
//     console.log('No HP:', formData.no_hp);
//     console.log('Role:', formData.role);

//     try {
//       const response = await axios.post('http://localhost:5000/admin', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log('Response:', response.data);
//       alert('Admin added successfully!');
//     } catch (error) {
//       console.error('Error posting data:', error);
//       setErrorMessage('Failed to add admin');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
//       <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
//       <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
//       <input type="file" name="gambar" onChange={handleFileChange} />
//       <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Alamat" />
//       <input type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} placeholder="No HP" />
//       <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role" />
//       <button type="submit">Submit</button>
//       {errorMessage && <p>{errorMessage}</p>}
//     </form>
//   );
// };

// export default FormAdmin;

import React, { useState, useEffect } from 'react';
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
  const [admins, setAdmins] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin');
      setAdmins(response.data.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

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
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      if (editing) {
        await axios.put(`http://localhost:5000/admin/${currentId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Admin updated successfully!');
      } else {
        await axios.post('http://localhost:5000/admin', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Admin added successfully!');
      }
      fetchAdmins();
      setFormData({ username: '', email: '', password: '', gambar: null, alamat: '', no_hp: '', role: '' });
      setEditing(false);
      setCurrentId(null);
    } catch (error) {
      console.error('Error submitting data:', error);
      setErrorMessage('Failed to submit admin data');
    }
  };

  const handleEdit = (admin) => {
    setFormData({
      username: admin.username,
      email: admin.email,
      password: admin.password,
      gambar: null,
      alamat: admin.alamat,
      no_hp: admin.no_hp,
      role: admin.role
    });
    setEditing(true);
    setCurrentId(admin.id_admin);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/${id}`);
      alert('Admin deleted successfully!');
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
      setErrorMessage('Failed to delete admin');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <input type="file" name="gambar" onChange={handleFileChange} />
        <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Alamat" />
        <input type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} placeholder="No HP" />
        <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="Role" />
        <button type="submit">{editing ? 'Update' : 'Submit'}</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <ul>
        {admins.map(admin => (
          <li key={admin.id_admin}>
            {admin.username} - {admin.email}
            <button onClick={() => handleEdit(admin)}>Edit</button>
            <button onClick={() => handleDelete(admin.id_admin)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormAdmin;
