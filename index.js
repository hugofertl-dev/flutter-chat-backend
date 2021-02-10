//Aca estoy importando el paquete express y lo instancio en una constante
const express = require('express');
const path = require('path');
//Aca lo que establezco es que se pueda leer la configuraciones preestablecidad
//en .env como variables de entorno
require('dotenv').config();

//DB Config
require('./database/config').dbConnection();

//aca creo la aplicacion
//con esto ya lo inicilize y estoy listo para escuchar peticiones
const app = express();

//Lectura de la Informacion que viene en un peticion http
//Lectura y parseo del body
app.use(express.json());

//Node Server
const server = require('http').createServer(app);
//io al principio estaba asi como const xque el codigo estaba
//todo aca en este archivo
//cuando se paso parte del codigo a socket.js io paso a 
//
// asi era antes const io = require('socket.io')(server);
module.exports.io = require('socket.io')(server);

require('./sockets/socket')

//Path Publico
//__dirname esto lo que hace es apuntar donde sea que se encuentra el servidor
//como por ejemplo https://conectwifi.com.ar o localhost si es local
//y despues se pone el nombre de la carpeta a la cual vamos a apuntar en esta caso
//public
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//Mis Rutas
app.use('/api/login', require('./routes/auth'));

//Aca agrego un escucha del puerto 3000 y tomo el error y lo muestro en consola
//un error puede ser el el puerto esta tomando
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto', process.env.PORT);
}) 


