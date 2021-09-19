//hacemos la funcionalidad del nuevo ticket 
const nuevoCliente=document.querySelector('#lblNuevoTicket');
const botonCliente=document.querySelector('#boton');

const socket= io();
socket.on('connect',()=>{
//desahabilitamos el boton cuando se conecta nuestro software
botonCliente.disable=false;
socket.on('ultimo-ticket',(ultimo) =>{
  nuevoCliente.innerText="Ultimo ticket de la ultima session\n"+ultimo;

});
})

socket.on('disconnect',()=>{
//habilitamos el boton para que no funcione cuando el software este apagado mas bien si nofunicona nuestro servidor
botonCliente.disable=true;

})


socket.on('nuevo-cliente',(payload)=>{
console.log(payload);

})

botonCliente.addEventListener('click',()=>{
//obtenemos el valor del ticket desde nuestro servidor y luego ponemos el valor del ticket en la etiqueta html con innerText
socket.emit('nuevo-cliente',null,(ticket)=>{
   nuevoCliente.innerText=ticket;
})


})





