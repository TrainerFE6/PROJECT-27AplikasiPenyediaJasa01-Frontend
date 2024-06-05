import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import CatalogProduct from "./pages/CatalogProduct";
import './App.css';

function App() {


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/catalog" element={<CatalogProduct/>}/>
        </Routes>
      </div>

    </Router>
  );
}

export default App;
