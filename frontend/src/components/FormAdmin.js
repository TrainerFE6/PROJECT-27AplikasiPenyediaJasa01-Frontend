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
import classes from './FormAdmin.module.css'; // Assume you have this CSS file
import { useNavigate } from 'react-router-dom';

const FormAdmin = ({ newAdmin, setNewAdmin, handleTutup }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    alamat: '',
    no_hp: '',
    role: '',
    gambar: null,
  });

  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (newAdmin.id_admin) {
      setFormData({
        username: newAdmin.username,
        email: newAdmin.email,
        password: '',
        alamat: newAdmin.alamat,
        no_hp: newAdmin.no_hp,
        role: newAdmin.role,
        gambar: null,
      });
    }
  }, [newAdmin]);

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
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('alamat', formData.alamat);
    data.append('no_hp', formData.no_hp);
    data.append('role', formData.role);
    if (formData.gambar) {
      data.append('gambar', formData.gambar);
    }

    try {
      let response;
      if (newAdmin.id_admin) {
        // Update existing admin
        response = await axios.put(`http://localhost:5000/admin/${newAdmin.id_admin}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Create new admin
        response = await axios.post('http://localhost:5000/admin', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      console.log('Response:', response.data);
      setIsFormVisible(false);
      setIsSubmitted(true);
      handleTutup();
      navigate('/dashboard/admin');
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
            <label className={classes.label}>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          {!newAdmin.id_admin && (
            <div>
              <label className={classes.label}>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
          )}
          <div>
            <label className={classes.label}>Alamat:</label>
            <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>No HP:</label>
            <input type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} />
          </div>
          <div>
            <label className={classes.label}>Role:</label>
            <select type="text" name="role" value={formData.role} onChange={handleChange}>
            <option value="{formData.role}">{formData.role}</option>
            <option value="Admin">Admin</option>
            <option value="Superadmin">Superadmin</option>
          </select>
          </div>
          <div>
            <label className={classes.label}>Gambar:</label>
            <input type="file" name="gambar" onChange={handleFileChange} />
            {newAdmin.gambar && !formData.gambar && (
              <div className={classes.imagePreview}>
                <img src={`http://localhost:5000/uploads/admin/${newAdmin.gambar}`} 
                 alt="Gambar admin"
                  style={{ width: '100px', height: '100px', marginTop: '10px' }} />
              </div>
            )}
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

export default FormAdmin;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import classes from './FormAdmin.module.css';
// import { useNavigate } from 'react-router-dom';

// const FormAdmin = ({ newAdmin, setNewAdmin, handleTutup }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: '',
//     role: '',
//     email: '',
//     gambar: null,
//     alamat: '',
//     no_hp: '',
//   });

//   const [isFormVisible, setIsFormVisible] = useState(true);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     if (newAdmin.id_admin) {
//       setFormData({
//         username: newAdmin.username,
//         role: newAdmin.role,
//         email: newAdmin.email,
//         gambar: null, // Assume the image needs to be re-uploaded if changed
//         alamat: newAdmin.alamat,
//         no_hp: newAdmin.no_hp,
//       });
//     }
//   }, [newAdmin]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData(prevData => ({
//       ...prevData,
//       gambar: e.target.files[0],
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append('username', formData.username);
//     data.append('role', formData.role);
//     data.append('email', formData.email);
//     data.append('alamat', formData.alamat);
//     data.append('no_hp', formData.no_hp);
//     if (formData.gambar) {
//       data.append('gambar', formData.gambar);
//     }

//     try {
//       let response;
//       if (newAdmin.id_admin) {
//         // Update existing admin
//         response = await axios.put(`http://localhost:5000/admin/${newAdmin.id_admin}`, data, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//       } else {
//         // Create new admin
//         response = await axios.post('http://localhost:5000/admin', data, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//       }
//       console.log('Response:', response.data);
//       setIsFormVisible(false);
//       setIsSubmitted(true);
//       handleTutup();
//       navigate('/dashboard/tambah-admin');
//     } catch (error) {
//       console.error('Error posting data:', error);
//       setErrorMessage('Gagal mengirim data, coba lagi nanti.');
//     }
//   };

//   return (
//     <>
//       {isFormVisible && (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label className={classes.label}>Username:</label>
//             <input type="text" name="username" value={formData.username} onChange={handleChange} />
//           </div>
//           <div>
//             <label className={classes.label}>Role:</label>
//             <input type="text" name="role" value={formData.role} onChange={handleChange} />
//           </div>
//           <div>
//             <label className={classes.label}>Email:</label>
//             <input type="email" name="email" value={formData.email} onChange={handleChange} />
//           </div>
//           <div>
//             <label className={classes.label}>Alamat:</label>
//             <input type="text" name="alamat" value={formData.alamat} onChange={handleChange} />
//           </div>
//           <div>
//             <label className={classes.label}>No. HP:</label>
//             <input type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} />
//           </div>
//           <div>
//             <label className={classes.label}>Gambar:</label>
//             <input type="file" name="gambar" onChange={handleFileChange} />
//           </div>
//           <button type="submit" className={classes.buttonSubmit}>Submit</button>
//           {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
//         </form>
//       )}
//       {isSubmitted && (
//         <div className={classes.successMessage}>
//           <p>Data berhasil dikirim!</p>
//           <button onClick={() => {
//             setIsFormVisible(true);
//             setIsSubmitted(false);
//             handleTutup();
//           }}>Tambah Admin Lagi</button>
//         </div>
//       )}
//     </>
//   );
// };

// export default FormAdmin;

