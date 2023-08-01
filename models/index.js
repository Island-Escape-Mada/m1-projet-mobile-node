const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.User = require("./user");
db.BasicInfo = require("./basic.info.model");
db.Information = require("./information.model")

module.exports = db;