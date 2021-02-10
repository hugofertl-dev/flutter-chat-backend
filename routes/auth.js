/* 
    path: /api/login
*/

//Estas son importaciones 
const { Router } = require('express');
const { check } = require('express-validator');
//Esta es una importacion de un archivo creado x mi 
const { crearUsuario, login, renewToken } = require('../controles/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-swt');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('password', 'El pasword es obligatorio').not().isEmpty(),
    //con validarCampos lo que hago es corrborar que vengan todos los campos en mi peticion
    validarCampos
], crearUsuario);

router.post('/', [
    check('email', 'El email no es valido').isEmail(),
    check('password', 'El pasword es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.get('/renew', validarJWT, renewToken);


module.exports = router;