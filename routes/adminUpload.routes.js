const express = require("express");
const router = express.Router();
const {
  uploadData,
  fetchData,
} = require("../controllers/adminUpload.Controller");
const {
  addMedia,
  updateLink,
  getMedia,
} = require("../controllers/media.controller");
const { signup } = require("../controllers/user.Controller");
const { isAdmin } = require("../middlewares/auth");

router.post("/add/data", uploadData);
router.get("/all/data", fetchData);
router.post("/add/new/admin", signup);

//Media route
router.post("/add/media", addMedia);
router.patch("/update/media", updateLink);
router.get("/all/media", getMedia);

module.exports = router;
