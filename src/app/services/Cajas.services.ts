import { Injectable } from '@angular/core';  
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { HttpClient } from '@angular/common/http';
import { PROCEDURE, TABLA } from '../models/app.db.tables';  
import { cajaModel } from '../models/cajas.model'; 
import { TiposEstablecimientosModel } from '../models/tipos-establecimientos.model';
import { Establecimientos } from '../interfaces/establecimientos.interface';
import { Contador } from '../interfaces/contador';
import { MediosDePagoModel } from '../models/medios-de-pago.model';
import { DocpagosModel } from '../models/pagos.model';
import { select } from '../interfaces/generales';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class cajasServices { 
    requestOptions:any
       constructor(private http: HttpClient,
        private _Router : Router){ 
        let llaveDeRegistro =   localStorage.getItem('sis41254#2@')  ; 
        if (!llaveDeRegistro){
              this._Router.navigate(['login']);
        }

        let valSincronizar =  parseInt(localStorage.getItem('E9PZJrrrRy5UVx7oqf+s9E0buds=')!) ; 
      if (!valSincronizar){
      //  this._Router.navigate(['sincronizar']);
      }
        console.log('servicios cajas inicializado');  
        const headers = httpOptions() ;
        this.requestOptions = { headers: headers };
         
    }
    
    abrirCaja(caja : cajaModel,  valorIngresar : number){
        let datos = {"action": actions.actionAbrirCaja ,
                     "_parametro" : {"idCaja" : caja.id } , 
                     "_valorIngresar" : valorIngresar
                    };
        console.log('abrirCaja activo ' ,url.create , datos,this.requestOptions);
        return this.http.post<select>(url.create , datos,this.requestOptions) ;
    }

    
    resumenCaja(caja : cajaModel){
        let datos = {"action": actions.actionResumenCaja ,
                     "_parametro" : {"idCaja" : caja.id }  
                    };
        console.log('resumenCaja activo ' ,url.get , datos, this.requestOptions);
        return this.http.post(url.get , datos,this.requestOptions) ;
    }
    cerrarCaja(caja : cajaModel){
        let datos = {"action": actions.actionCerarCaja ,
                     "_parametro" : {"idCaja" : caja.id } 
                    };
        console.log('cerrarCaja activo ' ,url.create , datos,this.requestOptions);
        return this.http.post(url.create , datos, this.requestOptions) ;
    }

    cerrarCajaParcial(caja : cajaModel){
        let datos = {"action": actions.actionCerarCajaParcial ,
                     "_parametro" : {"idCaja" : caja.id } 
                    };
        console.log('cerrarCaja activo ' ,url.create , datos, this.requestOptions);
        return this.http.post(url.create , datos, this.requestOptions) ;
    }
    
    getTiposDocumentosConContadores(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.tipos_documentos_con_cont,
                     "_where" : [{columna : 'estado' , tipocomp : '=' , dato : 1}]
                    };
        console.log('servicios cajas - getTiposDocumentosConContadores ' ,url.get , datos, this.requestOptions);
        return this.http.post(url.get , datos, this.requestOptions) ;
    }

    getEstablecimientos(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.establecimiento,
                     "_where" : [{columna : 'estado' , tipocomp : '=' , dato : 1}]
                    };
        console.log('servicios cajas - getEstablecimientos ' ,url.get , datos,this.requestOptions);
        return this.http.post(url.get , datos,this.requestOptions) ;
    }
    getAllEstablecimientos(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.establecimiento
                    };
        console.log('servicios cajas - getAllEstablecimientos ' ,url.get , datos,this.requestOptions);
        return this.http.post(url.get , datos,this.requestOptions) ;
    }
    
    getAllTiposEstablecimientos(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.tipo_establecimiento 
                    };
        console.log('servicios cajas - get vw_tipo_establecimiento ' ,url.get , datos,this.requestOptions);
        return this.http.post(url.get , datos,this.requestOptions) ;
    }

    getLocacionesExternas(){
        let datos = {"action": actions.actionBuscarLocacionesExternas  };
        console.log('servicios cajas - getLocacionesExternas ' ,url.getOdoo , datos,this.requestOptions);
        return this.http.post(url.getOdoo , datos,this.requestOptions) ;
    }
    getLocacionesPrincipales(){
        let datos = {"action": actions.actionBuscarLocacionesExternas  ,
        "_principal" : true
                    };
        console.log('servicios cajas - getLocacionesPrincipales ' ,url.getOdoo , datos,this.requestOptions);
        return this.http.post(url.getOdoo , datos,this.requestOptions) ;
    }
    getLocacionesVirtuales(){
        let datos = {"action": actions.actionBuscarLocacionesExternas  ,
        "_virtual" : true
                    };
        console.log('servicios cajas - getLocacionesVirtuales ' ,url.getOdoo , datos,this.requestOptions);
        return this.http.post(url.getOdoo , datos,this.requestOptions) ;
    }
    getLocacionesFisicas(){
        let datos = {"action": actions.actionBuscarLocacionesExternas  ,
        "_fisicas" : true
                    };
        console.log('servicios cajas - getLocacionesFisicas ' ,url.getOdoo , datos,this.requestOptions);
        return this.http.post<select>(url.getOdoo , datos,this.requestOptions) ;
    }
    getLocacionesExistencias(id:number){
        let datos = {"action": actions.actionBuscarLocacionesExternas  ,
        "_principal" : false,"_fisicas" : false,"_existencia" : true,
             "_id_principal" : id
             };
        console.log('servicios cajas - getLocacionesExistencias ' ,url.getOdoo , datos,this.requestOptions);
        return this.http.post(url.getOdoo , datos,this.requestOptions) ;
    }
    getLocacionesSecundarias(id:number){
        let datos = {"action": actions.actionBuscarLocacionesExternas  ,
        "_principal" : false,"_fisicas" : false,
             "_id_principal" : id
             };
        console.log('servicios cajas - getLocacionesSecundarias ' ,url.getOdoo , datos,this.requestOptions);
        return this.http.post(url.getOdoo , datos,this.requestOptions) ;
    }
    getTiposEstablecimientos(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.tipo_establecimiento,
                     "_where" : [{columna : 'estado' , tipocomp : '=' , dato : 1}]
                    };
        console.log('servicios cajas - get vw_tipo_establecimiento ' ,url.get , datos,this.requestOptions);
        return this.http.post(url.get , datos,this.requestOptions) ;
    }
    getCajas(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.cajas
                    };
        console.log('servicios de cajas activo ' ,url.get , datos,this.requestOptions);
        return this.http.post(url.get , datos,this.requestOptions) ;
    } 
    getCaja(cajaId : number){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.cajas,
                     "_where" : [{columna : 'id' , tipocomp : '=' , dato : cajaId}]
                    };
        console.log('servicios de cajas activo ' ,url.get , datos,this.requestOptions);
        return this.http.post(url.get , datos,this.requestOptions) ;
    }  
    
    getMediosCajaActivaReferenciaDoc(referencia:string){
        let datos:any;
        if( referencia  !== 'LIBRANZA'){
          datos = {"action": actions.actionSelectPorUsuario ,
            "_tabla" : vistas.mediosPorCajaActiva,
            "_columnaUsuario": 'usuarioCaja',
            "_where" : [{columna : 'nombre' , tipocomp : '!=' , dato : 'libranza'}]
           };  
        }else{  datos = {"action": actions.actionSelectPorUsuario ,
        "_tabla" : vistas.mediosPorCajaActiva,
        "_columnaUsuario": 'usuarioCaja'
       };}
       
        console.log('servicios de cajas activo ' ,url.get , datos,this.requestOptions);
        return this.http.post(url.get , datos,this.requestOptions) ;
    } 
    getMediosCajaActiva(){
        let datos = {"action": actions.actionSelectPorUsuario ,
                     "_tabla" : vistas.mediosPorCajaActiva,
                     "_columnaUsuario": 'usuarioCaja'
                    };
        console.log('servicios de cajas activo ' ,url.get , datos,this.requestOptions);
        return this.http.post(url.get , datos,this.requestOptions) ;
    } 
    getMedios(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.medios
                    };
        console.log('servicios de cajas activo ' ,url.get , datos,this.requestOptions);
        return this.http.post(url.get , datos,this.requestOptions) ;
    } 
    getContadores(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.contadores
                    };
        console.log('servicios de cajas activo ' ,url.get , datos,this.requestOptions);
        return this.http.post(url.get , datos,this.requestOptions) ;
    } 
    getCajasUsuario(){
        let datos = {"action": actions.actionSelectPorUsuario ,
                     "_tabla" : vistas.cajas_por_usuario,
                     "_columnaUsuario": 'idUsuario',
                     "_where" : [{columna : 'estadoEsta' , tipocomp : '=' , dato : 1}]
                    };
        console.log('servicios de cajas activo ' ,url.get , datos,this.requestOptions);
        return this.http.post(url.get , datos,this.requestOptions) ;
    } 
    
    getCajasPorUsuario(usuario:number){
        let datos = {"action": actions.actionSelCajaXuser ,
                     "_usuario" :usuario
                    };
        console.log('servicios de cajas activo - getCajasPorUsuario' ,'ACTION ' + url.get , 
        'DATOS '+JSON.stringify( datos),'requestOptions ' +JSON.stringify(this.requestOptions));
        return this.http.post(url.get , datos,this.requestOptions) ;
    } 

    setPagoDocumento(idDocumento:number , pagos:DocpagosModel[] ){
        let datos = {"action": actions.actionAsignarDocumentosPagos ,
        "_ordenDocumento" : idDocumento, 
         "_pagos" : pagos
       };
       console.log('setPagoDocumento',url.create , datos,this.requestOptions)
        return this.http.post(url.create , datos,this.requestOptions) ;
    }
    setCajasAUsuarios(idUsuario:number , cajas:number[] ){
        let datos = {"action": actions.actionAsignarCajas ,
        "_idUsuario" : idUsuario, 
         "_cajas" : cajas
       };
       console.log('setCajasAUsuarios',url.create , datos,this.requestOptions)
        return this.http.post(url.create , datos,this.requestOptions) ;
    }
    setCaja(caja:cajaModel){
        let datos ;
        let  arraydatos ;
        if (caja.id > 0 ){
            let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : caja.id }]
            arraydatos =  {  "nombre" : caja.nombre  ,
            "descripcion" : caja.descripcion,
            "estadoGeneral" : caja.estadoGeneral,
            "estadoCaja" : caja.estadoCaja ,
            "fechaEstadoGeneral" : caja.fechaEstadoGeneral,
            "fechaEstadoCaja" : caja.fechaEstadoCaja ,
            "usuarioEstadoCaja" : caja.usuarioEstadoCaja,
            "usuarioEstadoGeneral" : caja.usuarioEstadoGeneral,
            "establecimiento" : caja.establecimiento};
            
            datos = {"action": actions.actionUpdate ,
            "_tabla" : TABLA.caja, "_where" : where ,
            "_arraydatos" : arraydatos
           };
        }
        else{
            arraydatos =  { "id" : caja.id  ,
            "nombre" : caja.nombre  ,
            "descripcion" : caja.descripcion,
            "estadoGeneral" : caja.estadoGeneral,
            "estadoCaja" : caja.estadoCaja ,
            "fechaEstadoGeneral" : caja.fechaEstadoGeneral,
            "fechaEstadoCaja" : caja.fechaEstadoCaja ,
            "usuarioEstadoCaja" : caja.usuarioEstadoCaja,
            "usuarioEstadoGeneral" : caja.usuarioEstadoGeneral}
            datos = {"action": actions.actionInsert ,
            "_tabla" : TABLA.caja,
            "_arraydatos" : arraydatos
           };
        } 
        
       console.log(datos);
       
        return this.http.post(url.create , datos,this.requestOptions) ;
        

        
    }
    setConsecutivo(contador:Contador){
        let datos ;
        let  arraydatos ;
        if (typeof(contador.desde ) === 'undefined' ) 
        contador.desde = 0;

        if (typeof(contador.hasta ) === 'undefined' ) 
        contador.hasta = 0;
 
            arraydatos =  {  
            "codContador" : contador.codContador  ,
            "establecimiento" : contador.establecimiento,
            "tipoContador" : contador.tipoContador ,
            "desde" : contador.desde ,
            "hasta" : contador.hasta ,
            "USUARIO_LOGUEADO" : '0',
        }
            datos = {"action": actions.actionProcedure ,
            "_procedure" : PROCEDURE.insertaContador,
            "_arraydatos" : arraydatos
           };
          
        
       console.log(JSON.stringify( datos ));
       
        return this.http.post(url.create , datos,this.requestOptions) ;
        

        
    }

    
    setTipoEstablecimiento(newEsta:TiposEstablecimientosModel){
        let datos ;
        let  arraydatos ;
        if (newEsta.estado === 0) newEsta.estado = 1;
        //id, nombre, descripcion, tipo, fecha_creacion, usuario_creacion, estado
        if (newEsta.id > 0 ){
            let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : newEsta.id }]
            arraydatos =  {  "nombre" : newEsta.nombre  ,
            "descripcion" : newEsta.descripcion,
            "estado" : newEsta.estado ,
            "usuario_creador" : 'USUARIO_LOGUEADO' };
            
            datos = {"action": actions.actionUpdate ,
            "_tabla" : TABLA.tipoEstablecimiento, "_where" : where ,
            "_arraydatos" : arraydatos
           };
        }
        else{
            arraydatos =  { "id" : newEsta.id  , 
			"nombre" : newEsta.nombre  ,
            "descripcion" : newEsta.descripcion,
            "estado" : newEsta.estado ,
            "usuario_creador" : 'USUARIO_LOGUEADO' }
            datos = {"action": actions.actionInsert ,
            "_tabla" : TABLA.tipoEstablecimiento,
            "_arraydatos" : arraydatos
           };
        } 
        
       console.log(datos);
       
        return this.http.post(url.create , datos,this.requestOptions) ;
        

        
    }
    setEstablecimiento(newEsta:Establecimientos){
        let datos ;
        let  arraydatos ;
        //id, nombre, descripcion, tipo, fecha_creacion, usuario_creacion, estado
        if (newEsta.id > 0 ){
            let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : newEsta.id }]
            arraydatos =  {  "nombre" : newEsta.nombre  ,
            "descripcion" : newEsta.descripcion,
            "tipo" : newEsta.tipo,
            "estado" : newEsta.estado ,
            "idAuxiliar" : newEsta.idAuxiliar ,
            "idBodegaStock" : newEsta.idBodegaStock ,
            "idBodegaVitual" : newEsta.idBodegaVitual ,
            "nombreAuxiliar" : newEsta.nombreAuxiliar ,
            "NameBodegaStock" : newEsta.NameBodegaStock ,
            "NameBodegaVirtual" : newEsta.NameBodegaVirtual ,
        "usuario_creacion" : 'USUARIO_LOGUEADO' };
        
            
            datos = {"action": actions.actionUpdate ,
            "_tabla" : TABLA.establecimiento, "_where" : where ,
            "_arraydatos" : arraydatos
           };
        }
        else{
            arraydatos =  { "id" : newEsta.id  , 
			"nombre" : newEsta.nombre  ,
            "descripcion" : newEsta.descripcion,
            "tipo" : newEsta.tipo,
            "estado" : newEsta.estado ,
            "usuario_creacion" : 'USUARIO_LOGUEADO' }
            
            datos = {"action": actions.actionInsert ,
            "_tabla" : TABLA.establecimiento,
            "_arraydatos" : arraydatos
           };
        } 
        
       console.log(datos);
       
        return this.http.post(url.create , datos,this.requestOptions) ;
        

        
    }

/////////////////////////////////////////////////
setMedioDePago(newMedio:MediosDePagoModel){
    let datos ;
    let  arraydatos ;
    let  action ;
    let where = null;
    //id, nombre, descripcion, tipo, fecha_creacion, usuario_creacion, estado
    if (newMedio.id > 0 ){
          where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : newMedio.id }] ;
        action = actions.actionUpdate ;
    }
    else{ 
        action =  actions.actionInsert;
    } 
    arraydatos =  {  "nombre" : newMedio.nombre  ,
    "descripcion" : newMedio.descripcion, 
    "estado" : newMedio.estado , 
    "cuentaContable" : newMedio.cuentaContable ,
    "establecimiento" : newMedio.establecimiento  ,
    "usuario_creacion" : 'USUARIO_LOGUEADO' };
    datos = {"action":action ,
    "_tabla" : TABLA.medios, "_where" : where,
    "_arraydatos" : arraydatos
   };
   console.log(datos);
   
    return this.http.post(url.create , datos,this.requestOptions) ;
    

    
}
////////////////////////////////////////////////////////////

 PadLeft(value:string, length:number) : string {
    return (value.toString().length < length) ? this.PadLeft("0" + value, length) :  value;
}
  
 
      
}
 
