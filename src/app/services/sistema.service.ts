import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '../interfaces/generales';
import { actions } from '../models/app.db.actions';
import { TABLA } from '../models/app.db.tables';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { loading } from '../models/app.loading';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {
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
  validarCGS(cgs:string): Promise<select|any>{
    let datos = {"action": actions.actionSelect ,
                 "_tabla" : TABLA.cgs,
                 "_where" : [{columna : 'codigo' , tipocomp : '=' , dato : cgs.toUpperCase()} ]
                };
    console.log('servicios del sistema - getUsuarios' ,url.get , datos,this.requestOptions);
    return this.http.post(url.get , datos,this.requestOptions).toPromise() ;
} 

actualizarCategorias(): Promise<select|any>{
  let datos = {"action": actions.actionActualizarCategoriasOdoo };
  console.log('servicios actualizar categorias ' ,url.actionSincOdoo , datos, url.httpOptionsSinAutorizacion);
  const retorno =  this.http.post<select>(url.actionSincOdoo, datos, url.httpOptionsSinAutorizacion).toPromise();
  return  retorno
} 


}
