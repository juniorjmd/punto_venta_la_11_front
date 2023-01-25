import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';

@Injectable({
  providedIn: 'root'
})
export class DomiciliosService { 
  requestOptions:any
  constructor(private http: HttpClient ) {  
    const headers = this.requestOptions ;
        this.requestOptions = { headers: headers };
  }
  
  getListadosDomicilios(){
    let datos = {"action": actions.actionSelect ,
                 "_tabla" : vistas.domicilios ,                 
                 "_obj" : ['objetoDocumento'],  
                };
    console.log('servicios de domicilios - getListadosDomicilios' ,url.action , datos,this.requestOptions);
    return this.http.post(url.action , datos,this.requestOptions) ;
} 
}
