
const estadistica = require('../controller/estadistica');
const express = require('express');

const router = express.Router();

router.get('/update', estadistica.readItem);

module.exports = router;