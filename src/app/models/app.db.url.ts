import { HttpHeaders } from '@angular/common/http'; 

const action = 'https://jdsc11.services.jdpsoluciones.com/';
const login = 'https://jdsc11.services.jdpsoluciones.com/login/';
const datosIniciales = 'https://jdsc11.services.jdpsoluciones.com/datosiniciales/';
const brand = 'https://jdsc11.services.jdpsoluciones.com/brand/';

const httpOptionsSinAutorizacion = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'  
})
}; 

export let httpOptions = ()=>{
  let autoritation :any;
  if ( typeof( localStorage.getItem('sis41254#2@') ) !== 'undefined' ){
    autoritation = ''
  }else {autoritation =  localStorage.getItem('sis41254#2@') ;} 
  
    return new HttpHeaders({
      'Content-type': 'application/json' ,
      'AUTORIZACION' :autoritation
  })
  
}
export const url = { 
    'httpOptionsSinAutorizacion':httpOptionsSinAutorizacion,
    'action': action,
    'brand': brand,
    'datosIniciales':datosIniciales,
    'login': login
    
}

export const printer = { 
  'namePrinterGenerico': 'impresora_punto_de_venta' 
}

