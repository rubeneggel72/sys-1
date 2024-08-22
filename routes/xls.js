const express = require('express');
const router = express.Router();
const idsController = require('../controller/ids');
const excelController=require('../controllers/excel.controller.js');
const upload =require('../middleware/upload.middleware.js');

excelRouter.post('/xlsupload', upload.single('file'), excelController.upload)
excelRouter.get('/users', excelController.getAll)
excelRouter.get('/xlsdownload', excelController.download)

module.exports = excelRouter;







