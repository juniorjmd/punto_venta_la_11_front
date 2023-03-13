import { Categoria } from "../interfaces/categoria.interface";

 
export class CategoriasModel { 
  id!: number;
 name!: string;
 parent_id!: number;
 child_id!: number;
 parent_path!: string;
 complete_name!: string;
 create_date!: string;
 write_date!: string;
 __last_update!: string;
 property_account_income_categ_id!: number;
 property_account_expense_categ_id!: number;
 product_count!: number;
 fecha!: string;
 hora!: string;
 tipoDescripcion?: string;
  constructor( cat: Categoria){
    if (typeof (cat) !== 'undefined' ){
      this.id = cat.id;
      this.name = cat.name;
      this.parent_id = cat.parent_id;
      this.child_id = cat.child_id;
      this.parent_path = cat.parent_path;
      this.complete_name = cat.complete_name;
      this.create_date = cat.create_date;
      this.write_date = cat.write_date;
      this.__last_update = cat.__last_update;
      this.property_account_income_categ_id = cat.property_account_income_categ_id;
      this.property_account_expense_categ_id = cat.property_account_expense_categ_id;
      this.product_count = cat.product_count;
      this.fecha = cat.fecha;
      this.hora = cat.hora; 

    if (cat.tipoDescripcion)
    this.tipoDescripcion= cat.tipoDescripcion.trim();}
  }
} 