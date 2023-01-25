import { Time } from "@angular/common";
import { DocumentosModel } from "../models/documento.model";
import { Documento } from "./documento.interface";

export interface Domicilios {
    id:number, cod_doc:number, cod_cliente:number, estado_domicilio:number,
     direccion:string, cod_doc_pago:number, establecimiento:number, caja:number, nombreCaja:string, 
     cantidadVendida:number, valorParcial:number, descuento:number, valorIVA:number, valorTotal:number,
      fecha:Date, hora:Time, nombreEstablecimiento:string, nombreCliente:string ,
      objetoDocumento:DocumentosModel
}
