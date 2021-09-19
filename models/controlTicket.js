//Creamos un objeto de tipo ticket para llevar un control sobre ellos
//el path se usa para saber el path osea la ubicacion del archivo 
const path= require('path');
//fs el sistema para poder manipular desde elsitema como si fuera una consola para poder modificar desde dentro del archivo
const fs= require('fs');
//hacemos un nuevo objeto para el control de ticket del cliente

class TicketCliente{
  
    constructor(numero,escritorio){
      this.numero=numero;
      this.escritorio=escritorio;

}

}

//Este es un objeto 
class Ticket{


 constructor(){
      this.ultimo=0;
      this.dia=new Date().getDate();
      this.tickets=[];
      this.ultimostickets=[];
    
      this.init();
     }
// este metodo es muy similar al tostring  solo es para mostrar los valorares de una mejor forma
    get toJson(){
//El return se hace de tipo objeto de tipo json
   return {
        ultimo:this.ultimo,
        dia:this.dia,
        tickets:this.tickets,
        ultimostickets:this.ultimostickets,
       }
     }
     //Aqui iniciamos nuestro objetos
    init(){
     //Capturamos la base de datos por el momento solo es una base de datos tipo archivo json
      const {ultimo,dia,tickets,ultimostickets}=require('../DB/db.json');
      if(dia===this.dia){
       this.ultimo=ultimo;
       this.tickets=tickets;
       this.ultimostickets=ultimostickets;

    }else{
         this.guardarBaseDB(); 

     }
    }
   guardarBaseDB(){
      //Construimos un path donde esta nuestra base de datos para poder modifcarla cuando no este bien dal fecha
      const nuevoPath=path.join( __dirname,'../Db/db.json');
      //Aqui modificamos nuestra base de datos con los parametro de nuestro objeto ticket
       //este es el metodo para poder modificar la base de datos con fs ponemos primero el path y despues los datos que vamos a modificar
       fs.writeFileSync(nuevoPath,JSON.stringify(this.toJson));
}
   
   //hacemos la configuracion para el siguiente ticket del cliente utilizamos el objeto de TicketCliente
   siguiente(){
    //es la forma mas facil de hacer un accumulador
    this.ultimo+=1;
    const ticket=new TicketCliente(this.ultimo,null);//Creamos el objeto de pasamos el valor de ultimo para decir que es el siguiente
    //añadimos al arreglo un nuevo valor push es una forma de insertar valores de farma facil
    this.tickets.push(ticket);
    //lo guardamos en la base de datos por si se reinicia y para saber cual fue el ultimo ticket
    this.guardarBaseDB();
    //por ultimo solo retornamos el tickets
    return `Ticket ${ticket.numero}`;

   }
//hacemos la logica para antender elticket y que se muester en el escritorio y de añadimos como parametro el escritorio
   AtenderTicket(escritorio){
     //Verificamos si hay ticket en la cola
     if(this.tickets.length===0){ return null;}
     ticket =this.tickets.shift();//es un metodo de javascript elimina el primer elemento de un arreglo y lo retorna
     ticket.escritorio=escritorio;//Asignamos el ticket al escritorio que indiquemos      
     this.ultimostickets.unshift(ticket);//Añadimos el ticket al arreglo es un metodo que añade un valor al inicio de un arreglo
    //Verificamos que solo sean 4 tickets para pode mostrar en la pantalla
    if(this.ultimostickets > 4){
    //splice es metodo para eliminar o quitar aqui estamos elimnando el ultimo objeto para que sean cuatro y no halla errores
    //primero de damos el valor de donde que queremos empezar y despues cuanto queremos removero por eso es el-1 empezamos en el ultimo valor  
    this.ultimostickets.splice(-1,1); 
      
     }     
   this.guardarBaseDB();
   //solo retornamos el ticket
    return ticket;

}
}
module.exports=Ticket;


