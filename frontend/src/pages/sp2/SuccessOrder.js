import React from 'react';
import { Link } from 'react-router-dom';  // Don't forget to import Link

const SuccessOrder = () => {
  return (
    <div>
      <h2>ORDER PLACED SUCCESSSFULLY!</h2>
      {/* <p>Your order has been canceled. If you have any questions, please contact our customer support.</p> */}

      <Link to="/OrderDetails">
        <button>OrderDetails</button>
      </Link>
      <Link to="/CancelOrder">
        <button>CancelOrder</button>
        </Link>
    </div>
  );
}

export default SuccessOrder;
