import React from 'react'
import { Link } from 'react-router-dom'


function Signup() {
  return (
    <div className=' template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#1D204F' }}>
        <div className='signup p-5 rounded bg-white'>
        <form>
            <h3 className='text-center '>Sign Up</h3>
            <div className='mb-2'>
                {/* <label htmlFor='fname'>First Name</label> */}
                <input type="text" placeholder='username' className='form-control'/>
            </div>
            <div className='mb-2'>
                {/* <label htmlFor='email'>Email</label> */}
                <input type="email" placeholder='email' className='form-control'/>
            </div>
            <div className='mb-2'>
                {/* <label htmlFor='lname'>Last Name</label> */}
                <input type="password" placeholder='password' className='form-control'/>
            </div>
            <div className='mb-2'>
                {/* <label htmlFor='password'>Password</label> */}
                <input type="text" placeholder='alamat' className='form-control'/>
            </div>
            <div className='mb-2'>
                {/* <label htmlFor='password'>Password</label> */}
                <input type="text" placeholder='no_hp' className='form-control'/>
            </div>
            <div className='d-grid'>
            <Link to="/" className='d-grid text-decoration-none'><button className='btn btn-primary'style={{ backgroundColor: '#1D204F' }}>Daftar</button></Link>
            </div>
            <div className='text- mt-2'>
            Sudah punya akun?<Link to="/login" className='ms-2 text-decoration-none'>Sign In</Link>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Signup