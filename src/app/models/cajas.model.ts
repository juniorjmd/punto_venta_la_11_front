 
import { caja } from "../interfaces/caja.interface";

export class cajaModel{
    id!: number; 
    nombre!: string;
    descripcion!: string;
    estadoGeneral : number;
    estadoCaja : number;
    fechaEstadoGeneral!: Date;
    fechaEstadoCaja!: Date;
    usuarioEstadoCaja!: number;
    usuarioEstadoGeneral!: number;
    nombreEstadoGeneral!: string;
    nombreEstado!: string; 
    asignada ?:boolean;
    idUsuario ?:number;
    establecimiento?:number;
    nombreEstablecimiento?:string;
    estadoEsta?:number;
    nombreUsuarioEstadoCaja?:string;
    documentoActivoCaja?:number;
    constructor(cargaCaja ?: caja){
        this.estadoCaja = 0 ;
        this.estadoGeneral = 0;
        this.establecimiento = 0;
        console.log('parametro de entrada :' ,cargaCaja )
        if (typeof (cargaCaja) !== 'undefined' ){
            this.estadoEsta = cargaCaja.estadoEsta;
            this.id = cargaCaja.id ;
            this.establecimiento = cargaCaja.establecimiento;
            this.nombre = cargaCaja.nombre ;
            this.descripcion  = cargaCaja.descripcion ;
            this.estadoGeneral  = cargaCaja.estadoGeneral ;
            this.estadoCaja = cargaCaja.estadoCaja ;
            this.fechaEstadoGeneral  = cargaCaja.fechaEstadoGeneral ;
            this.fechaEstadoCaja  = cargaCaja.fechaEstadoCaja ;
            this.usuarioEstadoCaja  = cargaCaja.usuarioEstadoCaja ;
            this.usuarioEstadoGeneral  = cargaCaja.usuarioEstadoGeneral ; 
            this.asignada  = cargaCaja.asignada ;  
            this.idUsuario = cargaCaja.idUsuario; 
            this.nombreEstablecimiento = cargaCaja.nombreEstablecimiento;
            this.nombreUsuarioEstadoCaja = cargaCaja.nombreUsuarioEstadoCaja;
            this.documentoActivoCaja = cargaCaja.documentoActivoCaja;
            
        }
        this.setNombreEstado();

    }
    public setNombreEstado(){
        console.log('asignamos estado')
        switch(this.estadoCaja.toString()){
            case '1' : this.nombreEstado = 'Abierta'; 
            break; 
            case '2' : this.nombreEstado = 'Cerrada'; 
            break; 
            case '3' : this.nombreEstado = 'Pausa'; 
            break; 
            case '0' :
            default : this.nombreEstado = 'without first use'; 
            break; 
        }
        switch(this.estadoGeneral.toString()){
            case '1' : 
            this.nombreEstadoGeneral = 'Activo'; 
             break; 
            case '2' : 
            this.nombreEstadoGeneral = 'Inactivo';  
            break; 
            case '0' :
            default : 
            this.nombreEstadoGeneral = 'Inactiva';  
            break; 

        }
        console.log(this.estadoGeneral , this.nombreEstadoGeneral,
            this.estadoCaja, this.nombreEstado );
    }
}