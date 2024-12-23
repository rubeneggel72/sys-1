const {Router} = require('express');

const router = Router();
const wbm = require('wbm');

router.get('/enviarMensaje', async(req, res)=>{
  wbm.start().then(async () => {
    const phones = ['543492301376'];
    const message = 'Good Morning.';
    await wbm.send(phones, message);
    await wbm.end();
}).catch(err => console.log(err));})
module.exports = router;