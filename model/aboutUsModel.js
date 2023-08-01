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

    }

});



const AboutusModel = mongoose.model('aboutUs', aboutusSchema);

module.exports = AboutusModel;
