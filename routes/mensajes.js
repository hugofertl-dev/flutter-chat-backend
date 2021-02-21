/* 
    Path: /api/mensajes
*/

const { Router } = require('express');
const { obtenerChat } = require('../controles/mensajes');
const { validarJWT } = require('../middlewares/validar-swt');

const router = Router();

//el paramentro que agrege a esta rura :de es para que cuando se haga la peticion
//se agrege el id del usurio del cual quiero recuperar el chat
router.get('/:de', validarJWT, obtenerChat);


module.exports = router;