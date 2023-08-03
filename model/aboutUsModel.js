const mongoose = require('mongoose');




const aboutusSchema = new mongoose.Schema({
    bannerUrl: {
        type: String,
        required: true,
    },



    heading: {
        type: String,
        required: true,
    },
    paragraph: {
        type: String,
        required: true

    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

},

    { timestamps: true }
);



aboutusSchema.pre('findOneAndUpdate', function (next) {
    this._update.updatedAt = new Date();
    next();
});




const AboutusModel = mongoose.model('aboutUs', aboutusSchema);

module.exports = AboutusModel;
