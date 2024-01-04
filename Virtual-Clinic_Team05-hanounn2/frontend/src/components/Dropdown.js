import React, { useState } from 'react';
import '../App.css';
const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
   
    const toggle = () => {
       setIsOpen(!isOpen);
    };
   
    return (
       <div className="dropdown">
         <button onClick={toggle} className="dropbtn">
           ---
         </button>
         {isOpen && (
           <div className="dropdown-content">
             <a href="viewPackages">View Packages</a>
             <a href="ViewMyPackage">My Package</a>
             <a href="#"></a>
           </div>
         )}
       </div>
    );
   };
   
   
   export default Dropdown;