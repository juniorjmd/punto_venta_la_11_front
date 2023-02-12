import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select } from '../interfaces/generales';
import { actions } from '../models/app.db.actions';
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
    console.log('servicios actualizar categorias ' ,url.actionSincOdoo , datos, url.httpOptionsSinAutorizacion);
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
