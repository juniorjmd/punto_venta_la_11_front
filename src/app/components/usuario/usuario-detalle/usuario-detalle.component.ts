import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cajaModel } from 'src/app/models/cajas.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { cajasServices } from 'src/app/services/Cajas.services';

import { loading } from 'src/app/models/app.loading';
import { select } from 'src/app/interfaces/generales';
import { caja } from 'src/app/interfaces/caja.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent {


  cajas :cajaModel[]  = [];
  opciones:boolean[] = [];
   loading = new loading();
  usuarioActual:UsuarioModel ;  
  constructor(@Inject(MAT_DIALOG_DATA) public usuario: UsuarioModel ,
   
  private serviceCaja : cajasServices,
  public dialogo: MatDialogRef<UsuarioDetalleComponent>
  ) {
                 this.usuarioActual = usuario;
                 this.getCajas();
                }

  
getCajas(){
  this.cajas[0] = new cajaModel(undefined);
  
  this.loading.show()
  this.serviceCaja.getCajasPorUsuario(this.usuarioActual.ID)
     .subscribe(
      {next:(datos:any)=>{
        console.log('getCajasPorUsuario',datos);
        
   if (datos.numdata > 0 ){ 

     datos.data.forEach((dato:caja , index : number)=>{ 
       this.cajas[index] = new cajaModel( dato ); 
       this.opciones[index] = this.cajas[index].asignada!;
     }) 
     console.log(this.cajas);
   }else{
     this.cajas = [];
   }

       this.loading.hide()},
    error:(err:any)=>{
      this.loading.hide(); 
        Swal.fire(
          'ERROR',err.error.error,
          'error'
        ) ;
    }}
      );
}
cerrarDialog(){
  this.dialogo.close(false);
}
guardarRelacion(){
  console.log('opciones',this.opciones)
  let OpcionesEnvio:number[] = []; 
  let count = 0;
  this.opciones.forEach((values,index)=>{
    if(values){
      OpcionesEnvio[count] = this.cajas[index].id;
      count++;
    }
    
  })
  if (OpcionesEnvio.length > 0){
    this.loading.show(); 
   this.serviceCaja.setCajasAUsuarios(this.usuarioActual.ID,OpcionesEnvio).subscribe(
    (respuesta:any)=>{console.log(respuesta)
     
    if (respuesta.error === 'ok'){  
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'datos ingresados con exito',
        showConfirmButton: false,
        timer: 1500
      })
      this.loading.hide();
      this.cerrarDialog()
    }else{ 

      Swal.fire(
        'ERROR',respuesta.error,
        'error'
      ) ;
      this.loading.hide();
    }
    }

   )
  }else{ 
    Swal.fire(
      'ERROR','debe escoger las cajas a asignar!!! ',
      'error'
    ) ;
  }
  console.log(OpcionesEnvio);
}
}

