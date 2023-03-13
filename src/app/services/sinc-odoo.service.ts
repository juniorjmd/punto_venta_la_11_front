import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select } from '../interfaces/generales';
import { actions } from '../models/app.db.actions';
import { PROCEDURE } from '../models/app.db.tables';
import { httpOptions, url } from '../models/app.db.url';

@Injectable({
  providedIn: 'root'
})
export class SincOdooService {
  requestOptions:any
  constructor(private http: HttpClient){
    const headers = httpOptions() ; ;
        this.requestOptions = { headers: headers };
  }

  
  actualizarProductos(): Promise<select|any>{
    let datos = {"action": actions.actionActualizarProductosOdoo };
    console.log('servicios actualizar productos ' ,url.actionSincOdoo , datos, url.httpOptionsSinAutorizacion);
    const retorno =  this.http.post<select>(url.actionSincOdoo, datos, url.httpOptionsSinAutorizacion).toPromise();
    return  retorno
  } 

  actualizarTaxes(): Promise<select|any>{
    let datos = {"action": actions.actionActualizarTaxesOdoo };
    console.log('servicios actualizarTaxes ' ,url.actionSincOdoo , datos, url.httpOptionsSinAutorizacion);
    const retorno =  this.http.post<select>(url.actionSincOdoo, datos, url.httpOptionsSinAutorizacion).toPromise();
    return  retorno
  } 
  actualizarMarcas(): Promise<select|any>{
    let datos = {"action": actions.actionActualizarMarcasOdoo };
    console.log('servicios actualizarMarcas ' ,url.actionSincOdoo , datos, url.httpOptionsSinAutorizacion);
    const retorno =  this.http.post<select>(url.actionSincOdoo, datos, url.httpOptionsSinAutorizacion).toPromise();
    return  retorno
  } 
  actualizarClientes(): Promise<select|any>{
    let datos = {"action": actions.actionActualizarPersonasOdoo };
    console.log('servicios actualizarMarcas ' ,url.actionSincOdoo , datos, url.httpOptionsSinAutorizacion);
    const retorno =  this.http.post<select>(url.actionSincOdoo, datos, url.httpOptionsSinAutorizacion).toPromise();
    return  retorno
  } 
  actulizarTipIdClientes(): Promise<select|any>{
    let datos = {"action": actions.actionActualizarMarcasOdoo };
    console.log('servicios actualizarMarcas ' ,url.actionSincOdoo , datos, url.httpOptionsSinAutorizacion);
    const retorno =  this.http.post<select>(url.actionSincOdoo, datos, url.httpOptionsSinAutorizacion).toPromise();
    return  retorno
  } 
  finalizarActulizacion(): Promise<select|any>{
    let datos = {"action": actions.actionFinalizarActualizacion };
    console.log('servicios finalizarActulizacion ' ,url.actionSincOdoo , datos, url.httpOptionsSinAutorizacion);
    const retorno =  this.http.post<select>(url.actionSincOdoo, datos, url.httpOptionsSinAutorizacion).toPromise();
    return  retorno
  } 

  GenerarCGS(): Promise<select|any>{
    let datos = {"action": actions.actionGenerarCGS };
    console.log('servicios finalizarActulizacion ' ,url.actionSincOdoo , datos, url.httpOptionsSinAutorizacion);
    const retorno =  this.http.post<select>(url.actionSincOdoo, datos, url.httpOptionsSinAutorizacion).toPromise();
    return  retorno
  } 


  
  actualizarCategorias(): Promise<select|any>{
    let datos = {"action": actions.actionActualizarCategoriasOdoo };
    console.log('servicios actualizar categorias ' ,url.actionSincOdoo , datos, url.httpOptionsSinAutorizacion);
    const retorno =  this.http.post<select>(url.actionSincOdoo, datos, url.httpOptionsSinAutorizacion).toPromise();
    return  retorno
  } 
  actualizarExistencias(idBodega:number): Promise<select|any>{
    let datos = {"action": actions.actionActualizarBodegasOdoo , "id_bodega_stock_asignada" : idBodega};
    console.log('servicios actualizar existencias ' ,url.actionSincOdoo , datos, url.httpOptionsSinAutorizacion);
    const retorno =  this.http.post<select>(url.actionSincOdoo, datos, url.httpOptionsSinAutorizacion).toPromise();
    return  retorno
  } 

  validaGenearActualizacion(): Promise<select|any>{
    let datos = {"action": actions.actionSelect , "_tabla" : 'vw_sync_historico'  ,
    "_where" :  [{columna : 'estado' , tipocomp : '=' , dato : 'activa' }]};
    console.log('servicios datos validaGenearActualizacion ' ,url.actionSincOdoo , datos, url.httpOptionsSinAutorizacion);
    const retorno =  this.http.post<select>(url.actionSincOdoo, datos, url.httpOptionsSinAutorizacion).toPromise();
    return  retorno
  }  
  
  setearBanderaActualizacion(): Promise<select|any>{

    let arraydatos =  {   
      "_COD_FLAG" : 'FLAG_INICIO_ACTUALIZACION' 
  }
    let datos = {"action": actions.actionProcedure ,
    "_procedure" : PROCEDURE.setearBanderas,
    "_arraydatos" : arraydatos
   };

    console.log('servicios datos validaGenearActualizacion ' ,url.actionSincOdoo , datos, url.httpOptionsSinAutorizacion);
    const retorno =  this.http.post<select>(url.actionSincOdoo, datos, url.httpOptionsSinAutorizacion).toPromise();
    return  retorno
  }  

getSucursales(): Promise<select|any>{
  let datos = {"action": actions.actionSelect , "_tabla" : 'vw_sucursales' };
  console.log('servicios datos get sucursales ' ,url.actionSincOdoo , datos, url.httpOptionsSinAutorizacion);
  const retorno =  this.http.post<select>(url.actionSincOdoo, datos, url.httpOptionsSinAutorizacion).toPromise();
  return  retorno
}

getEstaSucursales(sucId:number): Promise<select|any>{
  let datos = {"action": actions.actionSelect , "_tabla" : 'vw_establecimiento'   ,
  "_where" : [{columna : 'idSucursal' , tipocomp : '=' , dato : 1}] };
  console.log('servicios datos get establecimientos por sucursales ' ,url.datosIniciales , datos, url.httpOptionsSinAutorizacion);
  const retorno =  this.http.post<select>(url.actionSincOdoo, datos, url.httpOptionsSinAutorizacion).toPromise();
  return  retorno
}
}
