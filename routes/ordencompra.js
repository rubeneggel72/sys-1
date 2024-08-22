const express = require('express');
const router = express.Router();
const ordencompraController = require('../controller/ordencompra');
const itemcompraController = require('../controller/itemcompra');
const checkAuthorization = require('../middleware/checkAuthorization');
/**
 *  cliente Routes 
*/
router.get('/index', ordencompraController.homepage);
router.get('/add', ordencompraController.add);
router.post('/selectorganizacion', ordencompraController.selectorganizacion);
router.get('/selectedorganizacion/:id', ordencompraController.selectedorganizacion);
router.post('/add', ordencompraController.postAdd);
router.get('/view/:id', ordencompraController.view);
router.get('/viewItem/:id', ordencompraController.viewItem);
router.get('/edit/:id', ordencompraController.edit);

router.put('/edit/:id', ordencompraController.editPost);
router.get('/cotizacion/:id', ordencompraController.cotizacion);
router.delete('/edit/:id', ordencompraController.delete);
router.post('/search', ordencompraController.search);
router.get('/select', ordencompraController.select);
router.post('/searchItem', ordencompraController.searchItem);
router.get('/upregister/:id', ordencompraController.upregister);
router.get('/deleteItem/:id', ordencompraController.deleteItem);
router.post('/searchitemagregadohijo', itemcompraController.searchitemagregadohijo);
router.post('/searchitemagregado', ordencompraController.searchitemagregado);
router.get('/upregisteritemagregado/:id', ordencompraController.upregisteritemagregado);
router.get('/deleteitemagregado/:id', ordencompraController.deleteitemagregado);
router.get('/editcantitemagregado/:id', ordencompraController.editcantitemagregado);
router.post('/searchorganizacion', ordencompraController.searchorganizacion);
router.get('/upregisterorganizacion/:id', ordencompraController.upregisterorganizacion);
router.get('/deleteorganizacion/:id', ordencompraController.deleteorganizacion);
router.get('/editcantorganizacion/:id', ordencompraController.editcantorganizacion);
router.get('/deleteitemagregadohijo/:id', itemcompraController.deleteitemagregadohijo);
router.get('/ordenaritems/:id', ordencompraController.ordenaritems);
router.get('/edititemhijo/:id', itemcompraController.edititemhijo);
router.post('/edititemhijo/:id', itemcompraController.editPostHijo);
router.get('/upregisterhijo/:id', itemcompraController.upregisterhijo);
router.get('/pdfcotizacion/:id', ordencompraController.pdfcotizacion);
router.get('/pdfcotizacion2/:id', ordencompraController.pdfcotizacion2);
router.get('/enviarpedidocotizacion/:id', ordencompraController.enviarpedidocotizacion);


module.exports = router;



