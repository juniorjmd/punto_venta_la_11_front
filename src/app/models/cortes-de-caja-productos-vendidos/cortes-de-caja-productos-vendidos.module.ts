import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CortesDeCajaProductosVendidosModule { 
  constructor(
    @Inject(Number) public id_cierre_caja:number,
  
    @Inject(Number) public idProducto :number,
   
    @Inject(String) public nombreProducto:string,
   
    @Inject(Number) public descuento:number,
   
    @Inject(Number) public valorTotal:number,
   
    @Inject(Number) public cant_real_descontada:number,
   
    @Inject(Number) public total_IVA:number,
    @Inject(Number) public total_presioSinIVa:number  ) {}}
