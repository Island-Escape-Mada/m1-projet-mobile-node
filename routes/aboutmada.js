const express = require('express');
const router = express.Router();
const controllerAboutMada = require('../controllers/aboutmada.controller');
const { checkToken } = require('../middlewares');

router.get('/about-mada', [checkToken.authenticateToken], controllerAboutMada.getAboutMadaInfo);

module.exports = router;