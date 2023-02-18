import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as internal from 'events';
import { ClientesOdoo } from '../interfaces/clientes-odoo';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { DocumentosModel } from '../models/documento.model';
import { TABLA } from '../models/app.db.tables';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {
    private clientes: cliente[] = [];
    clienteEmpty = {
        id: 0,
        nombre: '',
        identificacion: 0,
        tipoIdentificacion: '',
        calle: '',
        calle2: '',
        ciudad: '',
        provincia: '',
        pais: '',
        cp: '',
        direRecibo: '',
        puestoTrabajo: '',
        tel1: '',
        tel2: '',
        mail: '',
        enlace: '',
        titulo: '',
        categoria: ''
    }; 
    requestOptions:any;
    constructor(private http: HttpClient ,
        private _Router : Router){ 
            let llaveDeRegistro =  parseInt(localStorage.getItem('sis41254#2@')!) ; 
            if (!llaveDeRegistro){
                  this._Router.navigate(['login']);
            }
        console.log('servicios datos iniciales inicializado');   
        
        const headers = httpOptions() ; ;
        this.requestOptions = { headers: headers };
    }
    getDatosIniClientes(){
   
        return this.clientes;
      
    }
    getDatosCliente(id:number){ 
        let clienteF:cliente = this.clienteEmpty;
       for(let cliente of this.clientes){
           if ( cliente.id === id )
              clienteF = cliente;
       }
        return clienteF;
      
    }

    getClientesOdoo(){
        let datos = {"action": actions.actionSelectClienteOdoo    }
        console.log('actionSelectClienteOdoo  ' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }
    
    getDatosClientePname(nombre:string){ 
        let clienteF:cliente= this.clienteEmpty; 
       for(let cliente of this.clientes){
           if ( cliente.nombre === nombre )
              clienteF = cliente;
       }
        return clienteF;
      
    }
    getClientesOdooPorCedula( cliente:ClientesOdoo , limit : number ){

        let datos = {"action": actions.actionSelectClienteOdoo ,
        "_tipo_busqueda" : "id" ,
        "_tipo_identificacion" : cliente.l10n_latam_identification_type_id[0] ,
        "_dato" : cliente.vat ,
        "_limit":limit
       }
        console.log('actionSelectClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }

    setClienteOdooEinsertarDocumento( cliente:ClientesOdoo , documento:DocumentosModel ){

        let datos = {"action": actions.actionCrearClienteOdooPlusDoc ,
        "_datos_insert" : cliente  ,
        "_datos_insert_doc" : documento
       }
        console.log('actionSelectClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }
    setClienteOdoo( cliente:ClientesOdoo   ){

        let datos = {"action": actions.actionCrearClienteOdoo ,
        "_datos_insert" : cliente   
       }
        console.log('setClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }

    pasarClienteOdooACntYasignarDoc( cliente:ClientesOdoo , documento : DocumentosModel  ){

        let datos = {"action": actions.actionPasarClienteAControl ,
        "_datos_insert" : cliente ,
          "_agregar_a_documento" : true,
          "_documento_orden" : documento.orden 
       }
        console.log('setClienteOdoo  ' ,JSON.stringify(cliente),url.createOdoo , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }
    updateClienteOdoo( cliente:ClientesOdoo   ){

        let datos = {"action": actions.actionActualizarClienteOdoo ,
        "_datos_insert" : cliente   
       }
        console.log('setClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }
    getClienteOdooPorCedula( cliente:ClientesOdoo ){
/*
        let datos = {"action": actions.actionSelectClienteOdoo ,
        "_tipo_busqueda" : "id" ,
        "_tipo_identificacion" : cliente.l10n_latam_identification_type_id[0] ,
        "_dato" : cliente.vat ,
        "_limit":1
       }
*/
       let datos = {"action": actions.actionSelect ,
       "_tabla" : TABLA.documentos_clientes,
       "_where" : [{columna : 'l10n_latam_identification_type_id' , tipocomp : '=' , dato : cliente.l10n_latam_identification_type_id[0]},
       {columna : 'vat' , tipocomp : '=' , dato : cliente.vat}]
      };


        console.log('actionSelectClienteOdoo  ' ,JSON.stringify(cliente),url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }

}
export interface cliente{
    id:number ,
    nombre:string,
    identificacion:number,
    tipoIdentificacion:string,  
    calle:string,
    calle2:string,
    ciudad:string,
    provincia:string,
    pais:string,
    cp:string,
    direRecibo:string,
    puestoTrabajo:string,
    tel1:string,
    tel2:string,
    mail:string,
    enlace:string,
    titulo:string,
    categoria:string


}