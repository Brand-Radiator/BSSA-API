const mongoose = require("mongoose");

const socialMediaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    mediaLink: {
      type: String,
      require: true,
    },
    mediaImg: {
      type: String,
    },
  },
  { timestamps: true }
);

const SocialLinkModel = mongoose.model("mediaLink", socialMediaSchema);

module.exports = SocialLinkModel;
