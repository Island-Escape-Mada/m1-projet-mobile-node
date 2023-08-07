const mongoose = require("mongoose");

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

module.exports = InformationDetail;