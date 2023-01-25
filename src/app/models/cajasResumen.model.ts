 
import { DecimalPipe } from "@angular/common";
import { caja } from "../interfaces/caja.interface"; 


export class cajasResumenModel{

    id!: number; 
    usuario_apertura!: number;
    usuario_cierre!: number; 
    fecha_apertura!: Date; 
    fecha_cierre!: Date; 
    base!: number; 
    sub_total_venta!: number | DecimalPipe; 
    total_iva!: number; 
    total_descuento!: number; 
    total_venta!: number; 
    efectivo!: number; 
    caja!: caja;
    NusuarioApertura ?:string;
    NusuarioCierre ?:string; 
}