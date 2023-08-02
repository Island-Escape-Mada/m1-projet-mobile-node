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

module.exports = Information;