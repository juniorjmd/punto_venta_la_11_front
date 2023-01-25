export interface Usuario{
    id:number ,
    nombre:string,
    descripcion:string ,
    img:string ,
    id_perfil:number,
    nombre_perfil:string,
    key_registro:string,
    permisos : Permisos[]
}

export interface Perfil{
    id:number,
    Perf_Nombre:string
}

export interface Usuarios{
    ID:number;
    Login:string;
    Nombre1:string;
    Nombre2:string;
    Apellido1:string;
    Apellido2:string;
    nombreCompleto:string;
    estado:number;
    usr_registro:number;
    Fecha_Registro:string;
    Usr_Modif:number;
    Fecha_Modif:string;
    pass:string;
    change_pass:number;
    ultimo_ingreso:string;
    mail:string;
    descripcion?:string;
    perfil?:number;
    libranza?:boolean;
}

export interface Permisos{
    id:number,
    id_perfil:number,
    recurso:RecursoDetalle
    
}

export interface RecursoDetalle{
    id:number,
    nombre_recurso:string,
    img:string,
    idtipo:number,
    tipo:string,
    estado?:number ,
    direccion?:string[]
}