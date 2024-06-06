import React, { useState } from "react";
import { StyledTambahUser } from "./StyledAddUser";
import classes from "./AddUser.module.css";

const TambahUser = () => {
  const [dataUser, setDataUser] = useState([
    {
      id: 1,
      nama: "Amin 1",
      email: "Amin1@gmail.com",
      password: "egwdgfdgdf",
      alamat: "Semarang Timur",
      no_hp: 5000000,
    },
    {
      id: 2,
      nama: "Amin 2",
      email: "Amin2@gmail.com",
      password: "egwdgfdgdf",
      alamat: "Semarang Barat",
      no_hp: 5000000,
    },
    {
      id: 3,
      nama: "Amin 3",
      email: "Amin13@gmail.com",
      password: "egwdgfdgdf",
      alamat: "Semarang Timur",
      no_hp: 5000000,
    },
  ]);

  const [newUser, setNewUser] = useState({
    id: "",
    nama: "",
    email: "",
    password: "",
    alamat: "",
    no_hp: "",
  });

  const [show, setShow] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  const handleShow = () => {
    setShow(!show);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    const newId = dataUser.length ? dataUser[dataUser.length - 1].id + 1 : 1;
    const userToAdd = {
      ...newUser,
      id: newId,
      no_hp: parseInt(newUser.no_hp),
    };
    setDataUser([...dataUser, userToAdd]);
    setNewUser({ id: "", nama: "", email: "", password: "", alamat: "", no_hp: "" });
    setShow(false);
  };

  const handleDeleteUser = (id) => {
    const updatedDataUser = dataUser.filter((user) => user.id !== id);
    setDataUser(updatedDataUser);
  };

  const handleEditUser = (id) => {
    const userToEdit = dataUser.find((user) => user.id === id);
    setEditingId(id);
    setNewUser(userToEdit);
    setShow(true);
  };

  const handleSaveEditUser = () => {
    const updatedDataUser = dataUser.map((user) =>
      user.id === newUser.id ? newUser : user
    );
    setDataUser(updatedDataUser);
    setNewUser({ id: "", nama: "", email: "", password: "", alamat: "", no_hp: "" });
    setEditingId(null);
    setShow(false);
  };

  const handleShowDetails = (id) => {
    setShowDetails(id);
  };

  const handleCloseDetails = () => {
    setShowDetails(null);
  };

  return (
    <StyledTambahUser>
      <h1>Tambah User</h1>
      {!show && <button onClick={handleShow} className={classes.buttonEdit}>Tambah User Baru</button>}

      <div>
        {show && (
          <div className={classes.inputUser}>
            <h1>Form User</h1>
            <label>Masukkan Nama</label>
            <input
              type="text"
              name="nama"
              value={newUser.nama}
              onChange={handleInputChange}
              placeholder="Nama User"
            />
            <label>Masukkan Email User</label>
            <input
              type="text"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              placeholder="Email User"
            />
            <label>Masukkan Password</label>
            <input
              type="text"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            <label>Masukkan Alamat</label>
            <input
              type="text"
              name="alamat"
              value={newUser.alamat}
              onChange={handleInputChange}
              placeholder="Alamat"
            />
            <label>Masukkan No HP</label>
            <input
              type="number"
              name="no_hp"
              value={newUser.no_hp}
              onChange={handleInputChange}
              placeholder="No HP"
            />
            <div className={classes.buttonForm}>
              {editingId !== null ? (
                <button onClick={handleSaveEditUser} className={classes.buttonEdit}>Simpan Perubahan</button>
              ) : (
                <button onClick={handleAddUser} className={classes.buttonEdit}>Tambah User Baru</button>
              )}
              <button onClick={handleShow} className={classes.buttonEdit}>Tutup</button>
            </div>
          </div>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama User</th>
            <th>Email User</th>
            <th>Password</th>
            <th>Gambar</th>
            <th>Alamat</th>
            <th>No HP</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataUser.map((user) => (
            <React.Fragment key={user.id}>
              <tr>
                <td>{user.id}</td>
                <td>{user.nama}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>Gambar</td>
                <td>{user.alamat}</td>
                <td>{user.no_hp}</td>
                <td>
                  <button onClick={() => handleShowDetails(user.id)} className={classes.buttonShow}>Show</button>
                  <button onClick={() => handleEditUser(user.id)} className={classes.buttonEdit}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)} className={classes.buttonDanger}>Hapus</button>
                </td>
              </tr>
              {showDetails === user.id && (
                <div className={classes.inputUser}>
                  <h1>Detail User</h1>
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Nama:</strong> {user.nama}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Password:</strong> {user.password}</p>
                  <p><strong>Alamat:</strong> {user.alamat}</p>
                  <p><strong>No HP:</strong> {user.no_hp}</p>
                  <button onClick={handleCloseDetails} className={classes.buttonEdit}>Tutup</button>
                </div>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </StyledTambahUser>
  );
};

export default TambahUser;
