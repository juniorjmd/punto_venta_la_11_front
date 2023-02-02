import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { httpOptions } from '../models/app.db.url';

@Injectable({
  providedIn: 'root'
})
export class ResumenService {
  requestOptions:any
  constructor(  private _Router : Router){ 
    let llaveDeRegistro =  parseInt(localStorage.getItem('sis41254#2@')!) ; 
    if (!llaveDeRegistro){
          this._Router.navigate(['login']);
    }
    
    const headers = httpOptions() ; ;
        this.requestOptions = { headers: headers };
   }
}
