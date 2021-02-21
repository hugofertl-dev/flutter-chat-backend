const { response } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response ) => {

    //Esta es la paginacion que quiero implemetar para leer desde ahi en adelante
    //ejemplo: api/usuarios?desde=4
    const desde = Number(req.query.desde) || 0;
    
    const usuarios = await Usuario
        //Aca con el find lo que hago es pregunto si el id del usuario es distinto al usuario logeado lo tomo sino lo descarto
        .find({_id: {$ne: req.uid}})  
        //y aca Ordeno por el campo online (antepongo al campo el sigo -o+ segun quiera ordenar de forma ASC o DESC)
        .sort('-online')
        .skip(desde)
        .limit(20)
    res.json({
        ok: true,
        usuarios
    });

}

module.exports = {
    getUsuarios
}