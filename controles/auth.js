const { response, json } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if (existeEmail) {
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id);
    
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el Administrador'
        });
    }
}

const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        //Validar el password
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La Contrasena no es valida'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuarioDB.id);

        //esta es la respuesta que envio si esta todo OK

        return res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
            
    }

}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'Usuario no encontrado'
        });
    }

    //const usuario = await Usuario.findOne(uid);

    return res.json({
        ok: true,
        usuario,
        token: token
    })

}

module.exports = {
    crearUsuario,
    login,
    renewToken
}