import { Categoria } from "../interfaces/categoria.interface";

 
export class CategoriasModel { 
  id!: number; 
  letra!: string; 
  nombre!: string; 
  descripcion!: string; 
  tipo!: string;
  tipoDescripcion ?:string;
  constructor( cat: Categoria){
    if (typeof (cat) !== 'undefined' ){
    this.id = cat.id ;
    this.letra= cat.letra; 
    this.nombre= cat.nombre; 
    this.descripcion = cat.descripcion.trim(); 
    this.tipo= cat.tipo;
    if (cat.tipoDescripcion)
    this.tipoDescripcion= cat.tipoDescripcion.trim();}
  }
} 