//hacemos la configuracion del escritorio
//Refencias html
const etiquetaEscritorio=document.querySelector('h1');
const botonSiguiente=document.querySelector('button');

//Este nuevo metodo para buscar la ubicacion del escritorio mas bien el path de la url en donde estamos ubicados
const searchParams= new URLSearchParams(window.location.search);
//buscamos si estamos en el path de escritorio y el has es para buscar cualquier palabra que tenga escritorio mas bien que coninsida
if(!searchParams.has('escritorio')){
//sino conincide lo mandamos directo al inicio y mandamos un error   
    window.location='index.html'; 
    throw new Error('El escritorio es obligatorio'); 
}
//obtenemos el path completo donde estamos ubicados
const escritorio=searchParams.get('escritorio');
//de cambiamos elnombre y ponemos en que escritorio estamos
etiquetaEscritorio.innerText=escritorio;



const socket= io();
socket.on('connect',()=>{
//desahabilitamos el boton cuando se conecta nuestro software
botonSi.disable=false;
socket.on('ultimo-ticket',(ultimo) =>{
  nuevoCliente.innerText="Ultimo ticket de la ultima session\n"+ultimo;

});
})

socket.on('disconnect',()=>{
//habilitamos el boton para que no funcione cuando el software este apagado mas bien si nofunicona nuestro servidor
botonSiguiente.disable=true;

})



botonSiguiente.addEventListener('click',()=>{
//obtenemos el valor del ticket desde nuestro servidor y luego ponemos el valor del ticket en la etiqueta html con innerText
// socket.emit('nuevo-cliente',null,(ticket)=>{
//    nuevoCliente.innerText=ticket;
// })


})





