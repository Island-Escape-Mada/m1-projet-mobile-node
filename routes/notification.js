const express = require('express');
const router = express.Router();
const controllerNotification = require('../controllers/notification.controller');
const { checkToken } = require('../middlewares');

router.get('/notification', [checkToken.authenticateToken], controllerNotification.getNotification);

module.exports = router;