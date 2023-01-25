import { Usuarios } from "../interfaces/usuario.interface";

export class UsuarioModel {
    ID!: number;
    Login!: string;
    Nombre1!: string;
    Nombre2!: string;
    Apellido1!: string;
    Apellido2!: string;
    nombreCompleto!: string;
    estado!: number;
    usr_registro!: number;
    Fecha_Registro!: string;
    Usr_Modif!: number;
    Fecha_Modif!: string;
    pass!: string;
    change_pass!: number;
    ultimo_ingreso!: string;
    mail!: string;
    descripcion?:string;
    perfil?:number;
    libranza?:boolean;
    constructor( cargaUsuario : Usuarios ){
      if(typeof(cargaUsuario) !== 'undefined'){
        this.ID= cargaUsuario.ID	;
        this.Login= cargaUsuario.Login	;
        this.Nombre1= cargaUsuario.Nombre1	;
        this.Nombre2= cargaUsuario.Nombre2	;
        this.Apellido1= cargaUsuario.Apellido1	;
        this.Apellido2= cargaUsuario.Apellido2	;
        this.nombreCompleto= cargaUsuario.nombreCompleto	;
        this.estado= cargaUsuario.estado	;
        this.usr_registro= cargaUsuario.usr_registro	;
        this.Fecha_Registro= cargaUsuario.Fecha_Registro	;
        this.Usr_Modif= cargaUsuario.Usr_Modif	;
        this.Fecha_Modif= cargaUsuario.Fecha_Modif	;
        this.pass= cargaUsuario.pass	;
        this.change_pass= cargaUsuario.change_pass	;
        this.ultimo_ingreso= cargaUsuario.ultimo_ingreso	;
        this.mail= cargaUsuario.mail	;
        this.descripcion = cargaUsuario.descripcion;
        this.perfil = cargaUsuario.perfil;
        this.libranza = cargaUsuario.libranza;
        
      }
    }
  }