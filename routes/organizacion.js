const express = require('express');
const router = express.Router();
const organizacionController = require('../controller/organizacion');
const checkAuthorization = require('../middleware/checkAuthorization');
/**
 *  cliente Routes 
*/
router.get('/index', organizacionController.homepage);
router.get('/add', organizacionController.add);
router.post('/add', organizacionController.postAdd);
router.get('/view/:id', organizacionController.view);
router.get('/viewPersona/:id', organizacionController.viewPersona);
router.get('/edit/:id', organizacionController.edit);
router.put('/edit/:id', organizacionController.editPost);
router.delete('/edit/:id', organizacionController.delete);
router.post('/search', organizacionController.search);
router.get('/select', organizacionController.select);
router.post('/searchorgcliente', organizacionController.searchorgcliente);
router.get('/upregister/:id', organizacionController.upregister);
router.get('/deletePersona/:id', organizacionController.deletePersona);

module.exports = router;



