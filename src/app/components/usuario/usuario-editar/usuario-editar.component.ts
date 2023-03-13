import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { loading } from 'src/app/models/app.loading';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { usuarioService } from 'src/app/services/usuario.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent {
  newUsuario: UsuarioModel ;
  
  fatrash = faTrash
  fasave = faSave
  loading = new loading();
  constructor(
    public dialogo: MatDialogRef<UsuarioEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public userImport:UsuarioModel ,
    private userService : usuarioService
  ) {
   this.newUsuario = userImport;
   console.log('usuario a editar ',this.newUsuario);
   
   this.newUsuario.Usr_Modif =  parseInt(localStorage.getItem('#2@56YH7H82BF')!) ; 
   }

  ngOnInit(): void {
  }
  guardarUsuario()
  {
    
    console.log('nueva caja',this.newUsuario.Nombre1)
    this.newUsuario.usr_registro =  parseInt(localStorage.getItem('#2@56YH7H82BF')!); 
   
    if (typeof(this.newUsuario.Login) === 'undefined'){
      this.loading.hide(); 
      Swal.fire(
        'ERROR','Debe ingresar el Usuario para inicio de sesión',
        'error'
      ) ;
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
    console.log('usuario enviado' , this.newUsuario);
    
    this.userService.updateUsuarios(this.newUsuario).subscribe(
     (respuesta:any)=>{console.log(respuesta)
      
     if (respuesta.error === 'ok'){
       Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'datos ingresados con exito',
        showConfirmButton: false,
        timer: 1500
      });  
       this.newUsuario =  new UsuarioModel(); 
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

