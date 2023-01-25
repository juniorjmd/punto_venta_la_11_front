export interface MediosDePago {
    id:number, 
    nombre:string,
    descripcion:string,
    estado:number, 
    cuentaContable:number,
    establecimiento:number,
    nombreEsta?:string,
    nombreEstado?:string,
    idCaja?:number,
    nombreCaja?:string,
    usuarioCaja?:number,
    usuarioCajaNombre?:string,
}
