import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { vwsucursal } from 'src/app/models/app.db.interfaces';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { DatosInicialesService } from 'src/app/services/datos-iniciales.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
 usuario:UsuarioModel = {
   ID: 0,
   Login: '',
   Nombre1: '',
   Nombre2: '',
   Apellido1: '',
   Apellido2: '',
   nombreCompleto: '',
   estado: 0,
   usr_registro: 0,
   Fecha_Registro: '',
   Usr_Modif: 0,
   Fecha_Modif: '',
   pass: '',
   change_pass: 0,
   ultimo_ingreso: '',
   mail: ''
 }
 sucursal:vwsucursal[]=[]; 
 valSincronizar =  localStorage.getItem('E9PZJrrrRy5UVx7oqf+s9E0buds=')! ; 
 constructor(private _datosInicialesService : DatosInicialesService,
   private _loginService: LoginService,
   private _Router : Router) {


    
     localStorage.clear();
     if (!this.valSincronizar){
      this._Router.navigate(['sincronizar']);
     }else{localStorage.setItem('E9PZJrrrRy5UVx7oqf+s9E0buds=',this.valSincronizar)}


   this._datosInicialesService.getDatosIniSucursal(this.valSincronizar).subscribe(
   { next : (data:any)=>{  this.sucursal = data.sucursal; 
     
    if( !data.datosActualizacion || data.datosActualizacion.estado !=="activa") {
      this._Router.navigate(['sincronizar']);
     }
          }  ,
    error :  (err:any )=> {console.log(err)
     alert( err.error.error)
   }
  }
     );  




  }

 ngOnInit(): void { 
 this.usuario =  new UsuarioModel(this.usuario);
 this.usuario.Login = 'ADMIN';
 this.usuario.pass = 'prom2001josdom';

   
 } 
 login( form: NgForm){
  if(form.invalid){return;}
   console.log(`usuario ${this.usuario.Login} y pass ${this.usuario.pass}`)
  // let usuario:Usuario;

   this._loginService.getLogin(this.usuario.Login , this.usuario.pass).subscribe(
    { next :   (datos:any)=>{ 
       if(datos.data.usuario.length === 0){
         
         console.log('getLogin * sin datos',datos.data.usuario); 
         alert('error de usuario')
       }else{
         console.log('getLogin',datos.data.usuario);  
         localStorage.setItem('sis41254#2@', datos.data.usuario.key_registro );
         localStorage.setItem('#2@56YH7H82BF', datos.data.usuario.id );
         this._Router.navigate(['home']);
       }
     
   } ,
   error : (err:any) => {console.log(err)
     alert( err.error.error)
   }
    }  ); 
   
 }
  myFunction(x: any) { 
   if (x.type === "password") {
       x.type = "text";
   } else {
       x.type = "password";
   }
}

}
