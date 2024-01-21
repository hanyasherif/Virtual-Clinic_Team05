import React from 'react';
import Logo from '../assets/Logo.png';
import cart from '../assets/cart.jpg';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const handleLogout = async (e) => {
    try {
      await fetch('http://localhost:4000/logout');
      window.location.href = 'http://localhost:3000/';
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <header>
      <img id="logoImage" src={Logo} alt="Logo Image" />
      <div className="container">
        <Link to="/">
          <h1>Pharmacy mango</h1>
        </Link>
        <div>
          
        <h1>El7a2ny</h1>

<button onClick={handleLogout}>Logout</button>

          {/* New Cart Link */}
          <Link to="/CartPage">
            <img id="cartImage" src={cart} alt="Cart Image" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
