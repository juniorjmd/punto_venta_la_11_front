export interface OdooPrd {
    "id":number,
    "price":number, 
    "price_extra":number, 
    "lst_price":number,
    "precio_sin_iva"?:number,
    "valor_del_iva"?:number,
    "default_code":string,
    "code":string,
    "partner_ref":string,
    "active":boolean,
    "barcode":string,
    "image_1920":string,
    "image_1024":string,
    "image_512" :string,
    "image_256" :string,
    "image_128" :string,
    "display_name":string,  
    "name":string, 
    "categ_id" ?:string[],
    "x_studio_marca" ?:string[]
    "cantidad" ?: number
    "impuestos"?: impuesto 
    "cantidadVendida"?: number 
    "descuento" ?: number 
}

export interface errorOdoo{
    "error":any,
    "msg" : string,
    "loc_wh" ?:any[],
    "loc_virt" ?: any[]

}
export interface impuesto{
    "cnt": number,
    "datos": [
        {
            "id": number,
            "name": string,
            "amount": number,
            "amount_type": string
        }
    ]
}


export interface responsePrd{
    "confirmado": Boolean, 
    "datoDevolucion" ?: OdooPrd
}
