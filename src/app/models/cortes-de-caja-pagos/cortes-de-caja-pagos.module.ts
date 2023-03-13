import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CortesDeCajaPagosModule {
  constructor(
    @Inject(Number) public id:number,
  
    @Inject(Number) public tipo_pago :number,
   
    @Inject(Number) public valor:number,
   
    @Inject(String) public cod_cierre:number,
   
    @Inject(String) public nombre:string) {} }
