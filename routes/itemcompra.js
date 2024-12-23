const express = require('express');
const router = express.Router();
const itemcompraController = require('../controller/itemcompra');
const checkAuthorization = require('../middleware/checkAuthorization');

/**
 *  cliente Routes 
*/

router.get('/index', itemcompraController.homepage);
router.get('/add', itemcompraController.add);
router.post('/add', itemcompraController.postAdd);
router.get('/view/:id', itemcompraController.view);
router.get('/edit/:id', itemcompraController.edit);
router.get('/delete/:id', itemcompraController.delete);
router.get('/clone/:id', itemcompraController.clone);
router.put('/edit/:id', itemcompraController.editPost);
router.delete('/edit/:id', itemcompraController.delete);
router.post('/search', itemcompraController.search);
router.get('/select', itemcompraController.select);
router.post('/searchitemagregado', itemcompraController.searchitemagregado);
router.get('/upregister/:id', itemcompraController.upregister);
router.get('/deleteitemagregado/:id', itemcompraController.deleteitemagregado);
router.get('/editcantitemagregado/:id', itemcompraController.editcantitemagregado);

router.post('/searchindicator', itemcompraController.searchindicator);
router.get('/upregisterindicator/:id', itemcompraController.upregisterindicator);
router.get('/deleteindicator/:id', itemcompraController.deleteindicator);
router.get('/editcantindicator/:id', itemcompraController.editcantindicator);
router.get('/ordenaritems/:id', itemcompraController.ordenaritems);


module.exports = router;

