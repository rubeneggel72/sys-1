const express = require('express');
const router = express.Router();
const indicatorController = require('../controller/indicator');
const checkAuthorization = require('../middleware/checkAuthorization');
/**
 *  cliente Routes 
*/
router.get('/index', indicatorController.homepage);

router.get('/add', indicatorController.addindicator);
router.post('/add', indicatorController.postindicator);

router.get('/edit/:id', indicatorController.edit);
router.put('/edit/:id', indicatorController.editPost);
router.delete('/edit/:id', indicatorController.deleteindicator);
router.post('/search', indicatorController.searchindicator);
router.get('/updateitems', indicatorController.updateitems);

module.exports = router;



