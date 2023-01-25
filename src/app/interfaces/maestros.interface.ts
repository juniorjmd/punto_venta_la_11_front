export interface ciudad   {
    "id" : number,
    "cod_pais" : number,
    "cod_departamento" : number,
    "nombre" : string,
    "nombre_dep" : string,
    "nombre_pais" : string,
    "cod_ciudad" : number,
    "cod_dane" : number
}
export interface datosMaestros
{ "dato" :any ,
    "label" : string} 
export interface maestroSelect{
    "id" : number ,
    "id_maestro" ?: string ,
    "display_name" ?: string ,
    "descripcion" : string  , 
    "programa":string,
    "dato" :any ,
    "label" : string 
}
export interface maestros{
    "id" : number ,
    "nombre" : string ,
    "descripcion" : string  ,
    "datos"?:datosMaestros[]
}
export interface departamento   {
        "id" : number , 
        "cod_departamento" : number  , 
        "nombre" : string , 
        "nombre_pais" : string,
        "cod_pais" : number
    }
export interface pais   {
        "id" : number  , 
        "cod_pais" : string , 
        "nombre" : string 
    }