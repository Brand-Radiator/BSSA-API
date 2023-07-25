const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      required: [true, "Please add a Name"],
      maxlength: 32,
    },

    phonenumber: {
      type: Number,
      require: true,

      trim: true,
      minlength: [10, "Phone Number must have ten(10) characters"],
    },
    email: {
      type: String,
      trim: true,

      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid E-mail",
      ],
    },
    massage: {
      type: String,
      require: true,
      trim: true,

      maxlength: 100,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;
