const express = require('express');
const userController = require('../controller/userController')
const router = express.Router();
const authorization = require("../auth/authorization")

const multer = require('multer')
const path = require('path');
const { addAboutUs, fetchAboutUs, updateAboutUs } = require('../controller/aboutus.controller');
// const upload = multer({dest:"upload/"}) // making a destination folder to save the images (upload is folder name)


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {  // file name
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


router.post('/signup/upload', upload.single('image'), userController.userSignUp) // coming with image name from frontend
router.get('/user', userController.getUser)
router.post('/login', userController.userLogin)
router.post('/add/aboutus', upload.single('image'), addAboutUs);
router.get('/get/aboutus', fetchAboutUs);
router.patch('/update/aboutus/:id', updateAboutUs)

// routes for adding aboutus page



module.exports = router;
