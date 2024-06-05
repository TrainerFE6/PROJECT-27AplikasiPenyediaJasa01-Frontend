import React from 'react';
import Dropdown from './Dropdown';

function CategoryDropdown({onSelect}) {
  const options = [
    { label: 'Pembersihan AC', value: 'Pembersihan AC' },
    { label: 'Service AC', value: 'Service AC' },
    { label: 'Ganti Freon AC', value: 'Ganti Freon AC' },
  ];

  // const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (option) => {
    // setSelectedOption(option);
    onSelect(option);
    // Lakukan apapun yang Anda inginkan dengan opsi yang dipilih di sini
  };

  return (
    <div>
      <Dropdown options={options} onSelect={handleSelect} placeholder="Semua Kategori" />
    </div>
  );
}

export default CategoryDropdown;
