const express = require("express");
const router = express.Router();
const { getData, postData } = require("../controllers/msg.Controller");

router.post("/leads", postData);
router.get("/all/leads", getData);

module.exports = router;
