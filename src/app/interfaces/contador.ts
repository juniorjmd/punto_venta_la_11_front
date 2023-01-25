import { Time } from "@angular/common";

export interface Contador {
    id : number;
     codContador :string ; 
      establecimiento : number; 
      contador:number; 
      tipoContador:number;
      nombreTipo?:string;
      contador_real_establecimiento:number; 
      fecha?:Date;
       hora?:Time;
       estado:number;
       nombreEstablecimiento?:string;
        nombre_estado?:string;
        desde?:number;
        hasta?:number;
        usuario?:number;
        nombreUsuario?:string;
        resolucion?:string;
        fechaInicioResolucion?:Date;
        fechaFinResolucion?:Date;
}
