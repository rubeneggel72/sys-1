
const excel = require('../controller/excel');
const express = require('express');

const router = express.Router();

router.get('/readItem', excel.readItem);

module.exports = router;