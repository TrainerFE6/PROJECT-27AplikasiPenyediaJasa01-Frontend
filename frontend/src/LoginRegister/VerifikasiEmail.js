import React from 'react'
import { Link } from 'react-router-dom'

function VerifikasiEmail() {
  return (
    <div className=' template d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#1D204F' }}>
        <div className='signin p-5 rounded bg-white'>
        <form>
            <h3>Email terkirim!</h3>
            <p>Kami  sudah mengirim surel yang berisi tautan untuk mereset kata sandi Anda!</p>
            <div className='mb-2'>
                <input type="email" placeholder='Kirim ulang' className='form-control'/>
            </div>
            <div className='d-grid'>
                <Link to="/login" className='d-grid text-decoration-none'><button className='btn btn-primary'style={{ backgroundColor: '#1D204F' }}>Kembali Ke Halaman Login</button></Link>
            </div>
        </form>
        </div>
    </div>
  )
}
export default VerifikasiEmail