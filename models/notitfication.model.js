const mongoose = require("mongoose");

const Notification = mongoose.model(
    "Notification",
    new mongoose.Schema({
        notificationTitle: String,
        notificationText: String,
        activityClassName: String,
        apiLink: String
    })
);

module.exports = Notification;