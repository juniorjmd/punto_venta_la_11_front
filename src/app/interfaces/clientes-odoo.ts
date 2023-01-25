import { answDfltOdoo } from "../models/app.db.answDfltOdoo.model";

export interface ClientesOdoo {
    "id"?: number,
    "name": string,
    "parent_id"?: boolean| any[],
    "display_name": string,
    "company_type": string,
    "is_company": boolean|string,
    "email": boolean|string,
    "mobile": boolean|string,
    "phone": boolean|string,
    "type": boolean|string,
    "vat": boolean|string,
    "lang": boolean|string,
    "street": boolean|string,
    "city":  boolean|string|number,
    "street2": boolean|string,
    //-----------------------------
    "state_id": any[]|boolean|string| number| answDfltOdoo,
    "zip": boolean|string,
    "country_id": any[]|boolean|string| number| answDfltOdoo   ,
    "function": boolean|string,
    "category_id": boolean|string,
    "title": boolean|string,

    "l10n_latam_identification_type_id": boolean|any|number| answDfltOdoo ,
    "nombre_pais" ?: string,
    "nombre_estado" ? :string,

}


export interface dfltAnswOdoo {
    '0':number,
    '1':string
  }
  export interface dfltAnswOdoo2 {
    'dato':number,
    'label':string,
    'color'?:string,
    'display'?:boolean
  }

  export interface empleadosOdoo {
  	"id": number,
			"identification_id": string|number|boolean,
			"name": string,
			"mobile_phone": string,
			"category_ids": [],
			"job_title": string,
			"work_phone": string,
			"permisos_internos" ?: {}
  }