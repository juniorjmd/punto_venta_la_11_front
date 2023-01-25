export class  CiudadModel  {
    id!: number;
    cod_pais!: number;
    cod_departamento!: number;
    nombre!: string;
    nombre_dep!: string;
    nombre_pais!: string;
    cod_ciudad!: number;
    cod_dane!: number;

}
export class DepartamentoModel  {
        id!: number; 
        cod_departamento!: number; 
        nombre!: string; 
        nombre_pais!: string;
        cod_pais!: number;
    }
export class PaisModel   {
        id!: number; 
        cod_pais!: string; 
        nombre!: string; 
    }