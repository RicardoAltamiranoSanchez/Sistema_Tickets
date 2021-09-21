const Ticket =require('../models/controlTicket.js');
//son tan solo de instanciar el objeto se dispara el constructor
const ticket = new Ticket();


const socketController = (socket) => {
    //Enviamos el ultimo ticket que se dio en la ultima session
    socket.emit('ultimo-ticket',ticket.ultimo);
    //enviamos el estado actual de los tickets
     socket.emit('estado-actual',ticket.ultimostickets);
//enviamos los ticket que estan lblPendientes
   
      socket.emit('ticket-pendientes',ticket.tickets.length);
   


//el socket principal para la configuracion de todo el socket no estoy muy seguro XD
    socket.on('nuevo-cliente', ( payload, callback ) => {
    //obtenemos el valor del ticket y luego lo enviamos con el callback ala parte del frente
     const siguiente =ticket.siguiente();   
     callback(siguiente);
      socket.broadcast.emit('ticket-pendientes',ticket.tickets.length);
   
    });

    socket.on('atender-cliente',(escritorio,callback)=>{
  //verificamos si existe el escritorio 
     if(!escritorio){
      return callback({
       ok:false,
       msg:"El escritorio es obligatorio"

     })}
     //hacemos un nuevo objeto y de damos el valor de escritoro y verificamos si existen o no
     const ticketcliente=ticket.AtenderTicket(escritorio);//obtenemos elticket y de damos una asigancion a cual escritorio lo va atender
      //Antes de atender un cliente debemos actualizar los ultimos cuatro ticket en la pantalla de y con broadcast enviamos mensajes a todos nuestro sockets
      socket.broadcast.emit('estado-actual',ticket.ultimostickets);
      //De asignamos para que valla actualizando cuadno de damos click al siguiente en la de inicio es para instancias  
      socket.emit('ticket-pendientes',ticket.tickets.length);
      //Aqui es para todos los escritorio que actualizen
        socket.broadcast.emit('ticket-pendientes',ticket.tickets.length);

      if(!ticketcliente){//Verficamos si existen tickets
      callback({
              ok:false,
              msg:"No hay ticket que atender"
            })

     }else{//Si es que si existe enviamos valor de verdadero y el objeto ticket
          callback({
            ok:true,
            ticketcliente
          })
           }

})




}



module.exports = {
    socketController
}

