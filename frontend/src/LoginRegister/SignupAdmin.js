import React, { useState } from 'react';
import { Link } from 'react-router-dom'


function SignupAdmin() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    alamat: '',
    no_hp: '',
    role: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Kirim data sign up ke backend atau lakukan validasi di sini
    console.log(formData);
  };

  return (
    <div className=' template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#1D204F' }}>
      <div className='p-5 rounded bg-white'>
        <h2 className='text-center'>Sign Up  Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-2'>
          {/* <label htmlFor="username">Username:</label> */}
          <input
            type="text"
            id="username"
            name="username"
            placeholder='username'
            value={formData.username}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <div className='mb-2'>
          {/* <label htmlFor="email">Email:</label> */}
          <input
            type="email"
            id="email"
            name="email"
            placeholder='email'
            value={formData.email}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <div className='mb-2'>
          {/* <label htmlFor="password">Password:</label> */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder='password'
            value={formData.password}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <div className='mb-2'>
          {/* <label htmlFor="alamat">alamat:</label> */}
          <input
            type="text"
            id="alamat"
            name="alamat"
            placeholder='alamat'
            value={formData.alamat}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <div className='mb-2'>
          {/* <label htmlFor="no_hp"</label> */}
          <input
            type="tel"
            id="no_hp"
            name="no_hp"
            placeholder='no_hp'
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className='form-control'
          />
        </div>
        <div className='mb-2'>
          {/* <label htmlFor="role">Role:</label> */}
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className='form-control'>

            <option value="admin">admin</option>
            <option value="superadmin">superadmin</option>
          </select>
        </div>
        <div className='d-grid'>
            <Link to="/loginadmin" className='d-grid text-decoration-none'><button className='btn btn-primary'style={{ backgroundColor: '#1D204F' }}>Daftar</button></Link>
            </div>
      </form>
      </div>
    </div>
  );
}

export default SignupAdmin;
