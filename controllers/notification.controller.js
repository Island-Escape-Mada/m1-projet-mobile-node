const db = require('../models');

const Notification = db.Notification;

const getNotification = async (req, res) => {
    try{
        const notification = await Notification.find({});

        if (notification.length > 0){
            res.status(200).send(notification[0]);
        }else{
            res.status(404).send("No notification found.");
        }
    }catch(error){
        res.status(500).send("Error getting notification.");
    }
}

module.exports = { getNotification };