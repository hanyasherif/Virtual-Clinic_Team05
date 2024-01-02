const bcrypt = require('bcrypt');

const hashPassword = async () => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('admin', salt);
    console.log('Hashed Password:', hashedPassword);
  } catch (error) {
    console.error(error);
  }
};

// Call the function
hashPassword();