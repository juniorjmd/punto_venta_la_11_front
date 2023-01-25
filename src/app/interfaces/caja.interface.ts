export interface caja   {
    'id' : number,
    'nombre' :string,
    'descripcion' :string,
    'estadoGeneral' : number,
    'estadoCaja' : number,
    'usuarioEstadoCaja' : number,
    'usuarioEstadoGeneral' : number,
    'fechaEstadoCaja' : Date,
    'fechaEstadoGeneral' : Date,
    'establecimiento':number,
    'asignada'?:boolean,
    'idUsuario'?:number,
    'nombreEstablecimiento'?:string,
    'estadoEsta' ?:number,
    'nombreUsuarioEstadoCaja' ?:string,
    'documentoActivoCaja'?:number
 }