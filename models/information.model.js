const mongoose = require("mongoose");

const Information = mongoose.model(
    "Information",
    new mongoose.Schema({
        infoType: String,
        title: String,
        shortDescription: String
    })
);

module.exports = Information;