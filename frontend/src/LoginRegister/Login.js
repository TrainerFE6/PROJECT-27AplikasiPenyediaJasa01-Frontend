// import React from 'react'
// // import "./style/loginsignup.css"
// import { Link } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Login() {
    
//   return (
//     <div className=' template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#1D204F' }}>
//         <div className='signin p-5 rounded bg-white'>
//         <form>
//             <h3 className='text-center'>Sign In</h3>
//             <div className='mb-2'>
//                 {/* <label htmlFor='email'>Email</label> */}
//                 <input type="email" placeholder='Masukan Email' className='form-control'/>
//             </div>
//             <div className='mb-2'>
//                 {/* <label htmlFor='password'>Password</label> */}
//                 <input type="password" placeholder='Masukan Password' className='form-control'/>
//             </div>
//             {/* <div className='text- mt-2 mb-2 '>
//             Forget <Link to="/lupasandi" className='text-decoration-none'>Password?</Link>
//             </div> */}
//             <div className='d-grid'>
//                 <Link to="/" className='d-grid text-decoration-none'><button className='btn btn-primary'style={{ backgroundColor: '#1D204F' }}>Login</button></Link>
//             </div>
//             <div className='text- mt-2'>
//                 Belum punya akun? <Link to="/signup" className='ms-2 text-decoration-none'>Sign up</Link>
//             </div>
//         </form>
//         </div>
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/'); // Redirect ke halaman utama setelah login sukses
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className=' template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#1D204F' }}>
      <div className='signin p-5 rounded bg-white'>
        <form onSubmit={handleLogin}>
          <h3 className='text-center'>Sign In</h3>
          <div className='mb-2'>
            <input type="email" placeholder='Masukan Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='mb-2'>
            <input type="password" placeholder='Masukan Password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className='d-grid'>
            <button type="submit" className='btn btn-primary' style={{ backgroundColor: '#1D204F' }}>Login</button>
          </div>
          <div className='text- mt-2'>
            Belum punya akun? <Link to="/signup" className='ms-2 text-decoration-none'>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
