import { TiposEstablecimientos } from "../interfaces/tipos-establecimientos";

export class TiposEstablecimientosModel {
    id!: number;
    nombre!: string;
    descripcion!: string;
    estado!: number;
    fecha_creacion!: Date;
    usuario_creador!: number;
nombreUsuario?:string;
nombreEstado?:string;
constructor( tipo ?: TiposEstablecimientos){
    if (typeof(tipo) !== 'undefined'){
        this.id = tipo.id;
        this.nombre = tipo.nombre;
        this.descripcion = tipo.descripcion;
        this.estado = tipo.estado;
        this.fecha_creacion = tipo.fecha_creacion;
        this.usuario_creador = tipo.usuario_creador;
        this.nombreUsuario = tipo.nombreUsuario;
        this.nombreEstado = tipo.nombreEstado;
    }
}
}
