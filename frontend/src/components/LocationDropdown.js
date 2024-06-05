import React from 'react';
import Dropdown from './Dropdown';

function LocationDropdown({ onSelect }) {
  const options = [
    { label: 'Semarang', value: 'Semarang' },
    { label: 'Surakarta', value: 'Surakarta' },
    { label: 'Jakarta', value: 'Jakarta' },
  ];

  const handleSelect = (option) => {
    onSelect(option);
  };

  return (
    <div>
      <Dropdown options={options} onSelect={handleSelect} placeholder="Pilih Lokasi" />
    </div>
  );
}

export default LocationDropdown;
