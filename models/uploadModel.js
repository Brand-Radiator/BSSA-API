const mongoose = require("mongoose");

const uploadSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    caption: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const uploadModel = mongoose.model("upload", uploadSchema);

module.exports = uploadModel;
