const mongoose = require("mongoose");

const ParentInformation = mongoose.model(
    "ParentInformation",
    new mongoose.Schema({
        infoType: String,
        mainImage: String,
        shortDescription: String
    })
);

module.exports = ParentInformation;