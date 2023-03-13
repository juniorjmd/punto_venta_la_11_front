import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';

@Injectable({
  providedIn: 'root'
})
export class CortesDeCajaService {

  requestOptions:any;
  constructor(private http: HttpClient ,
    private _Router : Router ) { 
    let llaveDeRegistro =  localStorage.getItem('sis41254#2@') ; 
    if (!llaveDeRegistro){
          this._Router.navigate(['login']);
    }
console.log('servicios datos iniciales inicializado');   

const headers = httpOptions() ; ;
this.requestOptions = { headers: headers };}

  
  getCierresTotalesYparciales(){
    let datos = {"action": actions.actionSelects  ,
                // "_tabla" : vistas.cajasActivas       
                 "_tablas" : [vistas.corte_de_caja ,vistas.corte_de_caja_parcial ,vistas.corte_de_caja_pagos ]             
                };
    console.log('servicios de cierres getCierresTotalesYparciales' ,url.action , datos, httpOptions());
    return this.http.post(url.action , datos, this.requestOptions) ;
} 

  
getProductosPorCierres(id:number){
  let datos = {"action": actions.actionSelect  ,
              "_tabla" : vistas.documentos_listado_productos_por_cierre  ,              
              "_where" : [{columna : 'id_cierre_caja' , tipocomp : '=' , dato : id}]     
                //"_tablas" : [vistas.corte_de_caja ,vistas.corte_de_caja_parcial ,vistas.corte_de_caja_pagos ]             
              };
  console.log('servicios de cierres getCierresTotalesYparciales' ,url.action , datos, httpOptions());
  return this.http.post(url.action , datos  ,this.requestOptions) ;
} 
}
