const Msg = require("../models/messageModel");

const postData = async (req, res) => {
  try {
    const get = new Msg(req.body);
    await get.save();
    res.status(201).send(get);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const getData = async (req, res) => {
  const msg = await Msg.find();
  res.send(msg);
};

module.exports = { getData, postData };
