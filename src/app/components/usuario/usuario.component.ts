import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faAddressCard, faCashRegister, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Usuarios } from 'src/app/interfaces/usuario';

import { loading } from 'src/app/models/app.loading';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { usuarioService } from 'src/app/services/usuario.services';
import Swal from 'sweetalert2';
import { UsuarioDetalleComponent } from './usuario-detalle/usuario-detalle.component';
import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';
import { UsuarioNuevoComponent } from './usuario-nuevo/usuario-nuevo.component';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  usuarios :UsuarioModel[]  = []; 
  faPencilAlt = faPencilAlt;
  faaddresscard = faAddressCard ;
  faCashRegister = faCashRegister;
  artloading = new loading();
  constructor( private userService : usuarioService,
    private newUsuarioDialog : MatDialog , 
      ) { 
    this.getUsuarios();
  }
 
  crearUsuario(){
    
      this.newUsuarioDialog.open(UsuarioNuevoComponent,{data:null})
      .afterClosed()
      .subscribe((confirmado: Boolean)=>{
        if (confirmado){
        this.getUsuarios()  
      }
      })
  }
  setAgregarPerfil(usuario : UsuarioModel){
    this.newUsuarioDialog.open(UsuarioPerfilComponent,{data:usuario})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{ if (confirmado){
      this.getUsuarios()  
    }})

  }
  getUsuarios(){
    this.usuarios[0] = new UsuarioModel() ;
    this.artloading.show()
    this.userService.getUsuarios().subscribe(

      {next:(datos:any)=>{
        console.log(datos);
        
   if (datos.numdata > 0 ){ 
     datos.data.forEach((dato:Usuarios , index:number )=>{
       this.usuarios[index] = new UsuarioModel( dato );
     }) 
     console.log(this.usuarios);
   }else{
     this.usuarios = [];
   }

       this.artloading.hide()
     } , error: error => {this.artloading.hide();
      console.log(error)
      Swal.fire(
          'ERROR',error.error.error,
          'error');
    }}
        
      
      );
  }
  setAgregarCajas(usuario:Usuarios){
    this.newUsuarioDialog.open(UsuarioDetalleComponent,{data:usuario})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
      if (confirmado){
      this.getUsuarios()  
    }
    })
  }
  setActualizaUsuario(usuario:Usuarios){
    this.newUsuarioDialog.open(UsuarioEditarComponent,{data:usuario})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
      if (confirmado){
      this.getUsuarios()  
    }
    })
  }

}
