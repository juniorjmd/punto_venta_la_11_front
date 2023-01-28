import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select } from 'src/app/interfaces/generales';
import { Perfil } from 'src/app/interfaces/usuario';
import { loading } from 'src/app/models/app.loading';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { usuarioService } from 'src/app/services/usuario.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent  { 
  usuarioActual:UsuarioModel;
  opciones:boolean[] = [];
  perfilUsuario:number = 0;
  perfiles:Perfil[] =[];
  loading = new loading()  
  constructor(
    private userService : usuarioService,
    @Inject(MAT_DIALOG_DATA) private usuario: UsuarioModel ,
  private dialogo: MatDialogRef<UsuarioPerfilComponent>
  ) { this.usuarioActual = usuario;
    this.perfilUsuario = this.usuarioActual.perfil !;
    this.getPerfiles();
  }

  ngOnInit(): void {
  }

  guardarRelacion(){
    if(this.perfilUsuario === 0 ){
      alert('Debe seleccionar el perfil');
      return;
    }
     
    this.loading.show(); 
    this.userService.guardarUsuarioPerfil(this.usuarioActual , this.perfilUsuario).subscribe(
     (respuesta:any)=>{console.log(respuesta)
      
     if (respuesta.error === 'ok'){
       	
		
	Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'datos ingresados con exito',
        showConfirmButton: false,
        timer: 1500
      });   
     }else{
       Swal.fire(
        'ERROR',respuesta.error,
        'error'
      ) ;
     }
     this.loading.hide();
     this.dialogo.close(true);
     })
    
  }
  getPerfiles(){ 
    this.loading.show()
    this.userService.getPerfiles().subscribe(
      {next: (datos:any)=>{
        console.log(datos);
        
   if (datos.numdata > 0 ){ 
     datos.data.forEach((dato:Perfil , index:number )=>{
       this.perfiles[index] =  dato ;
     }) 
     console.log('perfiles',this.perfiles , this.perfiles.length);
   }else{
     this.perfiles = [];
   }

       this.loading.hide()
     } ,
     error: error=> {this.loading.hide();
      console.log(error)
      Swal.fire(
        'ERROR',error.error.error,
        'error');
    }}
    
      );
  }
  cerrarDialog(){
    this.dialogo.close(false);
  }
}

