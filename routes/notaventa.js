const express = require('express');
const router = express.Router();
const notaventaController = require('../controller/notaventa');
const itemcompraController = require('../controller/itemcompra');
const checkAuthorization = require('../middleware/checkAuthorization');
/**
 *  cliente Routes 
*/
router.get('/index', notaventaController.homepage);
router.get('/add', notaventaController.add);
router.post('/selectorganizacion', notaventaController.selectorganizacion);
router.get('/selectedorganizacion/:id', notaventaController.selectedorganizacion);
router.post('/add', notaventaController.postAdd);
router.get('/view/:id', notaventaController.view);
router.get('/viewItem/:id', notaventaController.viewItem);
router.get('/edit/:id', notaventaController.edit);

router.put('/edit/:id', notaventaController.editPost);
router.get('/cotizacion/:id', notaventaController.cotizacion);
router.delete('/edit/:id', notaventaController.delete);
router.post('/search', notaventaController.search);
router.get('/select', notaventaController.select);
router.post('/searchItem', notaventaController.searchItem);
router.get('/upregister/:id', notaventaController.upregister);
router.get('/deleteItem/:id', notaventaController.deleteItem);
router.post('/searchitemagregadohijo', itemcompraController.searchitemagregadohijo);
router.post('/searchitemagregado', notaventaController.searchitemagregado);
router.get('/upregisteritemagregado/:id', notaventaController.upregisteritemagregado);
router.get('/deleteitemagregado/:id', notaventaController.deleteitemagregado);
router.get('/editcantitemagregado/:id', notaventaController.editcantitemagregado);
router.post('/searchindicator', notaventaController.searchindicator);
router.get('/upregisterindicator/:id', notaventaController.upregisterindicator);
router.get('/deleteindicator/:id', notaventaController.deleteindicator);
router.get('/editcantindicator/:id', notaventaController.editcantindicator);
router.get('/deleteitemagregadohijo/:id', itemcompraController.deleteitemagregadohijo);
router.get('/ordenaritems/:id', notaventaController.ordenaritems);
router.get('/edititemhijo/:id', itemcompraController.edititemhijo);
router.post('/edititemhijo/:id', itemcompraController.editPostHijo);
router.get('/upregisterhijo/:id', itemcompraController.upregisterhijo);
router.get('/pdfcotizacion/:id', notaventaController.pdfcotizacion);
router.get('/pdfcotizacion2/:id', notaventaController.pdfcotizacion2);


module.exports = router;



