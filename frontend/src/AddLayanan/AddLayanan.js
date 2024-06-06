import React, { useState } from "react";
import { StyledTambahLayanan } from "./StyledAddLayanan";
import classes from "./AddLayanan.module.css";

const TambahLayanan = () => {
  const [dataLayanan, setDataLayanan] = useState([
    {
      id: 1,
      kategory: "Service AC",
      judul: "Service AC Murah Meriah",
      lokasi: "Semarang",
      harga: 500000,
    },
    {
      id: 2,
      kategory: "Ganti Freon AC",
      judul: "Ganti Freon AC Terpercaya",
      lokasi: "Surakarta",
      harga: 900000,
    },
    {
      id: 3,
      kategory: "Pembersihan AC",
      judul: "Pembersihan AC Kinclong",
      lokasi: "Jakarta",
      harga: 300000,
    },
  ]);

  const [newLayanan, setNewLayanan] = useState({
    id: "",
    kategory: "",
    judul: "",
    lokasi: "",
    harga: "",
  });

  const [show, setShow] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  const handleShow = () => {
    setShow(!show);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLayanan({ ...newLayanan, [name]: value });
  };

  const handleAddLayanan = () => {
    const newId = dataLayanan.length
      ? dataLayanan[dataLayanan.length - 1].id + 1
      : 1;
    const layananToAdd = {
      ...newLayanan,
      id: newId,
      harga: parseInt(newLayanan.harga),
    };
    setDataLayanan([...dataLayanan, layananToAdd]);
    setNewLayanan({ id: "", kategory: "", judul: "", lokasi: "", harga: "" });
  };

  const handleDeleteLayanan = (id) => {
    const updatedDataLayanan = dataLayanan.filter((layanan) => layanan.id !== id);
    setDataLayanan(updatedDataLayanan);
  };

  const handleEditLayanan = (id) => {
    const layananToEdit = dataLayanan.find((layanan) => layanan.id === id);
    setEditingId(id);
    setNewLayanan(layananToEdit);
    setShow(true);
  };

  const handleSaveEditLayanan = () => {
    const updatedDataLayanan = dataLayanan.map((layanan) =>
      layanan.id === newLayanan.id ? newLayanan : layanan
    );
    setDataLayanan(updatedDataLayanan);
    setNewLayanan({ id: "", kategory: "", judul: "", lokasi: "", harga: "" });
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
    <StyledTambahLayanan>
      <h1>Tambah Layanan</h1>
      {!show && <button onClick={handleShow} className={classes.buttonEdit}>Tambah Layanan Baru</button>}

      <div>
        {show && (
          <div className={classes.inputLayanan}>
            <h1>Form Layanan AC</h1>
            <label>Masukkan Kategori</label>
            <input
              type="text"
              name="kategory"
              value={newLayanan.kategory}
              onChange={handleInputChange}
              placeholder="Kategori Layanan"
            />
            <label>Masukkan Judul Layanan</label>
            <input
              type="text"
              name="judul"
              value={newLayanan.judul}
              onChange={handleInputChange}
              placeholder="Judul Layanan"
            />
            <label>Masukkan Lokasi</label>
            <input
              type="text"
              name="lokasi"
              value={newLayanan.lokasi}
              onChange={handleInputChange}
              placeholder="Lokasi"
            />
            <label>Masukkan Harga</label>
            <input
              type="number"
              name="harga"
              value={newLayanan.harga}
              onChange={handleInputChange}
              placeholder="Harga"
            />
            <div className={classes.buttonForm}>
              {editingId !== null ? (
                <button onClick={handleSaveEditLayanan} className={classes.buttonEdit}>Simpan Perubahan</button>
              ) : (
                <button onClick={handleAddLayanan} className={classes.buttonEdit}>Tambah Layanan Baru</button>
              )}
              <button onClick={handleShow} className={classes.buttonEdit}>Tutup</button>
            </div>
          </div>
        )}
      </div>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kategori Layanan</th>
            <th>Gambar Layanan</th>
            <th>Judul Layanan</th>
            <th>Lokasi</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataLayanan.map((layanan) => (
            <React.Fragment key={layanan.id}>
              <tr>
                <td>{layanan.id}</td>
                <td>{layanan.kategory}</td>
                <td>Gambar</td>
                <td>{layanan.judul}</td>
                <td>{layanan.lokasi}</td>
                <td>Rp.{layanan.harga}</td>
                <td>
                  <button onClick={() => handleShowDetails(layanan.id)} className={classes.buttonShow}>Show</button>
                  <button onClick={() => handleEditLayanan(layanan.id)} className={classes.buttonEdit}>Edit</button>
                  <button onClick={() => handleDeleteLayanan(layanan.id)} className={classes.buttonDanger}>Hapus</button>
                </td>
              </tr>
              {showDetails === layanan.id && (
                <div className={classes.inputLayanan}>
                  <h1>Detail Layanan</h1>
                  <p><strong>ID:</strong> {layanan.id}</p>
                  <p><strong>Kategori:</strong> {layanan.kategory}</p>
                  <p><strong>Judul:</strong> {layanan.judul}</p>
                  <p><strong>Lokasi:</strong> {layanan.lokasi}</p>
                  <p><strong>Harga:</strong> Rp.{layanan.harga}</p>
                  <button onClick={handleCloseDetails} className={classes.buttonEdit}>Tutup</button>
                </div>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </StyledTambahLayanan>
  );
};

export default TambahLayanan;
