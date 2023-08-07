const mongoose = require("mongoose");

const InformationMedia = mongoose.model(
    "InformationMedia",
    new mongoose.Schema({
        mediaType: String, // e.g: iamge, video
        mediaPath: String, // link to media
        mediaDescription: String,
        information:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "information"
        }
    })
);

module.exports = InformationMedia;