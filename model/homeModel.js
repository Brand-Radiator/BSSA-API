const mongoose = require('mongoose');




const homeSchema = new mongoose.Schema({
    slogan: {
        type: String,
    },
    logo:{
        type: String,

    },

    state: {
        type: String,
    },

    bg_img: {
        type: String,

    },
    
    designation: {
        type: String,

    },

      profileName: {
        type: String,

    },

       bg_img: {
        type: String,

    },

       otherLogo: {
        type: String,

    },

       profilePhoto: {
        type: String,

    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

},

    { timestamps: true }
);



homeSchema.pre('findOneAndUpdate', function (next) {
    this._update.updatedAt = new Date();
    next();
});




const HomeModel = mongoose.model('home', homeSchema);

module.exports = HomeModel;
