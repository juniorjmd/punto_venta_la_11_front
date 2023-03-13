import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { vwsucursal } from 'src/app/models/app.db.interfaces';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { DatosInicialesService } from 'src/app/services/datos-iniciales.service';
import { LoginService } from 'src/app/services/login.service';
import { SincOdooService } from '../../services/sinc-odoo.service';
import { CambioPassComponent } from './cambio-pass/cambio-pass.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  faUser = faUser ;
faEnvelope = faEnvelope ;
 usuario!: UsuarioModel;
 sucursal:vwsucursal[]=[]; 
 valSincronizar =  localStorage.getItem('E9PZJrrrRy5UVx7oqf+s9E0buds=')! ; 
 constructor(private _datosInicialesService : DatosInicialesService, private loginDialog : MatDialog ,
   private _loginService: LoginService,private _sincService :SincOdooService,
   private _Router : Router) {    
     localStorage.clear();
this.inicioLogin();
  }
  
  cambiarClaveUsuario( usuario:UsuarioModel){
  console.log('nuevo usuario');
  usuario.Login = this.usuario.Login;
    this.loginDialog.open(CambioPassComponent,{data:{usuario , sucursal : this.sucursal}})
  .afterClosed()
  .subscribe(( confirmado:boolean   )=>{
    if ( confirmado){  
      this._Router.navigate(['home']);
  }
  })
  }


  async inicioLogin(){
    await this.validaGenearActualizacion();
    this._datosInicialesService.getDatosIniSucursal(this.valSincronizar).subscribe(
      { next : (data:any)=>{  this.sucursal = data.sucursal; 
       console.log(data);
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

  async validaGenearActualizacion(){
    try { 
      const retornoEsta   = await this._sincService.validaGenearActualizacion()
         console.log(retornoEsta); 
   
     if (retornoEsta.error == 'ok'){ 
      if(retornoEsta.numdata > 0 ){
        localStorage.setItem('E9PZJrrrRy5UVx7oqf+s9E0buds=',retornoEsta.data[0].llave);
        this.valSincronizar =  localStorage.getItem('E9PZJrrrRy5UVx7oqf+s9E0buds=')! ; 
      }else{
          this._Router.navigate(['sincronizar']);
        }
  
   }else{
    alert(retornoEsta.error);
    
   }
    } catch (error:any) {
      console.log(error); 
    }
    
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
         
           if(datos.data.usuario.change_pass > 0){ 
             this._Router.navigate(['home']);
            }
           else{
            this.cambiarClaveUsuario(datos.data.usuario);
         }
       
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
