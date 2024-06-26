import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import user from "../assets/ServiceImage.jpg";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function UserProfile() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [userData, setUserData] = useState('');
  const id_user = localStorage.getItem("id_user");

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to login page after logout
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://api-msib-6-penyedia-jasa-02.educalab.id/users');
        const data = response.data.data;

        // Filter data based on id_user
        const user = data.find(user => user.id_user === Number(id_user));
        setUserData(user);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, [id_user]);

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 position-relative">
            
            {/* Profile Box */}
            <div className="card bg-primary text-white rounded text-center p-5 pt-2 position-absolute top-40 start-50 translate-middle" style={{ marginTop: '20px', width: '800px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)' }}>
              <div className="card-title-container" style={{ height: '300px' }}>
                <h1 className="card-title" style={{ marginTop: '70px' }}>Profile</h1>
              </div>
            </div>

            {/* Admin Info Box */}
            <div className="card bg-white text-center p-4 mb-3" style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)' }}>

              <div className="avatar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', overflow: 'hidden', width: '200px', height: '200px', margin: 'auto' }}>
                <img src={user} alt="User Avatar" className="rounded-circle" style={{ width: '80%', height: '80%', objectFit: 'cover', margin: 0 }} />
              </div>
            
              <h3 style={{ display: 'inline-block', backgroundColor: 'rgba(200, 200, 200, 0.5)', borderRadius: '10px', padding: '10px' }}>
                Halo, Selamat Siang
              </h3>
              
              <p>{userData.username}</p>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary me-1 d-inline-block">Ubah Password</button>
                <button onClick={handleLogout} className="btn btn-primary d-inline-block">Logout</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
