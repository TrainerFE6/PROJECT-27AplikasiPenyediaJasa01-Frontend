import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledTambahTeknisi } from "./StyledAddTeknisi";
import classes from './AddAdmin.module.css';
import { Link } from 'react-router-dom';



const TambahAdmin = () => {
  const [dataAdmin, setDataAdmin] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    // Fetch admin data from the server
    axios.get('http://localhost:5000/admin')
      .then(response => {
        setDataAdmin(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleShow = () => {
    setShow(!show);
  };

  const handleDeleteAdmin = (id) => {
    // Delete admin by ID
    axios.delete(`http://localhost:5000/admin/${id}`)
      .then(() => {
        // Filter out the deleted admin from state
        const updatedDataAdmin = dataAdmin.filter((admin) => admin.id_admin !== id);
        setDataAdmin(updatedDataAdmin);
      })
      .catch(error => {
        console.error('There was an error deleting the admin!', error);
      });
  };

  const handleShowDetails = (id) => {
    // Show details for the specified admin
    setShowDetails(id);
  };

  const handleCloseDetails = () => {
    // Close the details view
    setShowDetails(null);
  };

  return (
    <StyledTambahTeknisi>
      <h1>Tambah Admin</h1>
      <Link to="/signupadmin">
      <button className={classes.buttonEdit}>Tambah Admin Baru</button>
      </Link>

      <table className={classes.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Admin</th>
            <th>Role</th>
            <th>Email</th>
            <th>Gambar</th>
            <th>Alamat</th>
            <th>No HP</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataAdmin.map((admin) => (
            <React.Fragment key={admin.id_admin}>
              <tr>
                <td>{admin.id_admin}</td>
                <td>{admin.username}</td>
                <td>{admin.role}</td>
                <td>{admin.email}</td>
                <td>
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={`http://localhost:5000/uploads/admin/${admin.gambar}`}
                    alt="Gambar Admin"
                  />
                </td>
                <td>{admin.alamat}</td>
                <td>{admin.no_hp}</td>
                <td>
                  <button onClick={() => handleShowDetails(admin.id_admin)} className={classes.buttonShow}>Show</button>
                  <button className={classes.buttonEdit}>Edit</button>
                  <button onClick={() => handleDeleteAdmin(admin.id_admin)} className={classes.buttonDanger}>Hapus</button>
                </td>
              </tr>
              {showDetails === admin.id_admin && (
                <div className={classes.inputLayanan}>
                  <h1>Detail Admin</h1>
                  <p><strong>ID:</strong> {admin.id_admin}</p>
                  <p><strong>Nama:</strong> {admin.username}</p>
                  <p><strong>Role:</strong> {admin.role}</p>
                  <p><strong>Email:</strong> {admin.email}</p>
                  <p><strong>Gambar:</strong> <img src={`http://localhost:5000/uploads/admin/${admin.gambar}`} alt="Gambar Admin" style={{ width: "100px", height: "100px" }} /></p>
                  <p><strong>Alamat:</strong> {admin.alamat}</p>
                  <p><strong>No HP:</strong> {admin.no_hp}</p>
                  <button onClick={handleCloseDetails} className={classes.buttonEdit}>Tutup</button>
                </div>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </StyledTambahTeknisi>
  );
};

export default TambahAdmin;
