 
import { Establecimientos } from "../interfaces/establecimientos.interface";

export class establecimientoModel{
    id!: number;
    nombre!: string;
    descripcion!: string;
    tipo:number ;
    fecha_creacion!: Date;
    usuario_creacion!: number;
    estado:number ;
    nombreTipo ?:string ;
    nombreEstado ?:string ;
    nombreUsuario ?:string ;
    idAuxiliar?:number ; 
    nombreAuxiliar?:string ; 
    idBodegaStock?:number ; 
    idBodegaVitual?:number ;
    NameBodegaStock?:string ;
    NameBodegaVirtual?:string ;
    estockExistencia?:number ;
    NameBodegaExistencia?:string ;
    constructor(cargaEsta : Establecimientos){
        this.estado = 0;
        this.tipo = 0;
        this.idAuxiliar = 0;
        this.idBodegaStock = 0;
        this.idBodegaVitual = 0;
        if (typeof (cargaEsta) !== 'undefined' ){
            this.id = cargaEsta.id ; 
            this.nombre = cargaEsta.nombre ;
            this.descripcion  = cargaEsta.descripcion ;
            this.estado  = cargaEsta.estado ; 
            this.tipo  = cargaEsta.tipo ; 
            this.fecha_creacion  = cargaEsta.fecha_creacion ; 
            this.usuario_creacion = cargaEsta.usuario_creacion;
            this.nombreTipo  = cargaEsta.nombreTipo ; 
            this.nombreEstado  = cargaEsta.nombreEstado ; 
            this.nombreUsuario = cargaEsta.nombreUsuario;
            this.idAuxiliar = cargaEsta.idAuxiliar;
            this.nombreAuxiliar = cargaEsta.nombreAuxiliar;
            this.idBodegaStock = cargaEsta.idBodegaStock;
            this.idBodegaVitual = cargaEsta.idBodegaVitual;
            this.NameBodegaStock= cargaEsta.NameBodegaStock;
            this.NameBodegaVirtual = cargaEsta.NameBodegaVirtual;
            this.estockExistencia = cargaEsta.estockExistencia;
            this.NameBodegaExistencia = cargaEsta.NameBodegaExistencia;
            
        } 
    }
}