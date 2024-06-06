import React, { useState } from "react";
import { StyledTambahTeknisi } from "./StyledAddTeknisi";
import classes from "./AddTeknisi.module.css";

const TambahTeknisi = () => {
  const [dataTeknisi, setDataTeknisi] = useState([
    {
      id: 1,
      nama: "Amin AC",
      alamat_cabang: "Semarang Timur",
      no_hp: 5000000,
      status: "siap",
    },
    {
      id: 2,
      nama: "Anis AC",
      alamat_cabang: "Semarang Barat",
      no_hp: 5000000,
      status: "bertugas",
    },
    {
      id: 3,
      nama: "Anis AC",
      alamat_cabang: "Semarang Timur",
      no_hp: 5000000,
      status: "siap",
    },
  ]);

  const [newTeknisi, setNewTeknisi] = useState({
    id: "",
    nama: "",
    alamat_cabang: "",
    no_hp: "",
    status: "",
  });

  const [show, setShow] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  const handleShow = () => {
    setShow(!show);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeknisi({ ...newTeknisi, [name]: value });
  };

  const handleAddTeknisi = () => {
    const newId = dataTeknisi.length
      ? dataTeknisi[dataTeknisi.length - 1].id + 1
      : 1;
    const TeknisiToAdd = {
      ...newTeknisi,
      id: newId,
      status: parseInt(newTeknisi.status),
    };
    setDataTeknisi([...dataTeknisi, TeknisiToAdd]);
    setNewTeknisi({ id: "", nama: "", alamat_cabang: "", no_hp: "", status: "" });
  };

  const handleDeleteTeknisi = (id) => {
    const updatedDataTeknisi = dataTeknisi.filter((Teknisi) => Teknisi.id !== id);
    setDataTeknisi(updatedDataTeknisi);
  };

  const handleEditTeknisi = (id) => {
    const TeknisiToEdit = dataTeknisi.find((Teknisi) => Teknisi.id === id);
    setEditingId(id);
    setNewTeknisi(TeknisiToEdit);
    setShow(true);
  };

  const handleSaveEditTeknisi = () => {
    const updatedDataTeknisi = dataTeknisi.map((Teknisi) =>
      Teknisi.id === newTeknisi.id ? newTeknisi : Teknisi
    );
    setDataTeknisi(updatedDataTeknisi);
    setNewTeknisi({ id: "", nama: "", alamat_cabang: "", no_hp: "", status: "" });
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
    <StyledTambahTeknisi>
      <h1>Tambah Teknisi</h1>
      {!show && <button onClick={handleShow} className={classes.buttonEdit}>Tambah Teknisi Baru</button>}

      <div>
        {show && (
          <div className={classes.inputTeknisi}>
            <h1>Form Teknisi AC</h1>
            <label>Masukkan Kategori</label>
            <input
              type="text"
              name="nama"
              value={newTeknisi.nama}
              onChange={handleInputChange}
              placeholder="Kategori Teknisi"
            />
            <label>Masukkan alamat_cabang Teknisi</label>
            <input
              type="text"
              name="alamat_cabang"
              value={newTeknisi.alamat_cabang}
              onChange={handleInputChange}
              placeholder="alamat_cabang Teknisi"
            />
            <label>Masukkan no_hp</label>
            <input
              type="number"
              name="no_hp"
              value={newTeknisi.no_hp}
              onChange={handleInputChange}
              placeholder="no_hp"
            />
            <label>Masukkan status</label>
            <input
              type="text"
              name="status"
              value={newTeknisi.status}
              onChange={handleInputChange}
              placeholder="status"
            />
            <div className={classes.buttonForm}>
              {editingId !== null ? (
                <button onClick={handleSaveEditTeknisi} className={classes.buttonEdit}>Simpan Perubahan</button>
              ) : (
                <button onClick={handleAddTeknisi} className={classes.buttonEdit}>Tambah Teknisi Baru</button>
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
            <th>Nama Teknisi</th>
            <th>Alamat_cabang Teknisi</th>
            <th>no_hp</th>
            <th>Gambar</th>
            <th>status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataTeknisi.map((Teknisi) => (
            <React.Fragment key={Teknisi.id}>
              <tr>
                <td>{Teknisi.id}</td>
                <td>{Teknisi.nama}</td>
                <td>{Teknisi.alamat_cabang}</td>
                <td>{Teknisi.no_hp}</td>
                <td>Gambar</td>
                <td>{Teknisi.status}</td>
                <td>
                  <button onClick={() => handleShowDetails(Teknisi.id)} className={classes.buttonShow}>Show</button>
                  <button onClick={() => handleEditTeknisi(Teknisi.id)} className={classes.buttonEdit}>Edit</button>
                  <button onClick={() => handleDeleteTeknisi(Teknisi.id)} className={classes.buttonDanger}>Hapus</button>
                </td>
              </tr>
              {showDetails === Teknisi.id && (
                <div className={classes.inputTeknisi}>
                  <h1>Detail Teknisi</h1>
                  <p><strong>ID:</strong> {Teknisi.id}</p>
                  <p><strong>Kategori:</strong> {Teknisi.nama}</p>
                  <p><strong>alamat_cabang:</strong> {Teknisi.alamat_cabang}</p>
                  <p><strong>no_hp:</strong> {Teknisi.no_hp}</p>
                  <p><strong>status:</strong> {Teknisi.status}</p>
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

export default TambahTeknisi;
