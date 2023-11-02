// // DoctorProfile.js

// class DoctorProfile {
//     constructor(username, name, email, specialty, sessionPrice, profilePicture) {
//       this.username = username;
//       this.name = name;
//       this.email = email;
//       this.specialty = specialty;
//       this.sessionPrice = sessionPrice;
//       this.profilePicture = profilePicture;
//     }
  
//     render() {
//       const profileContainer = document.createElement('div');
//       profileContainer.classList.add('doctor-profile');
  
//       const profilePictureElement = document.createElement('img');
//       profilePictureElement.src = this.profilePicture;
//       profilePictureElement.alt = 'Profile Picture';
//       profileContainer.appendChild(profilePictureElement);
  
//       const nameElement = document.createElement('h2');
//       nameElement.textContent = this.name;
//       profileContainer.appendChild(nameElement);
  
//       const usernameElement = document.createElement('p');
//       usernameElement.textContent = `Username: ${this.username}`;
//       profileContainer.appendChild(usernameElement);
  
//       const emailElement = document.createElement('p');
//       emailElement.textContent = `Email: ${this.email}`;
//       profileContainer.appendChild(emailElement);
  
//       const specialtyElement = document.createElement('p');
//       specialtyElement.textContent = `Specialty: ${this.specialty}`;
//       profileContainer.appendChild(specialtyElement);
  
//       const sessionPriceElement = document.createElement('p');
//       sessionPriceElement.textContent = `Session Price: ${this.sessionPrice}`;
//       profileContainer.appendChild(sessionPriceElement);
  
//       return profileContainer;
//     }
//   }
  
//   // Usage example:
//   const doctor = new DoctorProfile(
//     'Dr. John Doe',
//     'johndoe',
//     'johndoe@example.com',
//     'Cardiology',
//     '$200',
//     'path/to/profile-picture.jpg'
//   );
  
//   const profileContainer = document.getElementById('doctor-profile-container');
//   profileContainer.appendChild(doctor.render());

  
