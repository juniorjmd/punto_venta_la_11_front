import { ClientesOdoo } from "./clientes-odoo"
import { Contador } from "./contador"
import { Usuario, Usuarios } from "./usuario"

export interface Generales {
}


export interface select {
    "data" : any|Usuario|Usuarios|ClientesOdoo|selectUsuario[]|dataSelect[]|Contador[],
    "numdata":number,
    "error": string, 
    "query" ?: string,
    "prodReemplazo"?: any|Usuario|Usuarios|selectUsuario[]|dataSelect[],
    "NumprdReemplazo"?: number,
}

export interface selectUsuario{
    "_result" :number ,
    "usuario" :Usuario
}
export interface dataSelect{
    "id" :number ,
    "nombre" :string
}
