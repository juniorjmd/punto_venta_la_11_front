import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { loading } from 'src/app/models/app.loading';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { usuarioService } from 'src/app/services/usuario.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styleUrls: ['./usuario-nuevo.component.css']
})
export class UsuarioNuevoComponent {
  newUsuario:UsuarioModel =  new UsuarioModel();
  fatrash = faTrash
  fasave = faSave
  public loading = new loading();
  constructor( public dialogo: MatDialogRef<UsuarioNuevoComponent>,
     private userService : usuarioService) { 
      this.newUsuario.estado = 0
  }

  ngOnInit(): void {
  }
  guardarUsuario(){
    console.log('nueva caja',this.newUsuario.Nombre1)
    this.newUsuario.usr_registro =  parseInt(localStorage.getItem('#2@56YH7H82BF')!); 
    if (typeof(this.newUsuario.Nombre1) === 'undefined'){
     this.loading.hide();
     alert('Debe ingresar el Nombre de la caja');
     return;
    }
    if (typeof(this.newUsuario.Login) === 'undefined'){
      this.loading.hide();
      alert('Debe ingresar el Usuario para inicio de sesión');
      return;
     }
    if (typeof(this.newUsuario.estado) === 'undefined'){
     this.newUsuario.estado = 1 ;
    }else{
     if ( this.newUsuario.estado  === 0){
       this.newUsuario.estado = 1 ;
      }
    }
  
    
    this.loading.show(); 
    this.userService.guardarUsuarios(this.newUsuario).subscribe(
     (respuesta:any)=>{console.log(respuesta)
      
     if (respuesta.error === 'ok'){
       Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'datos ingresados con exito',
        showConfirmButton: false,
        timer: 1500
      });  
       this.newUsuario =  new UsuarioModel(undefined); 
     }else{
       Swal.fire(  'ERROR',respuesta.error, 'error') ;
     }
     this.loading.hide();
     this.cerrarFormularioTrue()
     })
  }
  cerrarFormulario(){
    this.dialogo.close(false);
  }
  cerrarFormularioTrue(){
    this.dialogo.close(true);
  }
  limpiarFormulario(){
    this.newUsuario = new UsuarioModel(undefined);
  }
}

