const express = require('express');
const router = express.Router();
const cotizacionController = require('../controller/cotizacion');
const itemcompraController = require('../controller/itemcompra');
const checkAuthorization = require('../middleware/checkAuthorization');
/**
 *  cliente Routes 
*/
router.get('/index', cotizacionController.homepage);
router.get('/add', cotizacionController.add);
router.post('/selectorganizacion', cotizacionController.selectorganizacion);
router.get('/selectedorganizacion/:id', cotizacionController.selectedorganizacion);
router.post('/add', cotizacionController.postAdd);
router.get('/view/:id', cotizacionController.view);
router.get('/viewItem/:id', cotizacionController.viewItem);
router.get('/edit/:id', cotizacionController.edit);

router.put('/edit/:id', cotizacionController.editPost);
router.get('/cotizacion/:id', cotizacionController.cotizacion);
router.delete('/edit/:id', cotizacionController.delete);
router.post('/search', cotizacionController.search);
router.get('/select', cotizacionController.select);
router.post('/searchItem', cotizacionController.searchItem);
router.get('/upregister/:id', cotizacionController.upregister);
router.get('/deleteItem/:id', cotizacionController.deleteItem);
router.post('/searchitemagregadohijo', itemcompraController.searchitemagregadohijo);
router.post('/searchitemagregado', cotizacionController.searchitemagregado);
router.get('/upregisteritemagregado/:id', cotizacionController.upregisteritemagregado);
router.get('/deleteitemagregado/:id', cotizacionController.deleteitemagregado);
router.get('/editcantitemagregado/:id', cotizacionController.editcantitemagregado);
router.post('/searchindicator', cotizacionController.searchindicator);
router.get('/upregisterindicator/:id', cotizacionController.upregisterindicator);
router.get('/deleteindicator/:id', cotizacionController.deleteindicator);
router.get('/editcantindicator/:id', cotizacionController.editcantindicator);
router.get('/deleteitemagregadohijo/:id', itemcompraController.deleteitemagregadohijo);
router.get('/ordenaritems/:id', cotizacionController.ordenaritems);
router.get('/edititemhijo/:id', itemcompraController.edititemhijo);
router.post('/edititemhijo/:id', itemcompraController.editPostHijo);
router.get('/upregisterhijo/:id', itemcompraController.upregisterhijo);
router.get('/pdfcotizacion/:id', cotizacionController.pdfcotizacion);
router.get('/pdfcotizacion2/:id', cotizacionController.pdfcotizacion2);


module.exports = router;



