const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken')
// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, 'supersecret');
    const username= decodedToken.user.username 
    //const dest = `Uploads/medical-history/${username}`;
    const dest = `Uploads/medical-history/${username}`;
    
    // Check if the folder exists, create it if not
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    cb(null, dest);
  },
  filename: function (req, file, cb) {
    // Set the filename to be unique or as needed
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    
    //const dest = `Uploads/medical-history/${username}`;
    const dest = `Uploads/reqUpload`;
    
    // Check if the folder exists, create it if not
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    cb(null, dest);
  },
  filename: function (req, file, cb) {
    // Set the filename to be unique or as needed
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|pdf/; // Add or modify file types as needed
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Invalid file type');
  }
}

// Set up Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Set a file size limit if needed
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const upload2 = multer({
  storage: storage2,
  limits: { fileSize: 1000000 }, // Set a file size limit if needed
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload, upload2;