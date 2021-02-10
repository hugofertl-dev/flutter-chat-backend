
const {io} = require('../index');

// //Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');
    client.on('disconnect', () => {
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
  