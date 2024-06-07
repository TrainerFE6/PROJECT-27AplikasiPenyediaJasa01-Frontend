import React from 'react';
import { useLocation } from 'react-router-dom';

const LayananDetail = () => {
  const location = useLocation();
  const { imageLayanan, title, location: layananLocation, price } = location.state || {};

  return (
    <div>
      <h1>{title}</h1>
      <img src={imageLayanan} alt={title} style={{ width: '50%', borderRadius: '8px' }} />
      <p>Location: {layananLocation}</p>
      <p>Price: Rp. {price.toLocaleString('de-DE')}</p>
    </div>
  );
};

export default LayananDetail;
