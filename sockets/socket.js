
const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');

const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controles/socket');

// //Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');

    console.log(client.handshake.headers['x-token']);
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //Verificar autenticacion
    if (!valido) { return client.disconnect();}

    usuarioConectado(uid);

    console.log('Cliente Conectado');

    //Ingresar al usuario a una sala en Particular utilizo el uid del usario para identificar a la Sala
    client.join( uid);
    //Para enviar un mensaje a un cliente en particular seria: client.to(uid).emit('nombre del evento');

    //Escuchar del Cliente un mensaje Personal
    client.on('mensaje-personal', async (payload) => {
      console.log(payload);
      const estado = await grabarMensaje(payload);
      console.log('grabo: ' + estado);
      client.to(payload.para).emit('mensaje-personal', payload);
    })

    client.on('disconnect', () => {
      usuarioDesconectado(uid);
      console.log('Cliente Desconectado');
    });
  
    client.on('mensaje', (payload) => {
      console.log('Mensaje!!!!', payload);
    })
  
    //Aca mando un msj del server a los clientes
    //si utilizo client va a uno en especifico
    //si utilizo io es general va a todos los
    //dispositivos conectados actualmente
    
    //Aca mando un msj a todos los clientes conectados
    io.emit('mensaje', {admin: 'Nuevo Mensaje'});
  });
  