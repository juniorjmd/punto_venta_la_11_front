import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { loading } from 'src/app/models/app.loading';
import { cajaModel } from '../models/cajas.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  requestOptions:any;
  loading = new loading(); 
  constructor(private http: HttpClient ,
      private _Router : Router){ 
      let llaveDeRegistro =  parseInt(localStorage.getItem('sis41254#2@')!) ; 
      if (!llaveDeRegistro){
            this._Router.navigate(['login']);
      }
      console.log('servicio documentos');
      const headers = httpOptions() ; ;
      this.requestOptions = { headers: headers };
      
    }

  getDocumentoActivo(){
    let datos = {"action": actions.actionSelectPorUsuario ,
                 "_tabla" : vistas.documento,
                 "_columnas" : ['objeto'], 
                 "_columnaUsuario" : 'usuario',
                 "_where": [{"columna" : 'estado' , "tipocomp" : '=' , "dato" : 1}]
                };
    console.log('servicios de usuarios activo - getDocumentoActivo' ,url.action , datos,this.requestOptions);
    return this.http.post(url.action , datos,this.requestOptions) ;
} 

getDocumentos(){
  let where = [{"columna" : 'tipoDocumentoFinal' , "tipocomp" : '=' , "dato" : 1}]; 
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.documento,
               "_columnas" : ['objeto'], 
               "_obj" : ['objeto'], 
               "_columnaUsuario" : 'usuario',
               "_where":where
              };
  console.log('servicios de usuarios activo - getDocumentos' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
} 

getDocumentosUsuario(){
  let where = [{"columna" : 'tipoDocumentoFinal' , "tipocomp" : '=' , "dato" : 1}]; 
  let datos = {"action": actions.actionSelectPorUsuario ,
               "_tabla" : vistas.documento,
               "_columnas" : ['objeto'], 
               "_obj" : ['objeto'], 
               "_columnaUsuario" : 'usuario',
               "_where":where
              };
  console.log('servicios de usuarios activo - getDocumentos' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
} 

getCajasActivas(establecimiento:number){
  let where = [{"columna" : 'establecimiento' , "tipocomp" : '=' , "dato" : establecimiento}]; 
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.cajasActivas, 
               "_where":where
              };
  console.log('servicios de documentos - getCajasActivas' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
} 
getDocumentosUsuarioCaja( ){
  let where = [{"columna" : 'tipoDocumentoFinal' , "tipocomp" : '=' , "dato" : 1}]; 
  let datos = {"action": actions.actionSelectPorUsuario ,
               "_tabla" : vistas.documento, 
               "_columnas" : ['objeto'], 
               "_obj" : ['objeto'], 
               "_columnaUsuario" : 'usuario',
               "_where":where,
               "_datoUsuario" : {"columna" : 'caja' ,
               "tabla" : 'cajas' ,
               "nomColDato" : 'id' ,
               "datoWere" : [{"columna" : 'estadoCaja' , "tipocomp" : '=' , "dato" : 1},
               {"columna" : 'usuarioEstadoCaja' , "tipocomp" : '=' , "dato" : 'USUARIO_ACTIVO'}]
               }  };

              /* select  id into _esta ,_caja from  cajas where  
	   estadoCaja = 1 and 
	   usuarioEstadoCaja = _usuario*/
  console.log('servicios de usuarios activo - getDocumentosUsuarioCaja' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
} 


cambiarDocumento(documento:number){
  let datos = {"action": actions.actionChangeDocumentos , "_docActual" : documento }
  console.log('cambiarDocumento activo ' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
}


cancelarDocumento(documento:number){
  let datos = {"action": actions.actionCancelarDocumentos , "_documento" : documento }
  console.log('cancelarDocumento activo ' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
}
generarDomicilioDocumento(documento:number){
  let datos = {"action": actions.actionCambiarDocADomicilio , "_documento" : documento }
  console.log('actionCambiarDocADomicilio ' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
}
cerrarDocumento(documento:number){
 /* {"action": "CREAR_STOCK_PICKING_FINAL"   ,
"_documento" : 17
 }*/
  let datos = {"action": actions.actionCerarDocumentos ,
  "_documento" : documento }
  console.log('crearDocumento activo ' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
}
//actionCambioCajaDocumento
crearDocumento(){
  let datos = {"action": actions.actionCrearDocumentos }
  console.log('crearDocumento activo ' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
}

cambiarDocumentoDeCaja(caja:cajaModel){
  let datos = {"action": actions.actionCambioCajaDocumento, "datos" : caja}
  console.log('crearDocumento activo ' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
}
}
