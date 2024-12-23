const express = require('express');
const router = express.Router();
const idsController = require('../controller/ids');

router.get('/read', idsController.read);
router.get('/update', idsController.update);
module.exports = router;
