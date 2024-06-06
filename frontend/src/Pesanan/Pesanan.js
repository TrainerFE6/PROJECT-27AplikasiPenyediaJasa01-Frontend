import React, { useState } from "react";
import { StyledPesanan } from "./StyledPesanan";
import classes from "./Pesanan.module.css";

const Pesanan = () => {
  const [dataPesanan, setDataPesanan] = useState([
    {
      id_pesanan: 1,
      id_admin: 1,
      id_user: 1,
      id_teknisi: 1,
      nama_teknisi: "Teknisi 1",
      tanggal_bayar: "2024-01-01",
      tanggal_pelayanan: "2024-01-02",
      total_harga: 100000,
      opsi_pesanan: "Service",
      status: "Selesai",
    },
    {
      id_pesanan: 2,
      id_admin: 2,
      id_user: 2,
      id_teknisi: 2,
      nama_teknisi: "Teknisi 2",
      tanggal_bayar: "2024-01-03",
      tanggal_pelayanan: "2024-01-04",
      total_harga: 200000,
      opsi_pesanan: "Repair",
      status: "Proses",
    },
  ]);

  const [newPesanan, setNewPesanan] = useState({
    id_pesanan: "",
    id_admin: "",
    id_user: "",
    id_teknisi: "",
    nama_teknisi: "",
    tanggal_bayar: "",
    tanggal_pelayanan: "",
    total_harga: "",
    opsi_pesanan: "",
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
    setNewPesanan({ ...newPesanan, [name]: value });
  };

  const handleAddPesanan = () => {
    const newId = dataPesanan.length ? dataPesanan[dataPesanan.length - 1].id_pesanan + 1 : 1;
    const pesananToAdd = { ...newPesanan, id_pesanan: newId };
    setDataPesanan([...dataPesanan, pesananToAdd]);
    setNewPesanan({ id_pesanan: "", id_admin: "", id_user: "", id_teknisi: "", nama_teknisi: "", tanggal_bayar: "", tanggal_pelayanan: "", total_harga: "", opsi_pesanan: "", status: "" });
    setShow(false);
  };

  const handleDeletePesanan = (id_pesanan) => {
    const updatedDataPesanan = dataPesanan.filter((pesanan) => pesanan.id_pesanan !== id_pesanan);
    setDataPesanan(updatedDataPesanan);
  };

  const handleEditPesanan = (id_pesanan) => {
    const pesananToEdit = dataPesanan.find((pesanan) => pesanan.id_pesanan === id_pesanan);
    setEditingId(id_pesanan);
    setNewPesanan(pesananToEdit);
    setShow(true);
  };

  const handleSaveEditPesanan = () => {
    const updatedDataPesanan = dataPesanan.map((pesanan) =>
      pesanan.id_pesanan === newPesanan.id_pesanan ? newPesanan : pesanan
    );
    setDataPesanan(updatedDataPesanan);
    setNewPesanan({ id_pesanan: "", id_admin: "", id_user: "", id_teknisi: "", nama_teknisi: "", tanggal_bayar: "", tanggal_pelayanan: "", total_harga: "", opsi_pesanan: "", status: "" });
    setEditingId(null);
    setShow(false);
  };

  const handleShowDetails = (id_pesanan) => {
    setShowDetails(id_pesanan);
  };

  const handleCloseDetails = () => {
    setShowDetails(null);
  };

  return (
    <StyledPesanan>
      <h1>Daftar Pesanan</h1>
      {!show && <button onClick={handleShow} className={classes.buttonEdit}>Tambah Pesanan Baru</button>}

      <div>
        {show && (
          <div className={classes.inputPesanan}>
            <h1>Form Pesanan</h1>
            <label>Masukkan ID Admin</label>
            <input
              type="text"
              name="id_admin"
              value={newPesanan.id_admin}
              onChange={handleInputChange}
              placeholder="ID Admin"
            />
            <label>Masukkan ID User</label>
            <input
              type="text"
              name="id_user"
              value={newPesanan.id_user}
              onChange={handleInputChange}
              placeholder="ID User"
            />
            <label>Masukkan ID Teknisi</label>
            <input
              type="text"
              name="id_teknisi"
              value={newPesanan.id_teknisi}
              onChange={handleInputChange}
              placeholder="ID Teknisi"
            />
            <label>Masukkan Nama Teknisi</label>
            <input
              type="text"
              name="nama_teknisi"
              value={newPesanan.nama_teknisi}
              onChange={handleInputChange}
              placeholder="Nama Teknisi"
            />
            <label>Masukkan Tanggal Bayar</label>
            <input
              type="date"
              name="tanggal_bayar"
              value={newPesanan.tanggal_bayar}
              onChange={handleInputChange}
            />
            <label>Masukkan Tanggal Pelayanan</label>
            <input
              type="date"
              name="tanggal_pelayanan"
              value={newPesanan.tanggal_pelayanan}
              onChange={handleInputChange}
            />
            <label>Masukkan Total Harga</label>
            <input
              type="number"
              name="total_harga"
              value={newPesanan.total_harga}
              onChange={handleInputChange}
              placeholder="Total Harga"
            />
            <label>Masukkan Opsi Pesanan</label>
            <input
              type="text"
              name="opsi_pesanan"
              value={newPesanan.opsi_pesanan}
              onChange={handleInputChange}
              placeholder="Opsi Pesanan"
            />
            <label>Masukkan Status</label>
            <input
              type="text"
              name="status"
              value={newPesanan.status}
              onChange={handleInputChange}
              placeholder="Status"
            />
            <div className={classes.buttonForm}>
              {editingId !== null ? (
                <button onClick={handleSaveEditPesanan} className={classes.buttonEdit}>Simpan Perubahan</button>
              ) : (
                <button onClick={handleAddPesanan} className={classes.buttonEdit}>Tambah Pesanan Baru</button>
              )}
              <button onClick={handleShow} className={classes.buttonEdit}>Tutup</button>
            </div>
          </div>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>ID Pesanan</th>
            <th>ID Admin</th>
            <th>ID User</th>
            <th>ID Teknisi</th>
            <th>Nama Teknisi</th>
            <th>Tanggal Bayar</th>
            <th>Tanggal Pelayanan</th>
            <th>Total Harga</th>
            <th>Opsi Pesanan</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataPesanan.map((pesanan) => (
            <React.Fragment key={pesanan.id_pesanan}>
              <tr>
                <td>{pesanan.id_pesanan}</td>
                <td>{pesanan.id_admin}</td>
                <td>{pesanan.id_user}</td>
                <td>{pesanan.id_teknisi}</td>
                <td>{pesanan.nama_teknisi}</td>
                <td>{pesanan.tanggal_bayar}</td>
                <td>{pesanan.tanggal_pelayanan}</td>
                <td>{pesanan.total_harga}</td>
                <td>{pesanan.opsi_pesanan}</td>
                <td>{pesanan.status}</td>
                <td>
                  <button onClick={() => handleShowDetails(pesanan.id_pesanan)} className={classes.buttonShow}>Show</button>
                  <button onClick={() => handleEditPesanan(pesanan.id_pesanan)} className={classes.buttonEdit}>Edit</button>
                  <button onClick={() => handleDeletePesanan(pesanan.id_pesanan)} className={classes.buttonDanger}>Hapus</button>
                </td>
              </tr>
              {showDetails === pesanan.id_pesanan && (
                <div className={classes.inputPesanan}>
                  <h1>Detail Pesanan</h1>
                  <p><strong>ID Pesanan:</strong> {pesanan.id_pesanan}</p>
                  <p><strong>ID Admin:</strong> {pesanan.id_admin}</p>
                  <p><strong>ID User:</strong> {pesanan.id_user}</p>
                  <p><strong>ID Teknisi:</strong> {pesanan.id_teknisi}</p>
                  <p><strong>Nama Teknisi:</strong> {pesanan.nama_teknisi}</p>
                  <p><strong>Tanggal Bayar:</strong> {pesanan.tanggal_bayar}</p>
                  <p><strong>Tanggal Pelayanan:</strong> {pesanan.tanggal_pelayanan}</p>
                  <p><strong>Total Harga:</strong> {pesanan.total_harga}</p>
                  <p><strong>Opsi Pesanan:</strong> {pesanan.opsi_pesanan}</p>
                  <p><strong>Status:</strong> {pesanan.status}</p>
                  <button onClick={handleCloseDetails} className={classes.buttonEdit}>Tutup</button>
                </div>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </StyledPesanan>
  );
};

export default Pesanan;
