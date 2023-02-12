import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCheck, faCog, faEllipsis, faThumbsDown, faWarning } from '@fortawesome/free-solid-svg-icons';
import { Establecimientos } from 'src/app/interfaces/establecimientos.interface';
import { select } from 'src/app/interfaces/generales';
import { ProcesoSinc } from 'src/app/interfaces/proceso-sinc';
import { vwsucursal } from 'src/app/models/app.db.interfaces';
import { DatosInicialesService } from 'src/app/services/datos-iniciales.service';
import { LoginService } from 'src/app/services/login.service';
import { SincOdooService } from 'src/app/services/sinc-odoo.service';

@Component({
  selector: 'app-sinc-odoo',
  templateUrl: './sinc-odoo.component.html',
  styleUrls: ['./sinc-odoo.component.css']
})
export class SincOdooComponent {
  faellipsis = faEllipsis
  facog = faCog
  faWarning =faWarning;
  faCheck= faCheck;
  
  terminoBien = true ; 
  procesosInicio:ProcesoSinc= {
    nombre: 'Actualizando Existencias Desde Odoo',
    estado: false,
    detalle: '',
    resultado: false
  }; 
  procesosActual:ProcesoSinc= {
    nombre: '',
    estado: false,
    detalle: '',
    resultado: false
  }; 
  procesosFinal:ProcesoSinc= {
    nombre: 'Actualizacion Finalizada',
    estado: true,
    detalle: '',
    resultado: true
  }; 
  
  procesos: ProcesoSinc[]=[];
  sucursal:vwsucursal[]=[]; 
  establecimientos:Establecimientos[]=[]
  bodegas:any[] =[]
  bodegasNombre:any[] =[]
  contProce:number = 0 ; 
  constructor(private _sincService : SincOdooService,
    private _loginService: LoginService,
    private _Router : Router) {
   

      this.generarActualizacion();
    } 
    async finalizarProcesos(){
      this.procesos[0].estado = true;
      this.procesos[0].resultado = true;
      this.procesos.push(this.procesosFinal)
      console.log(this.procesos);
    }
  
    async  generarActualizacion(){
    try {
      this.procesos[this.contProce] =  this.procesosInicio ;
      await this.obtenerSucursales();

      for( let i = 0 ; i< this.sucursal.length ; i++){
        await this.obtenerEstablecimientos(this.sucursal[i]);
        console.log('termino traer establecimientos', this.establecimientos);
      }
      console.log('termino paso el for') 
    await this.generarActualizacionBodegas(); 
    await this.actulizarProductos();
    await this.actulizarCategorias();
    await this.actulizarTaxes();
    await this.actulizarMarcas();
    console.log('fin actualizacion');
      await this.finalizarProcesos();

    } catch (error:any) {
         
      this.procesos[0].detalle = error;
      this.procesos[0].estado = true;
      this.procesos[0].resultado = false;
      this.procesos.push(this.procesosFinal)
      console.log(this.procesos);
    }
    }   
async actulizarProductos(){
 
   try {
    this.contProce++;
     
    this.procesos[this.contProce] = {
      nombre:  'Actulizando listado de Productos desde Odoo' ,
      estado: false,
      detalle: "",
      resultado: false
    }; 
    const retornoSuc   = await this._sincService.actualizarProductos()
    if( retornoSuc.error === 'ok'){
      this.terminoBien = true;
      this.procesos[this.contProce].detalle = "Total Datos actualizados ==> " + retornoSuc.numdata;
      this.procesos[this.contProce].estado = true;
      this.procesos[this.contProce].resultado = true;
    }else{
      this.terminoBien = false;
      this.procesos[this.contProce].detalle = "error ==> " + retornoSuc.error;
      this.procesos[this.contProce].estado = true;
      this.procesos[this.contProce].resultado = false;
    }
   } catch (error:any) {
    console.log(error);
        this.terminoBien = false;
        this.procesos[this.contProce].detalle = "error ==> " + error.error.error;
        this.procesos[this.contProce].estado = true;
        this.procesos[this.contProce].resultado = false;
   }
}


async actulizarCategorias(){
 
  try {
   this.contProce++;
    
   this.procesos[this.contProce] = {
     nombre:  'Actulizando listado de Categorias de producto desde Odoo' ,
     estado: false,
     detalle: "",
     resultado: false
   }; 
   const retornoSuc   = await this._sincService.actualizarCategorias()
   if( retornoSuc.error === 'ok'){
     this.terminoBien = true;
     this.procesos[this.contProce].detalle = "Total Datos actualizados ==> " + retornoSuc.numdata;
     this.procesos[this.contProce].estado = true;
     this.procesos[this.contProce].resultado = true;
   }else{
     this.terminoBien = false;
     this.procesos[this.contProce].detalle = "error ==> " + retornoSuc.error;
     this.procesos[this.contProce].estado = true;
     this.procesos[this.contProce].resultado = false;
   }
  } catch (error:any) {
   console.log(error);
       this.terminoBien = false;
       this.procesos[this.contProce].detalle = "error ==> " + error.error.error;
       this.procesos[this.contProce].estado = true;
       this.procesos[this.contProce].resultado = false;
  }
}

async actulizarMarcas(){
 
  try {
   this.contProce++;
    
   this.procesos[this.contProce] = {
     nombre:  'Actulizando listado de Taxes desde Odoo' ,
     estado: false,
     detalle: "",
     resultado: false
   }; 
   const retornoSuc   = await this._sincService.actualizarTaxes()
   if( retornoSuc.error === 'ok'){
     this.terminoBien = true;
     this.procesos[this.contProce].detalle = "Total Datos actualizados ==> " + retornoSuc.numdata;
     this.procesos[this.contProce].estado = true;
     this.procesos[this.contProce].resultado = true;
   }else{
     this.terminoBien = false;
     this.procesos[this.contProce].detalle = "error ==> " + retornoSuc.error;
     this.procesos[this.contProce].estado = true;
     this.procesos[this.contProce].resultado = false;
   }
  } catch (error:any) {
   console.log(error);
       this.terminoBien = false;
       this.procesos[this.contProce].detalle = "error ==> " + error.error.error;
       this.procesos[this.contProce].estado = true;
       this.procesos[this.contProce].resultado = false;
  }
}

async actulizarTaxes(){
 
  try {
   this.contProce++;
    
   this.procesos[this.contProce] = {
     nombre:  'Actulizando listado de Taxes desde Odoo' ,
     estado: false,
     detalle: "",
     resultado: false
   }; 
   const retornoSuc   = await this._sincService.actualizarTaxes()
   if( retornoSuc.error === 'ok'){
     this.terminoBien = true;
     this.procesos[this.contProce].detalle = "Total Datos actualizados ==> " + retornoSuc.numdata;
     this.procesos[this.contProce].estado = true;
     this.procesos[this.contProce].resultado = true;
   }else{
     this.terminoBien = false;
     this.procesos[this.contProce].detalle = "error ==> " + retornoSuc.error;
     this.procesos[this.contProce].estado = true;
     this.procesos[this.contProce].resultado = false;
   }
  } catch (error:any) {
   console.log(error);
       this.terminoBien = false;
       this.procesos[this.contProce].detalle = "error ==> " + error.error.error;
       this.procesos[this.contProce].estado = true;
       this.procesos[this.contProce].resultado = false;
  }
}

async obtenerSucursales(){
  try {
    this.contProce++;
    const retornoSuc   = await this._sincService.getSucursales()
    this.sucursal = retornoSuc.data;
    console.log(this.sucursal);
    this.procesos[this.contProce] = {
      nombre:  'Opteniendo sucursales' ,
      estado: false,
      detalle: "Sucursales ==> ",
      resultado: false
    }; 
       
    let division = '';
    this.sucursal.forEach((dato) => {
      this.procesos[this.contProce].detalle += division + dato.nombre_suc;
      division = '|';
    });
    this.procesos[this.contProce].estado = true;
    this.procesos[this.contProce].resultado = true;
    this.terminoBien = true;
  } catch (error:any) {
    console.log(error);
        this.terminoBien = false;
        this.procesos[this.contProce].detalle = "error ==> " + error.error.error;
        this.procesos[this.contProce].estado = true;
        this.procesos[this.contProce].resultado = false;
  }
  
}
 async generarActualizacionBodegas(){
  let cont = 0;
  let aux = ''
  let division = ''
  let auxContador = this.contProce;


  for( let i = 0 ; i< this.establecimientos.length ; i++){
    const datos = this.establecimientos;
    if (! this.bodegas.includes(datos[i].idBodegaStock!)){
      this.bodegas[cont] = datos[i].idBodegaStock!  ; 
      this.bodegasNombre[cont] = datos[i].NameBodegaStock;
      cont++
      this.contProce++;
      this.procesos[this.contProce] = {
        nombre:  'Actualizando datos de existencias ' ,
        estado: false,
        detalle: "bodega odoo ==> Nro. "+datos[i].idBodegaStock +' - '  + datos[i].NameBodegaStock ,
        resultado: false
      }; 
      await this.actualizarExistencia(datos[i].idBodegaStock!)
    }
    aux+= division + datos[i].nombre + ' - store : ' +  datos[i].NameBodegaStock 
      division = ' | ';
  }
      this.procesos[auxContador].detalle = aux; 
      this.procesos[auxContador].estado = true;       
      this.procesos[auxContador].resultado = true
}


async actualizarExistencia(bodega:number){
  try {
      const retornoEsta = await this._sincService.actualizarExistencias(bodega);
      console.log(retornoEsta);

   if (retornoEsta.error == 'ok'){ 
      this.procesos[this.contProce].detalle+= ' r/Bodega actualizada con exito'; 
      this.procesos[this.contProce].estado = true; this.procesos[this.contProce].resultado = true;  

   }else{this.procesos[this.contProce].detalle = retornoEsta.error; 
    this.procesos[this.contProce].estado = true;
    this.procesos[this.contProce].resultado = false; 
   }

  } catch (error : any) {
    this.procesos[this.contProce].detalle = error; 
    this.procesos[this.contProce].estado = true; 
    this.procesos[this.contProce].resultado = false; 
     
  }
   
   
}
async obtenerEstablecimientos(dato:any){
  try {
      let aux = '';
     let division = '';
      this.contProce++;
      console.log('contProce ' + this.contProce, 'termino bien', this.procesosActual);
      this.procesos[this.contProce] = {
        nombre: 'Opteniendo establecimiento de la sucursal ' + dato.nombre_suc,
        estado: false,
        detalle: '',
        resultado: false
      };
      const retornoEsta = await this._sincService.getEstaSucursales(dato.id_suc);
      console.log(retornoEsta);
      this.establecimientos = retornoEsta.data;

   

  } catch (error : any) {
    this.procesos[this.contProce].detalle = error; 
    this.procesos[this.contProce].estado = true; 
     
  }
   
   
}



}
