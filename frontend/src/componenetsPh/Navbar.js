import React from 'react';
// import Search from '../componenets/Search'
import FilterMedicine from './FilterMedicine'
import Logo from '../assets/Logo.png';
import cart from '../assets/cart.jpg';
import Search from './Search';

import { Link } from 'react-router-dom';

const Navbar = () => {

  const handleLogout = async () => {
    try {
      // Make a request to the server to log the user out
      const response = await fetch('http://localhost:4000/logout', {
        method: 'POST', // Ensure this matches your server-side route method
      });
  
      if (!response.ok) {
        console.error('Error:', response.status, response.statusText);
        // Handle error as needed
      } else {
        console.log('Logout successful');
        // Redirect or perform additional actions after successful logout
        window.location.href = 'http://localhost:3000/';
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

    return(
        <header>
              <img id="imageDisplay" src={Logo} alt="Logo Image" />
            <div className="container">
                <Link to="/">
                    <h1> Pharmacy tofa7</h1>
                </Link>    
                <div><FilterMedicine/></div>
                <div><Search/></div>

<div>           
<button onClick={handleLogout}>Logout</button>

{/* New Cart Link */}
<Link to="/CartPage">
  <img id="cartImage" src={cart} alt="Cart Image" style={{ width: '30px', height: '30px', cursor: 'pointer' }} />
</Link>
</div>
                {/* <div> <Search/>  </div> */}
            
            </div>
        </header>
    )
}

export default Navbar;



