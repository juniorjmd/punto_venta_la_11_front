import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { loading } from 'src/app/models/app.loading';
import { DocumentoListado } from '../interfaces/documento.interface';
import { impuesto, OdooPrd } from '../interfaces/odoo-prd';
import { Usuarios } from '../interfaces/usuario.interface';
import { actions } from '../models/app.db.actions';
import { TABLA } from '../models/app.db.tables';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { DocumentosModel } from '../models/documento.model';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  requestOptions:any;
  loading = new loading() 
  constructor(private http: HttpClient ,
    private _Router : Router){ 
      let llaveDeRegistro =  localStorage.getItem('sis41254#2@') ; 
      if (!llaveDeRegistro){
            this._Router.navigate(['login']);
      }
    console.log('servicios productos inicializado');  
    const headers = httpOptions() ; ;
        this.requestOptions = { headers: headers };
}
getTiposDeDocumentos(){
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.tiposDeDocumentos
              };
  console.log('servicios de usuarios activo - getCategorias' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
} 
getCategorias(){
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.categorias
              };
  console.log('servicios de usuarios activo - getCategorias' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
} 
/*buscar producto por codigo de barra validando la existencia */
/*
getProductosCodBarrasVCnt(codPrd:string){
  let datos = {"action": actions.buscarProducto ,
      "_limit" : 1 , "_codBarra" : true , "_data" : codPrd ,  "_validar_existencia" : true ,
        "_sin_parceros" : true
              };
  console.log('servicios getProductosCodBarrasVCnt' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
} 
 
*/
getProductosCodBarrasVCnt(codPrd:string  ){
  let datos = {"action": actions.actionSelect ,
      "_limit" : 100 ,  
      "_tabla" : vistas.prd_product_con_existencia,
      "_where" : [{columna : 'barcode' , tipocomp : '=' , dato : codPrd} ]
              };
  console.log('servicios getProductosPorCategoria' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
} 


getProductosPorCategoria(codCategoria:number){
  let datos = {"action": actions.actionSelect ,
      "_limit" : 100 ,  
      "_tabla" : vistas.aux_prd_product,
      "_where" : [{columna : 'categ_id' , tipocomp : '=' , dato : codCategoria} ]
              };
  console.log('servicios getProductosPorCategoria' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
} 
 
getProductosGeneral(limit:number){
  let  datos   = {"action": actions.actionSelect ,
  "_limit" : limit ,   "_tabla" : vistas.aux_prd_product     };
  
  console.log('servicios getProductosGeneral' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
} 


getProductosPorMarca(codMarca:number){
  let datos = {"action": actions.actionSelect ,
      "_limit" : 100 ,  
      "_tabla" : vistas.aux_prd_product,
      "_where" : [{columna : 'x_studio_marca' , tipocomp : '=' , dato : codMarca} ]};
  console.log('servicios getProductosPorMarca' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
} 


getProductosPorNombre(limit:number , texto:string){
  let datos = {"action": actions.actionSelect ,
  "_limit" : limit ,  
  "_tabla" : vistas.aux_prd_product,
  "_where" : [{columna : 'display_name' , tipocomp : 'like' , dato : texto} ]};
  console.log('servicios getProductosPorMarca' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
} 
//actionStockMoveDevolucion

guardarPrdCompra(producto : OdooPrd ,documento:DocumentosModel){
let impuestos:number = (producto.impuestos)? producto.impuestos[0].amount:0                                                          ;

  let datos = {"action": actions.actionStockMove , 
  "_precio_brt_prd" : producto.lst_price    , 
  "_iva_porc" : impuestos ,
   "_precio_siniva_prd" : producto.precio_sin_iva    ,
   "_precio_iva_prd" : producto.valor_del_iva  , 
   "_cantidad" : producto.cantidadVendida ,
   "_descuento" : producto.descuento ,
    "_cod_prd" :   producto.id ,
    "_id_bodega" : producto.codigoExistencia,
    '_orden' : documento.orden, 
    '_idStockOdooPOS' : documento.idStockOdooPOS,
    '_idStockOdooVtl' : documento.idStockOdooVtl,

};
  console.log('servicios guardarPrdCompra' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
}


devolverPrdCompra(producto : DocumentoListado){

  let datos = {"action": actions.actionStockMoveDevolucion , 
  "_precio_brt_prd" : producto.presioVenta    , 
  "_iva_porc" : producto.porcent_iva  ,
   "_precio_siniva_prd" : producto.presioSinIVa    ,
   "_precio_iva_prd" : producto.IVA  , 
   "_cantidad" : producto.cant_real_descontada ,
   "_descuento" : producto.descuento ,
   "_cod_linea" :   producto.id ,
   "_cod_prd" :   producto.idProducto 
};
  console.log('servicios getProductosCodBarrasVCnt' ,url.action , datos,this.requestOptions);
  return this.http.post(url.action , datos,this.requestOptions) ;
}
}

