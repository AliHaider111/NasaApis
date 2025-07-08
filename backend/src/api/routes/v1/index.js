const express = require('express');
const apod = require('./apod.route');

const router = express.Router();

router.use('/apod', apod);

module.exports = router;
