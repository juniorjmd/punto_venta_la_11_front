import { Time } from "@angular/common";
import * as internal from "events";
import { Clientes } from "../interfaces/clientes.interface";
import { DocumentoImpuestos, DocumentoListado } from "../interfaces/documento.interface";
import { DocpagosModel } from "./pagos.model";

export class DocumentosModel {
  orden!: number;
  tipoDocumentoFinal!: string;
  idDocumentoFinal!: string;
  establecimiento!: number;
caja?:number;
  cantidadVendida!: number;
  valorParcial!: number;
  descuento!: number;
  valorIVA!: number;
  valorTotal!: number;
  totalFactura!: number;
  ajusteAlpeso!: number;
  fecha!: Date;
  hora!: Time;
  usuario!: number;
  estado!: number;
idCierre?:number; 
pago_iva?:number;
  tipoDeVenta!: number;
  estadoFactura!: number;
fecha_entrega?:Date;
porc_retefuente?:number;
retefuente?:number;
remisiones?:number;
  cod_orden_compra!: string;
COSTOS?:number;
cod_vendedor?:number ;
cliente?: number;
nombreEsta?:string;
nombreCaja?:string;
vendedorNombre?:string;
clienteNombre?:string;
nombreDocumento?:string;  
idStockOdooPrnc?:number; 
nameStockOdooPrnc?:string;
idStockOdooPOS?:number;
nameStockOdooPOS?:string;
idStockOdooVtl?:number;
nameStockOdooVtl?:string; 






clienteobj?: Clientes[];
impuestos?:DocumentoImpuestos[];
listado?:DocumentoListado[];
pagos?:DocpagosModel[]; 
idConsecutivo?:number;
estadoContador?:number;
consecutivoDesde?:number;
consecutivoHasta?:number;
tipoContador?:number;
nombreEstadoContador?:string;
nombreTipoContador?:string;
resolucion?:string;
fechaInicioResolucion?:number|Date;
fechaFinResolucion?:number|Date;
nombreUsuarioResolucion ?:string;
referencia ?:string ;
 referencia_codigo ?:number;
}
