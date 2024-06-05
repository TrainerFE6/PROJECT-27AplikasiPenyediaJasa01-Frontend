import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import LocationDropdown from '../components/LocationDropdown';
import CategoryDropdown from '../components/CategoryDropdown';
import classes from './CatalogProduct.module.css';
import LayananCard from '../components/LayananCard';
import ExampleLayanan from '../assets/ExampleLayanan.svg';

const dataLayanan = [
  {
    category: "Service AC",
    imageLayanan: ExampleLayanan,
    title: "Layanan Service AC",
    location: "Semarang",
    price: 600000,
  },
  {
    category: "Pembersihan AC",
    imageLayanan: ExampleLayanan,
    title: "Layanan Pembersihan AC",
    location: "Jakarta",
    price: 500000,
  },
  {
    category: "Ganti Freon AC",
    imageLayanan: ExampleLayanan,
    title: "Layanan Ganti Freon AC",
    location: "Surakarta",
    price: 650000,
  },
  {
    category: "Service AC",
    imageLayanan: ExampleLayanan,
    title: "Layanan Service AC",
    location: "Jakarta",
    price: 600000,
  },
  {
    category: "Pembersihan AC",
    imageLayanan: ExampleLayanan,
    title: "Layanan Pembersihan AC",
    location: "Surakarta",
    price: 500000,
  },
  {
    category: "Ganti Freon AC",
    imageLayanan: ExampleLayanan,
    title: "Layanan Ganti Freon AC",
    location: "Jakarta",
    price: 650000,
  },
  {
    category: "Service AC",
    imageLayanan: ExampleLayanan,
    title: "Layanan Service AC",
    location: "Surakarta",
    price: 600000,
  },
  {
    category: "Pembersihan AC",
    imageLayanan: ExampleLayanan,
    title: "Layanan Pembersihan AC",
    location: "Semarang",
    price: 500000,
  },
  {
    category: "Ganti Freon AC",
    imageLayanan: ExampleLayanan,
    title: "Layanan Ganti Freon AC",
    location: "Semarang",
    price: 650000,
  },
 
];

function CatalogProduct() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const filteredLayanan = dataLayanan.filter((layanan) => {
    return (
      (selectedCategory ? layanan.category === selectedCategory : true) &&
      (selectedLocation ? layanan.location === selectedLocation : true)
    );
  });

  return (
    <>
      <div className={classes.navMargin}>
        <Navbar />
      </div>

      <div className={classes.catalogProduct}>
        <div className={classes.searchCatalog}>
          <h1>Cari Layanan AC Terpercaya dan Murah Disini</h1>
          <p>JasaKu menyediakan berbagai layanan AC yang dapat memberikan kenyamanan kesejukan Anda</p>
          <div className={classes.containerDropdown}>
            <LocationDropdown onSelect={handleLocationSelect} />
            <CategoryDropdown onSelect={handleCategorySelect} />
          </div>
        </div>
      </div>
      <div className={classes.searchResult}>
        <div className={classes.containerFilter}>
          <h4>Menampilkan Layanan {selectedCategory || 'Semua Kategori'} di {selectedLocation || 'Semua Lokasi'}</h4>
        </div>
        <div className={classes.containerResult}>
          {filteredLayanan.map((layanan, index) => (
            <LayananCard
              key={index}
              imageLayanan={layanan.imageLayanan}
              title={layanan.title}
              location={layanan.location}
              price={layanan.price.toLocaleString('de-DE')}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default CatalogProduct;
