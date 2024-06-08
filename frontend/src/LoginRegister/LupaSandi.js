import React from 'react'
import { Link } from 'react-router-dom'


function LupaSandi() {
  return (
    <div className=' template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#1D204F' }}>
        <div className='signin p-5 rounded bg-white'>
        <form>
            <h3>Lupa kata sandi?</h3>
            <p>Masukan alamat email anda untuk mengatur ulang kata sandi!</p>
            <div className='mb-2'>
                <input type="email" placeholder='Masukan Email' className='form-control'/>
            </div>
            <div className='d-grid'>
                <Link to="/verifikasiemail" className='d-grid text-decoration-none'><button className='btn btn-primary'style={{ backgroundColor: '#1D204F' }}>Atur ulang kata sandi</button></Link>
            </div>
        </form>
        </div>
    </div>
  )
}

export default LupaSandi




