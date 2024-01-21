const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './medImage'); // Specify the correct path to the destination directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'picture-' + uniqueSuffix + '.png'); // Use a unique filename
  },
});

const uploadPh = multer({ storage });

module.exports = uploadPh;
