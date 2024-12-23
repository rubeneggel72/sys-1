const express = require('express');
const router = express.Router();
const clienteController = require('../controller/cliente');
const checkAuthorization = require('../middleware/checkAuthorization');
/**
 *  cliente Routes 
*/
router.get('/index', clienteController.homepage);

router.get('/add', clienteController.addcliente);
router.post('/add', clienteController.postcliente);
router.get('/view/:id', clienteController.view);
router.get('/edit/:id', clienteController.edit);
router.put('/edit/:id', clienteController.editPost);
router.delete('/edit/:id', clienteController.deletecliente);
router.post('/search', clienteController.searchclientes);


module.exports = router;



