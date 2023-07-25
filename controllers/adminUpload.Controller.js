const uploadModel = require("../models/uploadModel.js");

//post
const uploadData = async (req, res) => {
  // upload(req, res, (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   const newImage = new Upload({
  //     caption: req.body.caption,
  //     image: {
  //       data: req.file.filename,
  //       contentType: "image/png/jpeg",
  //     },
  //   });
  //   newImage
  //     .save()
  //     .then(() => res.send("successfully Uploaded"))
  //     .catch((err) => console.log(err));
  // });

  try {
    const newData = new uploadModel(req.body);
    if (newData) {
      await newData.save();
      res.status(201).json({
        status: true,
        data: newData,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error,
    });
  }
};

const fetchData = async (req, res) => {
  try {
    const newData = await Upload.find();
    res.status(200).send(newData);
  } catch (error) {
    res.status(400).send(error);
  }
};

// add new admin

module.exports = {
  uploadData,
  fetchData,
};
