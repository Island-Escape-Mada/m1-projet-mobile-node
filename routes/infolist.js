const express = require('express');
const router = express.Router();
const controllerInfoList = require('../controllers/information.controller');

router.get('/list-info', [], controllerInfoList.getInfoList);

module.exports = router;