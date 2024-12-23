const express = require('express');
const router = express.Router();
const ordentrabajoController = require('../controller/ordentrabajo');
const itemcompraController = require('../controller/itemcompra');
const checkAuthorization = require('../middleware/checkAuthorization');
/**
 *  cliente Routes 
*/
router.get('/index', ordentrabajoController.homepage);
router.get('/add/:id', ordentrabajoController.add);
router.post('/selectorganizacion', ordentrabajoController.selectorganizacion);
router.get('/selectedorganizacion/:id', ordentrabajoController.selectedorganizacion);
router.post('/add', ordentrabajoController.postAdd);
router.get('/view/:id', ordentrabajoController.view);
router.get('/viewItem/:id', ordentrabajoController.viewItem);
router.get('/edit/:id', ordentrabajoController.edit);

router.put('/edit/:id', ordentrabajoController.editPost);
router.get('/cotizacion/:id', ordentrabajoController.cotizacion);
router.delete('/edit/:id', ordentrabajoController.delete);
router.post('/search', ordentrabajoController.search);
router.get('/select', ordentrabajoController.select);
router.post('/searchItem', ordentrabajoController.searchItem);
router.get('/upregister/:id', ordentrabajoController.upregister);
router.get('/deleteItem/:id', ordentrabajoController.deleteItem);
router.post('/searchitemagregadohijo', itemcompraController.searchitemagregadohijo);
router.post('/searchitemagregado', ordentrabajoController.searchitemagregado);
router.get('/upregisteritemagregado/:id', ordentrabajoController.upregisteritemagregado);
router.get('/deleteitemagregado/:id', ordentrabajoController.deleteitemagregado);
router.get('/editcantitemagregado/:id', ordentrabajoController.editcantitemagregado);
router.post('/searchindicator', ordentrabajoController.searchindicator);
router.get('/upregisterindicator/:id', ordentrabajoController.upregisterindicator);
router.get('/deleteindicator/:id', ordentrabajoController.deleteindicator);
router.get('/editcantindicator/:id', ordentrabajoController.editcantindicator);
router.get('/deleteitemagregadohijo/:id', itemcompraController.deleteitemagregadohijo);
router.get('/ordenaritems/:id', ordentrabajoController.ordenaritems);
router.get('/edititemhijo/:id', itemcompraController.edititemhijo);
router.post('/edititemhijo/:id', itemcompraController.editPostHijo);
router.get('/upregisterhijo/:id', itemcompraController.upregisterhijo);
router.get('/pdfcotizacion/:id', ordentrabajoController.pdfcotizacion);
router.get('/pdfcotizacion2/:id', ordentrabajoController.pdfcotizacion2);


module.exports = router;



