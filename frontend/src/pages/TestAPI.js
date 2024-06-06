// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestAPI() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/teknisi')
      .then(response => {
        setData(response.data.data); // Accessing the 'data' property of the response
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React and Express</h1>
        {data.length > 0 ? (
          <ul>
            {data.map(teknisi => (
              <li key={teknisi.id_teknisi}>
                <p>Nama: {teknisi.nama}</p>
                <p>Alamat Cabang: {teknisi.alamat_cabang}</p>
                <p>No HP: {teknisi.no_hp}</p>
                <p>Status: {teknisi.status}</p>
                {teknisi.gambar && <img src={teknisi.gambar} alt={teknisi.nama} width="100" />}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default TestAPI;
