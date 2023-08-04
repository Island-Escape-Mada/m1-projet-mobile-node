const mongoose = require("mongoose");

const Information = mongoose.model(
    "Information",
    new mongoose.Schema({
        infoType: String,
        mainImage: String,
        title: String,
        location: String,
        shortDescription: String
    })
);

const InformationDetail = mongoose.model(
    "InformationDetail",
    new mongoose.Schema({
        infoType: String, // e.g: name, location, height, description, ....
        infoValue: String, // e.g: Grand pavoi, Mahajanga, 0, Beach, ....
        information:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "information"
        }
    })
);

const InformationMedia = mongoose.model(
    "InformationMedia",
    new mongoose.Schema({
        mediaType: String, // e.g: iamge, video
        mediaPath: String, // link to media
        information:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "information"
        }
    })
);

module.exports = { Information, InformationDetail, InformationMedia };