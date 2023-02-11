import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select } from '../interfaces/generales';
import { actions } from '../models/app.db.actions';
import { vwsucursal } from '../models/app.db.interfaces';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';

@Injectable({
  providedIn: 'root'
})
export class DatosInicialesService {
  private sucursal:vwsucursal[] = []  ;
  requestOptions:any
  constructor(private http: HttpClient){
    const headers = httpOptions() ; ;
        this.requestOptions = { headers: headers };
  }

  getDatosIniSucursal(){
      let datos = {"action": actions.datosInicialesSucursal};
      console.log('servicios datos iniciales inicializado ' ,url.datosIniciales , datos, url.httpOptionsSinAutorizacion);
      return this.http.post(url.datosIniciales , datos, url.httpOptionsSinAutorizacion) ;
    
  }

getSucursalesPromesa(){
    let datos = {"action": actions.actionSelect , "_tabla" : 'vw_sucursales' };
    console.log('servicios datos get sucursales ' ,url.datosIniciales , datos, url.httpOptionsSinAutorizacion);
    return this.http.post(url.datosIniciales , datos, url.httpOptionsSinAutorizacion) ;  
}



getEstablecimientosSucursales(): Promise<select|any>{
  let datos = {"action": actions.actionSelect , 
               "_tabla" : vistas.establecimiento, 
               "_where" : [{columna : 'estado' , tipocomp : '=' , dato : 1}] };
  console.log('servicios datos getEstablecimientosSucursales ' ,url.datosIniciales , datos, url.httpOptionsSinAutorizacion);
  const retorno =  this.http.post<select>(url.datosIniciales, datos, url.httpOptionsSinAutorizacion).toPromise();
  return  retorno
}


getEstablecimientos(){
  let datos = {"action": actions.actionSelect ,
               "_tabla" : vistas.establecimiento,
               "_where" : [{columna : 'estado' , tipocomp : '=' , dato : 1}]
              };
  console.log('servicios cajas - getEstablecimientos ' ,url.datosIniciales , datos,this.requestOptions);
  return this.http.post(url.get , datos,this.requestOptions) ;
} 

}
