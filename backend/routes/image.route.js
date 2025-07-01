const express = require('express');
const router = express.Router();
const fs =require("fs")
const multer = require('multer');
const path = require('path');
const { postImage, getImages, deleteImage } = require('../controllers/image.controller');
 const uploadDir = path.join(__dirname, "../images");

 
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

 
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post("/",upload.single('file'),postImage)
router.get("/", getImages)
router.delete("/:id", deleteImage)

 

module.exports = router;
