export interface Establecimientos {
    id:number;
    nombre:string ;
    descripcion:string ;
    tipo:number ;
    fecha_creacion:Date ;
    usuario_creacion:number ;
    estado:number ;
//id, nombre, descripcion, tipo, fecha_creacion, usuario_creacion, estado, nombreTipo, nombreEstado, nombreUsuario, idAuxiliar, nombreAuxiliar, idBodegaStock, idBodegaVitual, NameBodegaStock, NameBodegaVirtual
idAuxiliar?:number ; 
nombreAuxiliar?:string ; 
idBodegaStock?:number ; 
idBodegaVitual?:number ;
 NameBodegaStock?:string ;
  NameBodegaVirtual?:string ;
    nombreTipo ?:string ;
    nombreEstado ?:string ;
    nombreUsuario ?:string ; 
    estockExistencia?:number ;
    NameBodegaExistencia?:string ;
}
