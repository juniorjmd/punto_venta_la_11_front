import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { vwsucursal } from 'src/app/models/app.db.interfaces';
import { loading } from 'src/app/models/app.loading';
import { UsuarioModel } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { usuarioService } from '../../../services/usuario.services';

@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.component.html',
  styleUrls: ['./cambio-pass.component.css']
})
export class CambioPassComponent {

  
  faUser = faUser ;
faEnvelope = faEnvelope ;
 usuario!: UsuarioModel;
 sucursal:vwsucursal[]=[]; 
 loading = new loading();

 constructor( private userService :usuarioService ,
  public dialogo: MatDialogRef<CambioPassComponent>,
  @Inject(MAT_DIALOG_DATA) public dataInsert:{usuario:UsuarioModel , sucursal:vwsucursal[]}  
) {
  this.usuario = dataInsert.usuario ;
  this.sucursal = dataInsert.sucursal ; 
  console.log(this.usuario);
  

}
 login(){
  
  this.loading.show(); 
  console.log('usuario enviado' , this.usuario);
  
  this.userService.cambiarContraseña(this.usuario).subscribe(
   (respuesta:any)=>{console.log(respuesta)
    
   if (respuesta.error === 'ok'){
     Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'datos ingresados con exito',
      showConfirmButton: false,
      timer: 1500
    });  
     this.dialogo.close(true); 
   }else{
     Swal.fire(  'ERROR',respuesta.error, 'error') ;
   }
   this.loading.hide();
 } );
}
}
