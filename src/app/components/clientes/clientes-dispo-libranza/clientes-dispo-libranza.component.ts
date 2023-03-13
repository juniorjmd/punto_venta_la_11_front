import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select } from 'src/app/interfaces/generales';
import { Persona } from 'src/app/interfaces/persona';
import { loading } from 'src/app/models/app.loading';
import { usuarioService } from 'src/app/services/usuario.services';
import { Documento } from '../../../interfaces/documento.interface';
import { DocumentosModel } from '../../../models/documento.model';
import { ClientesService } from '../../../services/Clientes.services';

@Component({
  selector: 'app-clientes-dispo-libranza',
  templateUrl: './clientes-dispo-libranza.component.html',
  styleUrls: ['./clientes-dispo-libranza.component.css']
})
export class ClientesDispoLibranzaComponent{
  clientes:Persona[] = [];
  public loading = new loading();
  constructor( public dialogo: MatDialogRef<ClientesDispoLibranzaComponent>,
     private userService : usuarioService, private ClientesService :ClientesService,
     @Inject(MAT_DIALOG_DATA) public Documento:DocumentosModel ) {  this.buscarPersonas();
  }
  
  enviarPersona(persona:Persona){
    //
    console.log(this.Documento);
    this.loading.show();
    this.ClientesService.generarMarcacionLibranza(persona,this.Documento).subscribe( 
      async ( respuesta:any|select)=>{
        let cont = 0;
         console.log('getCierresTotalesYparciales',respuesta); 
         if (respuesta.error === 'ok' ){ 
            
          console.log('datos cierres',respuesta.documento_retorno);
   
          let doc:DocumentosModel = respuesta.documento_retorno;
               
             this.dialogo.close({confirmado:true , doc });
        
  
         }else{
           alert(respuesta.error);
         }
         this.loading.hide();
    }) 
  }
  buscarPersonas(){
       
    this.loading.show();
    this.userService.getPersonasDisponiblesLibranza().subscribe( 
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
  
