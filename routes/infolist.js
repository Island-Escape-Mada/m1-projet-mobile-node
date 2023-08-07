const express = require('express');
const router = express.Router();
const controllerInfoList = require('../controllers/information.controller');
const { checkToken } = require('../middlewares');

router.get('/list-info', [checkToken.authenticateToken], controllerInfoList.getInfoList);
router.get('/info-detail', [checkToken.authenticateToken], controllerInfoList.getDetail);

module.exports = router;