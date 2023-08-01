const mongoose = require("mongoose");

const basicInfoSchema = new mongoose.Schema({
    title: String,
    value: String,
    rank: Number
});

basicInfoSchema.index({ title: 1, value: 1 }, { unique: true});

const BasicInfo = mongoose.model(
    "BasicInfo",
    basicInfoSchema
);

module.exports = BasicInfo;