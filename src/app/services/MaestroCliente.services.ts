import { Injectable } from '@angular/core'; 
import { ciudad, datosMaestros, departamento, maestros, maestroSelect, pais } from '../interfaces/maestros.interface';
import { actions } from '../models/app.db.actions';
import { httpOptions, url } from '../models/app.db.url';
import { vistas } from '../models/app.db.view';
import { HttpClient } from '@angular/common/http';
import { TABLA } from '../models/app.db.tables';
import { DepartamentoModel, PaisModel , CiudadModel } from '../models/maestros.model'; 

import { loading } from 'src/app/models/app.loading'; ;
import { exit } from 'process';
import { ClientesOdoo } from '../interfaces/clientes-odoo';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class MaestroClienteServices {
    private MaestrosCliente: maestros[] = [];
    ciudades: ciudad[] = [];
    departamentos: departamento[] = [];
    paises: pais[] = []; 
    finP1 : boolean = false ;

    requestOptions:any
    constructor(private http: HttpClient ,
        private loading : loading ,  private _Router : Router){ 
            let llaveDeRegistro =  parseInt(localStorage.getItem('sis41254#2@')!) ; 
            if (!llaveDeRegistro){
                  this._Router.navigate(['login']);
            }
        console.log('servicios datos iniciales inicializado');  
        
    const headers = httpOptions() ; ;
    this.requestOptions = { headers: headers };
    }
    getCiudades(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.ciudades
                    };
        console.log('servicios de maestro - ciudades ' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }
    getCiudadesPorDepartamento(id:number){
        
        let where =   [{"columna" : "cod_departamento" , "tipocomp" : "=" , "dato" : id }];
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.ciudades ,
                     "_where" : where
                    };
        console.log('servicios de maestro - ciudad ' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }
    getCiudadesPorDepartamentoOdoo(id:number){
        let datos = {"action": actions.actionBuscarCiudadOdoo ,"_state_id" : id};
        console.log('getCiudadesPorDepartamentoOdoo' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ; 
    }
    setCiudades( ciudad:CiudadModel){
        let  arraydatos = { "cod_pais" : ciudad.cod_pais , "nombre" : ciudad.nombre ,
        "cod_departamento" : ciudad.cod_departamento,
        "cod_ciudad" : ciudad.cod_ciudad, 
        "cod_dane" : ciudad.cod_dane }


        let datos = {"action": actions.actionInsert ,
        "_tabla" : TABLA.ciudades,
        "_arraydatos" : arraydatos
       };
       console.log(datos);
       
        return this.http.post(url.action , datos,this.requestOptions) ;
    }

    actualizarCiudades(ciudad:CiudadModel){ 
        let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : ciudad.id }]
        let  arraydatos = { "cod_pais" : ciudad.cod_pais , "nombre" : ciudad.nombre ,
        "cod_departamento" : ciudad.cod_departamento,
        "cod_ciudad" : ciudad.cod_ciudad, 
        "cod_dane" : ciudad.cod_dane }
        let datos = {"action": actions.actionUpdate ,
        "_tabla" : TABLA.ciudades,
        "_where" : where ,
        "_arraydatos" : arraydatos
       };
        return this.http.post(url.action , datos,this.requestOptions) ;
    }
    
    eliminarCiudades(ciudad:CiudadModel){ 
        let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : ciudad.id }];
        let datos = {"action": actions.actionDelete ,
        "_tabla" : TABLA.ciudades,
        "_where" : where  
       };
        return this.http.post(url.action , datos,this.requestOptions) ;
    }
/////////////////////////////////////////////////

 PadLeft(value:string, length:number):string {
    return (value.toString().length < length) ? this.PadLeft("0" + value, length) : 
    value;
}

    getDepartamentos(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.departamento
                    };
        console.log('servicios de maestro - departamento ' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }
    getDepartamentosPorPais(id:number[]){
        
        let where =   [{"columna" : "cod_pais" , "tipocomp" : "=" , "dato" : id[0] }];
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : vistas.departamento ,
                     "_where" : where
                    };
        console.log('servicios de maestro - departamento ' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }
    getPaises(){
        let datos = {"action": actions.actionSelect ,
                     "_tabla" : TABLA.pais
                    };
        console.log('servicios de maestro - paises ' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }


    getPaisesOdoo(){
        let datos = {"action": actions.actionBuscarPaisesOdoo};
        console.log('servicios de maestro - paises ' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }
    getDepartamentosPorPaisOdoo(pais_id : number){

        let datos = {"action": actions.actionBuscarStatesOdoo ,
                     "_id_pais" : pais_id};
        console.log('getDepartamentosPorPaisOdoo' ,url.action , datos,this.requestOptions);
        return this.http.post(url.action , datos,this.requestOptions) ;
    }
    setPaises( pais:PaisModel){
        let  arraydatos = {   "cod_pais" : pais.cod_pais.toUpperCase() , "nombre" : pais.nombre }
        let datos = {"action": actions.actionInsert ,
        "_tabla" : TABLA.pais,
        "_arraydatos" : arraydatos
       };
       console.log(datos);
       
        return this.http.post(url.action , datos,this.requestOptions) ;
    }

    actualizarPaises(pais:PaisModel){ 
        let where =   [{"columna" : "ID" , "tipocomp" : "=" , "dato" : pais.id }]
        let  arraydatos = { "cod_pais" : pais.cod_pais , "nombre" : pais.nombre }
        let datos = {"action": actions.actionUpdate ,
        "_tabla" : TABLA.pais,
        "_where" : where ,
        "_arraydatos" : arraydatos
       };
        return this.http.post(url.action , datos,this.requestOptions) ;
    }
    
    eliminarPaises(pais:PaisModel){ 
        let where =   [{"columna" : "ID" , "tipocomp" : "=" , "dato" : pais.id }];
        let datos = {"action": actions.actionDelete ,
        "_tabla" : TABLA.pais,
        "_where" : where  
       };
        return this.http.post(url.action , datos,this.requestOptions) ;
    }
    ///departamentos
    
    setDepartamentos( dep:DepartamentoModel){
        let  arraydatos = { "cod_departamento":dep.cod_departamento,
          "cod_pais" : dep.cod_pais , "nombre" : dep.nombre }
        let datos = {"action": actions.actionInsert ,
        "_tabla" : TABLA.departamento,
        "_arraydatos" : arraydatos
       };
       console.log(datos);
       
        return this.http.post(url.action , datos,this.requestOptions) ;
    }

    actualizarDepartamentos( dep:DepartamentoModel){ 
        let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : dep.id }];
        let  arraydatos = { "cod_departamento": dep.cod_departamento,
        "cod_pais" : dep.cod_pais , "nombre" : dep.nombre }
        let datos = {"action": actions.actionUpdate ,
        "_tabla" : TABLA.departamento,
        "_where" : where ,
        "_arraydatos" : arraydatos
       };
        return this.http.post(url.action , datos,this.requestOptions) ;
    }

    eliminarDepartamento(dep:DepartamentoModel){ 
        let where =   [{"columna" : "id" , "tipocomp" : "=" , "dato" : dep.id }];
        let datos = {"action": actions.actionDelete ,
        "_tabla" : TABLA.departamento,
        "_where" : where  
       };
        return this.http.post(url.action , datos,this.requestOptions) ;
    } 

    async  setMaestrosClientes_new(){
            let datos = {"action": actions.actionSelect ,
            "_tabla" : vistas.maestros
           };
          console.log('servicios maestro Cliente - maestros ' ,url.action , datos,this.requestOptions);
          return await    this.http.post(url.action , datos,this.requestOptions).toPromise() ;
        }

        async  setTipoDocumentoOdoo(){
            let datos = {"action": actions.actionTipDoc  
           };
          console.log('servicios maestro Cliente - getTipoDoc ' ,url.action , datos,this.requestOptions);
          return await    this.http.post(url.action , datos,this.requestOptions).toPromise() ;
        }
   
    private setMaestrosClientes(){
        let datos = {"action": actions.actionSelect ,
        "_tabla" : vistas.maestros
       };
      console.log('servicios maestro Cliente - maestros ' ,url.action , datos,this.requestOptions);
       return this.http.post(url.action , datos,this.requestOptions) ;
    }

     setTiposDocumentos(){
        let datos = {"action": actions.actionTipDoc  };
      console.log('servicios maestro Cliente - setTiposDocumentos ' ,url.action , datos,this.requestOptions);
       return this.http.post(url.action , datos,this.requestOptions) ;
    }
    setTitulos(){
        let datos = {"action": actions.actionTitulosOdoo  };
      console.log('servicios maestro Cliente - actionTitulosOdoo ' ,url.action , datos,this.requestOptions);
       return this.http.post(url.action , datos,this.requestOptions) ;
    }
    
    setCategorias(){
        let datos = {"action": actions.actionCategoriasOdoo  };
      console.log('servicios maestro Cliente - actionCategoriasOdoo  ' ,url.action , datos,this.requestOptions);
       return this.http.post(url.action , datos,this.requestOptions) ;
    }
    setCategoriasPrd(){
        let datos = {"action": actions.actionCategoriasPrdOdoo  };
      console.log('servicios maestro Cliente - actionCategoriasOdoo  ' ,url.action , datos,this.requestOptions);
       return this.http.post(url.action , datos,this.requestOptions) ;
    }
    setMarcas(){
        let datos = {"action": actions.actionBuscarMarcas  };
      console.log('servicios maestro Cliente - actionBuscarMarcas  ' ,url.action , datos,this.requestOptions);
       return this.http.post(url.action , datos,this.requestOptions) ;
    }
    setMarcasCatego(categoId:number){
        let datos = {"action": actions.actionBuscarMarcas ,
       "_categ":true ,
       "_data" : categoId };
      console.log('servicios maestro Cliente - actionBuscarMarcas  ' ,url.action , datos,this.requestOptions);
       return this.http.post(url.action , datos,this.requestOptions) ;
    }
 setEmpresas(){
        let datos = {"action": actions.actionEmpresasOdoo  };
      console.log('servicios maestro Cliente - setTiposDocumentos ' ,url.action , datos,this.requestOptions);
       return this.http.post(url.action , datos,this.requestOptions) ;
    }
    async getTipoDoc(){
        try {
            const maestroService = await  this.setTipoDocumentoOdoo();
            const retorno = await maestroService 
            console.log('retorno - getTipoDoc', retorno); 
            this.crearMaestrosDatos(retorno ,'asdfasdf');
           console.log('estoy en getTipoDoc',this.MaestrosCliente);
        } catch (error) {
            throw new Error(`Error al leer getTipoDoc : ${error}`);
          }}
          
    async getMaestrosClientes(){
        try {
            const maestroService = await  this.setMaestrosClientes_new();
            const retorno = await maestroService 
            console.log('retorno', retorno); 
            this.crearMaestrosDatos(retorno);
           console.log('estoy en pruebaget',this.MaestrosCliente);
        } catch (error) {
            throw new Error(`Error al leer maestros : ${error}`);
          }}

    crearMaestrosDatos(datos:any , tipo:any = null){ 
        this.finP1 = true; 
        this.MaestrosCliente = [];
         console.log('crearMaestrosDatos',datos);
         let idActual = 0;
         datos.data.forEach((datoMaestro:maestroSelect)=>{
            if (idActual !== datoMaestro.id){
                idActual = datoMaestro.id;

                if ( tipo  !== null){
                    let desc = '';
                    if (datoMaestro.display_name )
                      desc = datoMaestro.display_name ;
                    this.MaestrosCliente.push(
                        {
                            "id" :  this.MaestrosCliente.length ,
                            "nombre" : 'tipo_doc',
                            "descripcion" : desc  ,
                            "datos" :[]
                        }
                    )

                }else{
                this.MaestrosCliente.push(
                    {
                        "id" : datoMaestro.id ,
                        "nombre" : (datoMaestro.id_maestro)?datoMaestro.id_maestro:'' ,
                        "descripcion" : datoMaestro.descripcion  ,
                        "datos" :[]
                    }
                ) }
            }
            const isLargeNumber = (element:any) => element.id === datoMaestro.id ; 
            console.log('this.MaestrosCliente' , this.MaestrosCliente , 'datoMaestro', datoMaestro);
        
        
        })
         
        console.log('esto es maestro cliente ' , this.MaestrosCliente);
        
            this.loading.hide(); 
            return true;
     };

    
    

 
       getMaestroClientes(nomMaestro:string){ 
         console.log('getMaestroClientes ',this.MaestrosCliente, nomMaestro);
         let datosRetorno:any[] = []; 
            this.MaestrosCliente.forEach(
                (value:any )=>{
                console.log('getMaestroClientes',value ,value.nombre, nomMaestro);
                 if(value.nombre === nomMaestro){   
                    console.log('envio' , value);  
                    datosRetorno =  value.datos;
                }
                
            });
            return datosRetorno ; 
    }
}
 
