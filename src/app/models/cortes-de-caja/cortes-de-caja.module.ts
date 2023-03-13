import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CortesDeCajaModule { 
  constructor(
    @Inject(Number) public id:number,
  
    @Inject(Number) public usuario_apertura:number,
   
    @Inject(Number) public usuario_cierre:number,
   
    @Inject(String) public fecha_apertura:string,
   
    @Inject(String) public fecha_cierre:string,
   
    @Inject(Number) public base:number,
   
    @Inject(Number) public sub_total_venta:number,
   
    @Inject(Number) public total_iva:number,
   
    @Inject(Number) public total_descuento:number,
   
    @Inject(Number) public total_venta:number,
   
    @Inject(Number) public efectivo:number,
   
    @Inject(Number) public id_Caja:number,
   
    @Inject(String) public nombreUsuarioApertura:string,
   
    @Inject(String) public nombreUsuarioCierre:string,
    @Inject(String) public nombreCajaCierre :string,
    @Inject(Number) public id_cierre_total ?:number,
  ){} }
