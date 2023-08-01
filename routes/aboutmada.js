const express = require('express');
const router = express.Router();
const controllerAboutMada = require('../controllers/aboutmada.controller');

router.get('/about-mada', [], controllerAboutMada.getAboutMadaInfo);

module.exports = router;