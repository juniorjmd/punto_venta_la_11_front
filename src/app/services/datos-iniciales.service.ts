import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { actions } from '../models/app.db.actions';
import { vwsucursal } from '../models/app.db.interfaces';
import { url } from '../models/app.db.url';

@Injectable({
  providedIn: 'root'
})
export class DatosInicialesService {
  private sucursal:vwsucursal[] = []  ;
  requestOptions:any
  constructor(private http: HttpClient){
    const headers = this.requestOptions ;
        this.requestOptions = { headers: headers };
  }

  getDatosIniSucursal(){
     
      let datos = {"action": actions.datosInicialesSucursal};
      console.log('servicios datos iniciales inicializado ' ,url.datosIniciales , datos, url.httpOptionsSinAutorizacion);
      return this.http.post(url.datosIniciales , datos, url.httpOptionsSinAutorizacion) ;
    
  }
}
