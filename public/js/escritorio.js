//hacemos la configuracion del escritorio
//Refencias html
const etiquetaEscritorio=document.querySelector('h1');
const botonSiguiente=document.querySelector('button');
const etiquetaSmall=document.querySelector('small');
const etiquetaClase=document.querySelector('.alert');
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
etiquetaClase.style.display='none';


const socket= io();
socket.on('connect',()=>{
//desahabilitamos el boton cuando se conecta nuestro software
botonSiguiente.disable=false;


})

socket.on('disconnect',()=>{
//habilitamos el boton para que no funcione cuando el software este apagado mas bien si nofunicona nuestro servidor
botonSiguiente.disable=true;

})



botonSiguiente.addEventListener('click',()=>{
//enviamos la informacion al backen para hacer las verificaciones de los tickets
socket.emit('atender-cliente',(escritorio),(payload)=>{
//hacemos destruturacion para obtener los valores del backend     
const{ok,msg,ticketcliente}=payload;
     if(!ok){
      //de pones el valor ala etiqueta cuando no halla ningunticket pendiente
      etiquetaSmall.innerText="Nadie";
      //desahabilitamos la caja para quenos muestre sihay errore s
       return etiquetasmall.style.display="";
      }
   
     //ponemos el ticket en la pantalla de escritorio
     etiquetaSmall.innerText="Ticket "+ticketcliente.numero;

 
})


})





