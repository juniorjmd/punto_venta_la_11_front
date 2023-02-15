import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faUsersCog, faUserCircle, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { vwsucursal } from 'src/app/models/app.db.interfaces';
import { DatosInicialesService } from 'src/app/services/datos-iniciales.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  llaveIncio:string;
  sucursal : vwsucursal[] = [];
  fauserscog = faUsersCog
fausercircle = faUserCircle
fadooropen = faDoorOpen
  valSincronizar =  localStorage.getItem('E9PZJrrrRy5UVx7oqf+s9E0buds=')! ; 

  constructor( private _datosInicialesService: DatosInicialesService
    ,   private _Router : Router) { 
    this.llaveIncio = ''; 
   
    if (!this.valSincronizar){
      this._Router.navigate(['sincronizar']);
     }
    
  this._datosInicialesService.getDatosIniSucursal(this.valSincronizar).subscribe(
    { next : (data:any)=>{
      this.sucursal = data.sucursal; 
      console.log(data);
      
      if( !data.datosActualizacion || data.datosActualizacion.estado !=="activa") {
        this._Router.navigate(['sincronizar']);
       }
           }  ,
     error :  (err:any )=> {console.log(err)
      alert( err.error.error)
    }
   }
      );  
/*
      $('#navbarDropdown').on('click',(e)=>{
        e.preventDefault()
      })*/



} 
isReady = false;
check = (event:any) => {
 if (!this.isReady) {
   event.preventDefault();
 }
}


}
