import { NgModule } from '@angular/core';
import { CommonModule, Time } from '@angular/common';
import { DocumentosModel } from '../documento.model';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DomiciliosModel {id:number;
  cod_doc:number;
  cod_cliente:number;
  estado_domicilio:number;
  direccion:string;
  cod_doc_pago:number;
  establecimiento:number;
  caja:number;
  nombreCaja:string;
  cantidadVendida:number;
  valorParcial:number;
  descuento:number;
  valorIVA:number;
  valorTotal:number;
 fecha:Date;
  hora:Time;
  nombreEstablecimiento:string;
  nombreCliente:string ;
 objetoDocumento:DocumentosModel 
 }
