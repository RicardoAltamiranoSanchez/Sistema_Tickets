const Ticket =require('../models/controlTicket.js');
//son tan solo de instanciar el objeto se dispara el constructor
const ticket = new Ticket();


const socketController = (socket) => {
    //Enviamos el ultimo ticket que se dio en la ultima session
    socket.emit('ultimo-ticket',ticket.ultimo);

  
    socket.on('nuevo-cliente', ( payload, callback ) => {
    //obtenemos el valor del ticket y luego lo enviamos con el callback ala parte del frente
     const siguiente =ticket.siguiente();   
     callback(siguiente);

   
    });

}



module.exports = {
    socketController
}

