import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cartera } from '../interfaces/cartera';
import { select } from '../interfaces/generales';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { LibranzaModule } from '../models/libranza/libranza.module';

@Injectable({
  providedIn: 'root'
})
export class LibranzasService {
  requestOptions:any;
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
guardarPagos(carteraAPagar:Cartera[] ,  id_documento : number){


    let datos = {"action": actions.actionIngresarPagosLibranza ,"_id_documento" : id_documento , "_carteras" : carteraAPagar  };
    console.log('guardarPagos ' ,url.create , datos,this.requestOptions);
    return this.http.post<select>(url.create , datos,this.requestOptions) ;
}
buscarCarteraPPPorCedula(  dato:number ){
    let datos = {"action": actions.actionSelect   ,
              "_tabla" : vistas.adm_cartera_con_pagos,
    "_where" : [{columna : 'vat' , tipocomp : '=' , dato  }, {columna : 'TotalActual' , tipocomp : '>' , dato  : 0 }]
                };
    console.log('buscarCarteraPorCedula ' ,url.get , datos,this.requestOptions);
    return this.http.post<select>(url.get , datos,this.requestOptions) ;
}
}
