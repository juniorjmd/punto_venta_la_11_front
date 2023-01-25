import { Component } from '@angular/core';
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
  constructor( private _datosInicialesService: DatosInicialesService) { 
    this.llaveIncio = ''; 
   
    
    
  this._datosInicialesService.getDatosIniSucursal().subscribe(
    { next : (data:any)=>{
      this.sucursal = data; 
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
