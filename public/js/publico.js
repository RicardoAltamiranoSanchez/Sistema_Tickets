//REFERENCIAS HTML 
const etiEscritoria1=document.querySelector('#lblTicket1');
const escritorio1=document.querySelector('#lblEscritorio1');

const etiEscritoria2=document.querySelector('#lblTicket2');
const escritorio2=document.querySelector('#lblEscritorio2');

const etiEscritoria3=document.querySelector('#lblTicket3');
const escritorio3=document.querySelector('#lblEscritorio3');

const etiEscritoria4=document.querySelector('#lblTicket4');
const escritorio4=document.querySelector('#lblEscritorio4');
const socket= io();


socket.on("estado-actual",(payload) =>{
const audio=new Audio('./audio/new-ticket.mp3');
audio.play();
//hacemos destruturacion del arrglo y lo asiganmos el valor respetivo a cada escritorio con innerText solo cambiamos el texto
const [ticket1,ticket2,ticket3,ticket4]=payload;
//Escritorio1
etiEscritoria1.innerText=`Ticket ${ticket1.numero}`;
escritorio1.innerText=`Pasar a ${ticket1.escritorio}`;
//escritorio2
etiEscritoria2.innerText=`Ticket ${ticket2.numero}`;
escritorio2.innerText=` ${ticket2.escritorio}`;
//escritorio3
etiEscritoria3.innerText=`Ticket ${ticket3.numero}`;
escritorio3.innerText=` ${ticket3.escritorio}`;
//escritorio4

etiEscritoria4.innerText=`Ticket ${ticket4.numero}`;
escritorio4.innerText=` ${ticket4.escritorio}`;
})