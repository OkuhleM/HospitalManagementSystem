const multer = require("multer");
const path = require("path");

// Storage config (local uploads for now)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save to uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter (optional, restrict to images/docs only)
const fileFilter = (req, file, cb) => {
  const allowed = ["image/png", "image/jpeg", "application/pdf"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;