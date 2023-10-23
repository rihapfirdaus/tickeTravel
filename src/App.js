import React, { useState } from 'react';
import './App.css';

const optionTicket = [
  { city1: "Jakarta", city2: "Bogor", price: 30000 },
  { city1: "Jakarta", city2: "Depok", price: 20000 },
  { city1: "Jakarta", city2: "Tangerang", price: 25000},
  { city1: "Jakarta", city2: "Bekasi", price: 35000 },

  { city1: "Bogor", city2: "Jakarta", price: 30000 },
  { city1: "Bogor", city2: "Depok", price: 25000 },
  { city1: "Bogor", city2: "Tangerang", price: 40000 },
  { city1: "Bogor", city2: "Bekasi", price: 30000 },
  
  { city1: "Depok", city2: "Jakarta", price: 30000 },
  { city1: "Depok", city2: "Bogor", price: 25000 },
  { city1: "Depok", city2: "Tangerang", price: 30000 },
  { city1: "Depok", city2: "Bekasi", price: 40000 },
  
  { city1: "Tangerang", city2: "Jakarta", price: 30000 },
  { city1: "Tangerang", city2: "Bogor", price: 20000 },
  { city1: "Tangerang", city2: "Depok", price: 25000 },
  { city1: "Tangerang", city2: "Bekasi", price: 30000 },
  
  { city1: "Bekasi", city2: "Jakarta", price: 35000 },
  { city1: "Bekasi", city2: "Bogor", price: 30000 },
  { city1: "Bekasi", city2: "Depok", price: 40000 },
  { city1: "Bekasi", city2: "Tanggerang", price: 30000 },
];

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(1); // Menambah state untuk jumlah tiket
  const [isMember, setIsMember] = useState(false);
  const [isNonMember, setIsNonMember] = useState(true);

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    const matchingOption = optionTicket.find(option => `${option.city1} - ${option.city2}` === selectedCity);

    if (matchingOption) {
      setPrice(matchingOption.price);
    } else {
      setPrice(0);
    }

    setSelectedCity(selectedCity);
  };

  const handleNumberChange = (event) => {
    const selectedNumber = parseInt(event.target.value, 10); // Mengubah nilai menjadi angka bulat
    setSelectedNumber(selectedNumber);
  };

  const handleMemberClick = () => {
    setIsMember(true);
    setIsNonMember(false);
  };

  const handleNonMemberClick = () => {
    setIsNonMember(true);
    setIsMember(false);
  };

  const calculateDiscount = () => {
    if (isMember) {
      return (price * selectedNumber * 0.05);
    } else {
      return 0;
    }
  };
  
  const handleSubmit = (event) => {
    const requiredInputs = document.querySelectorAll('[required]');
    const isFormValid = Array.from(requiredInputs).every(input => input.value !== null && input.value !== '');

    if (isFormValid) {
      alert("Pesanan anda akan diproses..");
    } else {
      alert("Isi semua input terlebih dahulu!");
    }
  }

  const calculateTotal = () => {
    const discount = calculateDiscount(); // Menghitung diskon
    return price * selectedNumber - discount;
  };  

  return (
    <div>
      <header>
        <h1>Aplikasi Pemesanan Tiket</h1>
      </header>
      <form className="formTicket">
        <div className="inlineBox">
          <div>
            <input type="checkbox" id="member" checked={isMember} onClick={handleMemberClick} />
            <label htmlFor="member">Member</label>
          </div>
          <div>
            <input type="checkbox" id="nonMember" checked={isNonMember} onClick={handleNonMemberClick} />
            <label htmlFor="nonMember">Non-Member</label>
          </div>
        </div>
        <div className="multilineBox">
          <label>Nama</label>
          <input type="text" required />
        </div>
        <div className="multilineBox">
          <label>Pilih tiket</label>
          <select value={selectedCity} onChange={handleCityChange} required>
            <option value="" disabled>Select city</option>
            {optionTicket.map((option, index) => (
              <option value={`${option.city1} - ${option.city2}`} key={index}>{`${option.city1} - ${option.city2}`}</option>
            ))}
          </select>
        </div>
        <div className="multilineBox">
          <label>Harga</label>
          <input type="text" value={price} disabled />
        </div>
        <div className="multilineBox">
          <label>Jumlah tiket</label>
          <select value={selectedNumber} onChange={handleNumberChange} required>
              {Array.from({ length: 10 }, (_, index) => (
              <option value={index + 1} key={index}>{index + 1}</option>
            ))}
          </select>
        </div>
        <div className="multilineBox">
          <label>Diskon</label>
          <input type="text" value={isMember ? '5%' : '0%'} disabled />
        </div>
        <div className="multilineBox">
          <label>Total</label>
          <input type="text" value={calculateTotal()} disabled />
        </div>
        <div className='submitBox'>
          <input type="submit" value="pesan tiket" onClick={handleSubmit}/>
        </div>

      </form>
    </div>
  );
}

export default App;