import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loading } from 'src/app/models/app.loading';
import { Usuarios } from '../interfaces/usuario.interface';
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
    constructor(private http: HttpClient ,
        private loading : loading ){ 
        console.log('servicios usuarios inicializado');  
        const headers = this.requestOptions ;
            this.requestOptions = { headers: headers };
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
            if (key !== 'ID'){
          arrayDatos[key] = usuario[key] ;
            
        }}
        console.log(arrayDatos);
        
        let datos = {"action": actions.actionInsert ,
                     "_tabla" : TABLA.usuarios,
                     "_arraydatos" : arrayDatos
                    };

        console.log('servicios de usuarios activo - getUsuarios' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
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
    updateUsuarios(usuario : any){
        let arrayDatos:any   ;
        let where:any[] = []
        for (let key in usuario){
            if (key !== 'perfil'){
            if (key !== 'ID'){
          arrayDatos[key] = usuario[key] ;
            
        }else{
            where=[{"columna" : key , "tipocomp" : '=' , "dato" : usuario[key]}];
        }}}
        console.log(arrayDatos);
        
        let datos = {"action": actions.actionUpdate ,
                     "_tabla" : TABLA.usuarios,
                     "_arraydatos" : arrayDatos,
                     "_where": where
                    };

        console.log('servicios de usuarios activo - getUsuarios' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }

}