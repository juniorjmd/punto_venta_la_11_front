import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { loading } from 'src/app/models/app.loading';
import { Usuarios, Usuario } from '../interfaces/usuario.interface';
import { actions } from '../models/app.db.actions';
import { TABLA } from '../models/app.db.tables';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class usuarioService {
    requestOptions:any
    loading = new loading();
    constructor(private http: HttpClient ,
        private _Router : Router){ 
            let llaveDeRegistro =  localStorage.getItem('sis41254#2@') ; 
            if (!llaveDeRegistro){
                  this._Router.navigate(['login']);
            }
        console.log('servicios usuarios inicializado');  
        const headers = httpOptions() ; ;
            this.requestOptions = { headers: headers };
    }
    getPersonasDisponibles(){ 
        let datos = {"action": actions.actionSelect ,
    "_tabla" : vistas.personas_disponibles_para_usuarios
   };
console.log('servicios de usuarios activo - getUsuarios' ,url.action , datos,this.requestOptions);
return this.http.post(url.action , datos,this.requestOptions) ;
}

  getPersonasDisponiblesLibranza(){ 
        let datos = {"action": actions.actionSelect ,
    "_tabla" : vistas.personas_disponibles_para_libranza
   };
console.log('servicios de usuarios activo - getUsuarios' ,url.action , datos,this.requestOptions);
return this.http.post(url.get , datos,this.requestOptions) ;
}


    getPerfiles(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : TABLA.perfiles
                    };
        console.log('servicios de usuarios activo - getUsuarios' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    } 
    getUsuarios(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.usuario
                    };
        console.log('servicios de usuarios activo - getUsuarios' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    } 

    guardarUsuarios(usuario :any){
        let arrayDatos:any=new Object()  ;
        for (let key in usuario){
            if (key !== 'ID' && key !== 'mail' ){
          arrayDatos[key] = usuario[key] ;
            
        }}
        console.log(arrayDatos);
        
        let datos = {"action": actions.actionInsert ,
                     "_tabla" : TABLA.usuarios,
                     "_arraydatos" : arrayDatos,
                    };

        console.log('servicios de usuarios activo - getUsuarios' ,url.action , datos,this.requestOptions);
        return this.http.post(url.create , datos,this.requestOptions) ;
    }
    guardarUsuarioPerfil(usuario : UsuarioModel ,  perfil:number){
      
        let datos = {"action": actions.actionInsertPerfilUsuario  ,
        "_parametro" : { 
            "perfil" : perfil ,
            "usuario" : usuario.ID
        }
       };

        console.log('servicios de usuarios activo - guardarUsuarioPerfil' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }

    cambiarContraseña(Usuario:UsuarioModel){
        
        /**  if ( trim($_qazxswe) === '' or !isset($_qazxswe) or  
         trim($_wsxedc) === '' or !isset ($_wsxedc) or       
         trim($_kjhgtyuhybv) === '' or !isset($_kjhgtyuhybv) ) */
        let datos = {"action": actions.actionCambioPass ,
                     "_qazxswe" : Usuario.Login,
                     "_wsxedc" : Usuario.passNew,
                     "_kjhgtyuhybv": Usuario.passNewConfirm
                    };

        console.log('servicios de usuarios activo - cambiarContraseña' ,url.create , datos,this.requestOptions);
        return this.http.post(url.create , datos,this.requestOptions) ;
    }
    updateUsuarios(usuario : any){
        let arrayDatos:any = {} ;
        let where:any[] = []
       

    for (const [key, valor] of Object.entries(usuario)) {
        
        if (key !== 'perfil' && key !== 'mail' && key !== 'idPersona'){
            if (key !== 'ID'){
          arrayDatos[key] = valor;
            
        }else{
            where=[{"columna" : key , "tipocomp" : '=' , "dato" : valor}];
        }
    }
    }
        console.log('arrayDatos', arrayDatos[0]);
        
        let datos = {"action": actions.actionUpdate ,
                     "_tabla" : TABLA.usuarios,
                     "_arraydatos" : arrayDatos,
                     "_where": where
                    };

        console.log('servicios de usuarios activo - getUsuarios' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }

}