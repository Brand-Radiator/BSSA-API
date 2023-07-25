const multer = require("multer");

//storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("image");

module.exports = upload;
