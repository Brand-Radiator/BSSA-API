const mediaProfile = require("../models/socialLink.model");

const addMedia = async (req, res) => {
  try {
    const mediaLink = new mediaProfile(req.body);
    await mediaLink.save();
    res.status(201).send(mediaLink);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const updateLink = async (req, res) => {
  try {
    let { obj_id, link } = req.body;
    if (obj_id) {
      const updatedResult = await findOneAndUpdate(
        { _id: obj_id },
        { mediaLink: link }
      );
      res.send(200).json({
        status: true,
        data: updatedResult,
      });
    }
  } catch (error) {
    res.send(404).json({ status: false, error: error });
  }
};

const getMedia = async (req, res) => {
  try {
    const allMedia = await mediaProfile.find();
    res.status(200).json({
      status: true,
      data: allMedia,
    });
  } catch (error) {
    res.status(error.status).json({
      success: false,
      msg: error,
    });
  }
};

module.exports = { addMedia, getMedia, updateLink };
