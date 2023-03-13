import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Clientes } from 'src/app/interfaces/clientes.interface';
import { select } from 'src/app/interfaces/generales';
import { Persona } from 'src/app/interfaces/persona';
import { loading } from 'src/app/models/app.loading';
import { usuarioService } from 'src/app/services/usuario.services';

@Component({
  selector: 'app-clientes-disponibles',
  templateUrl: './clientes-disponibles.component.html',
  styleUrls: ['./clientes-disponibles.component.css']
})
export class ClientesDisponiblesComponent {
clientes:Persona[] = [];
public loading = new loading();
constructor( public dialogo: MatDialogRef<ClientesDisponiblesComponent>,
   private userService : usuarioService) {  this.buscarPersonas();
}

enviarPersona(persona:Persona){
  this.dialogo.close({confirmado:true , persona });
}
buscarPersonas(){
     
  this.loading.show();
  this.userService.getPersonasDisponibles().subscribe( 
    async ( respuesta:any|select)=>{
      let cont = 0;
       console.log('getCierresTotalesYparciales',respuesta); 
       if (respuesta.error === 'ok' ){ 
         if (respuesta.numdata > 0)
         {//respuesta.data[0]; 
        console.log('datos cierres',respuesta.data);
 
          this.clientes = respuesta.data;
             
        
         
      }

       }else{
         alert(respuesta.error);
       }
       this.loading.hide();
  }) 
  }
}
