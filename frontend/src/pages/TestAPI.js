import React, { useState } from 'react';
import axios from 'axios';

const TambahDataUser = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        gambar: null,
        alamat: '',
        no_hp: ''
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
        console.log('Data setelah input berubah:', userData);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUserData({
            ...userData,
            gambar: file
        });
        console.log('Gambar yang dipilih:', file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Data sebelum dikirim:', userData);

        if (!userData.gambar) {
            console.error('Gambar harus dipilih');
            alert('Gambar harus dipilih');
            return;
        }

        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('gambar', userData.gambar);
        formData.append('alamat', userData.alamat);
        formData.append('no_hp', userData.no_hp);

        try {
            console.log('Mengirim data...');
            const response = await axios.post('http://localhost:5000/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Server response:', response.data);
            alert('Data berhasil ditambahkan!');
            setUserData({
                username: '',
                email: '',
                password: '',
                gambar: null,
                alamat: '',
                no_hp: ''
            });
        } catch (error) {
            console.error('Error saat mengirim data:', error);
            alert('Terjadi kesalahan saat menambahkan data.');
        }
    };

    return (
        <div>
            <h2>Tambah Data User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>username:</label>
                    <input type="text" name="username" value={userData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={userData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={userData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Gambar:</label>
                    <input type="file" name="gambar" onChange={handleFileChange} required />
                </div>
                <div>
                    <label>Alamat:</label>
                    <input type="text" name="alamat" value={userData.alamat} onChange={handleChange} />
                </div>
                <div>
                    <label>No HP:</label>
                    <input type="text" name="no_hp" value={userData.no_hp} onChange={handleChange} />
                </div>
                <button type="submit">Tambah Data User</button>
            </form>
        </div>
    );
};

export default TambahDataUser;
