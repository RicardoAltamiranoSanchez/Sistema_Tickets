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

    socket.on('atender-cliente',(escritorio,callback)=>{
  //verificamos si existe el escritorio 
     if(!escritorio){
      return callback({
       ok:false,
       msg:"El escritorio es obligatorio"

     })}
     //hacemos un nuevo objeto y de damos el valor de escritoro y verificamos si existen o no
     const ticketcliente=ticket.AtenderTicket(escritorio);//obtenemos elticket y de damos una asigancion a cual escritorio lo va atender
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

