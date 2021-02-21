
const { response } = require('express');
const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res) => {
 
    // como toda la peticion la paso por el validarToken ahi ya tengo mi Id
    const miId = req.uid;
    //el req.params.de lo saco del argumento :de que se agrego a la ruta /api/mensajes/:de
    const mensajesDe = req.params.de;

    const last30 = await Mensaje.find({
        $or: [{de: miId, para: mensajesDe}, {de: mensajesDe, para: miId}]
    })
    .sort({createdAt: 'desc'})
    .limit(30)
    res.json({
        ok: true,
        mesajes: last30
    })

}

module.exports = {
    obtenerChat
}