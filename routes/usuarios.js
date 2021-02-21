/* 
    path: /api/usuarios
*/

//Estas son importaciones 
const { Router } = require('express');
const { getUsuarios } = require('../controles/usuarios');
const { validarJWT } = require('../middlewares/validar-swt');

const router = Router();


router.get('/', validarJWT, getUsuarios);


module.exports = router;