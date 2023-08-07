const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.User = require("./user");
db.BasicInfo = require("./basic.info.model");
db.Information = require("./information.model");
db.InformationDetail = require('./informationdetail.model');
db.InformationMedia = require('./informationmedia.model');
db.ParentInformation = require('./parentinformation.model');
db.Notification = require('./notitfication.model');

module.exports = db;