// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PackageManagement = () => {
//   const [packages, setPackages] = useState([]);
//   const [newPackage, setNewPackage] = useState({ name: '', description: '' });

//   const fetchPackages = async () => {
//     try {
//       const response = await axios.get('your-api-endpoint/packages');
//       setPackages(response.data);
//     } catch (error) {
//       console.error('Error fetching packages:', error);
//     }
//   };

//   const createPackage = async () => {
//     try {
//       await axios.post('your-api-endpoint/packages', newPackage);
//       setNewPackage({ name: '', description: '' });
//       fetchPackages();
//     } catch (error) {
//       console.error('Error creating package:', error);
//     }
//   };

//   const deletePackage = async (packageId) => {
//     try {
//       await axios.delete(`your-api-endpoint/packages/${packageId}`);
//       fetchPackages();
//     } catch (error) {
//       console.error('Error deleting package:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   return (
//     <div>
//       <h2>Package Management</h2>
//       <ul>
//         {packages.map((package) => (
//           <li key={package.id}>
//             {package.name} - {package.description}
//             <button onClick={() => deletePackage(package.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <div>
//         <h3>Create a New Package</h3>
//         <input
//           type="text"
//           placeholder="Name"
//           value={newPackage.name}
//           onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={newPackage.description}
//           onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
//         />
//         <button onClick={createPackage}>Create</button>
//       </div>
//     </div>
//   );
// };

// export default PackageManagement;
