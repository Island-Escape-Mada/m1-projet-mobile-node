const db = require('../models');

const Notification = db.Notification;

const getNotification = async (req, res) => {
    try{
        const notification = await Notification.find({});

        var returnValue = null;
        var status = 200;
        if (notification.length > 0){
            returnValue = notification[0];
        }else{
            returnValue = "No notification found."
            status = 404;
        }
        res.status(status).send(returnValue);
    }catch(error){
        console.log(error);
    }
}

module.exports = { getNotification };