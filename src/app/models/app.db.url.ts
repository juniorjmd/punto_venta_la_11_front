import { HttpHeaders } from '@angular/common/http'; 

const action = 'https://jdsc11.services.jdpsoluciones.com/';
const actionGet = 'https://jdsc11.services.jdpsoluciones.com/actions/consulta/';
const actionPush = 'https://jdsc11.services.jdpsoluciones.com/actions/crear/';
const actionDlt = 'https://jdsc11.services.jdpsoluciones.com/actions/eliminar/'; 
const actionGetOdoo = 'https://jdsc11.services.jdpsoluciones.com/Odoo/consulta/';
const actionPushOdoo = 'https://jdsc11.services.jdpsoluciones.com/Odoo/crear/';
const actionDltOdoo = 'https://jdsc11.services.jdpsoluciones.com/Odoo/eliminar/';
const actionSincOdoo = 'https://jdsc11.services.jdpsoluciones.com/Odoo/sincronizacion/'; 
const login = 'https://jdsc11.services.jdpsoluciones.com/login/';
const datosIniciales = 'https://jdsc11.services.jdpsoluciones.com/datosiniciales/';
const brand = 'https://jdsc11.services.jdpsoluciones.com/brand/';

const httpOptionsSinAutorizacion = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'  
})
}; 

export let httpOptions = ()=>{
  
    return new HttpHeaders({
      'Content-type': 'application/json' ,
      'AUTORIZACION' :localStorage.getItem('sis41254#2@')! 
  })
  
}
export const url = { 
    'httpOptionsSinAutorizacion':httpOptionsSinAutorizacion,
    'action': action,
    'get': actionGet,
    'create':actionPush ,
    'delete': actionDlt,
    
    'getOdoo': actionGetOdoo,
    'createOdoo': actionPushOdoo,
    'deleteOdoo': actionDltOdoo,
    'actionSincOdoo':actionSincOdoo,

    'brand': brand,
    'datosIniciales':datosIniciales,
    'login': login
    
}

export const printer = { 
  'namePrinterGenerico': 'impresora_punto_de_venta' 
}

