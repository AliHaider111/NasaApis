const express = require('express');
const controller = require('../../controllers/apod.controller');
const router = express.Router();

router.route('/').get(controller.List)

module.exports = router;
