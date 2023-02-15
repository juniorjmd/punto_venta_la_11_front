import { Component, Inject, OnInit } from '@angular/core';
import { ClientesOdoo, dfltAnswOdoo } from 'src/app/interfaces/clientes-odoo'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { CiudadModel } from 'src/app/models/maestros.model';
import { MaestroClienteServices } from 'src/app/services/MaestroCliente.services'; 
import { loading } from 'src/app/models/app.loading'; 
import { BuscarProductosComponent } from '../../pos/buscar-productos/buscar-productos.component';
import { DocumentosModel } from 'src/app/models/documento.model';
import {ClientesService} from 'src/app/services/Clientes.services'
import { select } from 'src/app/interfaces/generales';
import Swal from 'sweetalert2';
import { faCheckDouble, faEdit, faPlus, faFileAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fnd-cliente',
  templateUrl: './fnd-cliente.component.html',
  styleUrls: ['./fnd-cliente.component.css']
})
export class FndClienteComponent implements OnInit {

  indexPais:number = -1;
  Ciudades:any[] = [];
  paises:any[] = [];
  tipo_direccion:any[] = [];
  companias:any[]  = [];
  Provincias:any[] = [];
  titulos:any[] = [];
  categorias:any[] = [];
  tipo_identificacion:any[] = [];
  tipo_identificacionA:any[] = [] ;
  NwCliente!: ClientesOdoo ; 
  indexDepa:number = -1;
  indexCity:number=-1;
  cityN:CiudadModel = new CiudadModel();
  busqueda:boolean = true;
  crear:boolean = true ; 
  loading = new loading();



  facheckdouble = faCheckDouble ; 
  faedit= faEdit ; 
  faplus= faPlus ; 
  fafilealt= faFileAlt ; 
  constructor(   private MaestroClienteServices :MaestroClienteServices ,
    public dialogo: MatDialogRef<BuscarProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public documentoActivo:DocumentosModel ,
    private clientesService:ClientesService       
    ) { 
    
    this.cancelar();
    this.setMaestros();
    
    //this.MaestroClienteServices.prueabaGetM();
  }
  buscarCliente(){
    this.loading.show() 
    //this.documentoActivo.orden;
  this.clientesService.getClienteOdooPorCedula(this.NwCliente).subscribe(
     (respuesta:any|select)=>{
      let cont = 0;
       console.log('getClientesOdooPorCedula',respuesta); 
       if (respuesta.error === 'ok'){
        this.busqueda = false;
         if (respuesta.numdata > 0)
         {
           this.crear = false;
         this.NwCliente= respuesta.data[0];
         let tp:any[] ;
         tp = []  ;
         tp[0] = this.NwCliente.l10n_latam_identification_type_id[0];
         tp[1] = this.NwCliente.l10n_latam_identification_type_id[1]; 
         this.tipo_identificacionA= tp;          
         this.gettipoDocuOdoo(); 
         if(this.NwCliente.country_id[0] > 0){
           this.paises.forEach((val,i)=>{
             if (val[0] === this.NwCliente.country_id[0] ){
               this.indexPais = i; 
             }
           })
        }
        if(this.NwCliente.state_id[0] > 0){
           this.Provincias.forEach((val,i)=>{
             if(val[0] === this.NwCliente.state_id[0]){
               this.indexDepa = i;
             }
           })
        }
        if(this.NwCliente.city!== false){
           this.Ciudades.forEach((val,i)=>{
             console.log(val , i );
             let auxCity ;
             auxCity = this.NwCliente.city.toString();
              if(val[1].trim().toUpperCase() === auxCity.trim().toUpperCase() ){
                this.indexCity = i;
              }
           })
        }else{
          if(this.NwCliente.zip !==false){
             this.Ciudades.forEach((val,i)=>{
              if(val[2] === this.NwCliente.zip){
                this.indexCity = i;
              }
           })
          }
        }
        console.log('indexCity',this.indexCity);
        this.asignarCiudad();
      }

       }else{
         Swal.fire(  'ERROR',respuesta.error, 'error') ;
       }
       this.loading.hide();
  })}

actualizarCliente(){

  this.loading.show() 
  //this.documentoActivo.orden;
this.clientesService.updateClienteOdoo(this.NwCliente).subscribe(
   (respuesta:any|select)=>{ 
     if (respuesta.error === 'ok'){ 
       alert('datos actualizados con exito!!!')

     }else{
       switch(respuesta.error){
         case 'ok_no_existe' :
          alert('El cliente no existe en odoo!!');
           break;
           default :
           Swal.fire(  'ERROR',respuesta.error, 'error') ;
           break; 
       }
      
     }
     this.loading.hide();
})
}

pasarClienteAcontrolYasignarDocumento(){
  this.NwCliente.display_name = this.NwCliente.name;
  this.NwCliente.parent_id = false;
  this.NwCliente.company_type = "person";
  this.NwCliente.is_company = false;
  if(this.NwCliente.street2 == ''){this.NwCliente.street2 = false;}
  if(this.NwCliente.category_id == ''){this.NwCliente.category_id = false;}
  if(this.NwCliente.title == ''){this.NwCliente.title = false;}
  this.loading.show() 
  //this.documentoActivo.orden;
this.clientesService.pasarClienteOdooACntYasignarDoc(this.NwCliente , this.documentoActivo ).subscribe(
   (respuesta:any|select)=>{
    let cont = 0;
     console.log('getClientesOdooPorCedula',respuesta); 
     if (respuesta.error === 'ok'){
       alert('el cliente ha sido transportado con exito y asignado al documento!!')
       
       this.dialogo.close(true);
      
     }else{
       switch(respuesta.error){
        case 'ok_ya_existe_control' :
          alert('El cliente ya existe en control y ha sido actulizado!!');
          this.dialogo.close(true);
        break;
        case 'ok_no_existe_en_odoo' :
          alert('El cliente de estar creado primeramente en odoo!!');
        break;
        default :
           Swal.fire(  'ERROR',respuesta.error, 'error') ;
        break; 
       }
      
     }
     this.loading.hide();
})
}
crearCliente(){

  this.NwCliente.display_name = this.NwCliente.name;
  this.NwCliente.parent_id = false;
  this.NwCliente.company_type = "person";
  this.NwCliente.is_company = false;
  if(this.NwCliente.street2 == ''){this.NwCliente.street2 = false;}
  if(this.NwCliente.category_id == ''){this.NwCliente.category_id = false;}
  if(this.NwCliente.title == ''){this.NwCliente.title = false;}
  this.loading.show() 
  //this.documentoActivo.orden;
this.clientesService.setClienteOdoo(this.NwCliente).subscribe(
   (respuesta:any|select)=>{
    let cont = 0;
     console.log('getClientesOdooPorCedula',respuesta); 
     if (respuesta.error === 'ok'){
       alert('Datos creados con exito!!')

     }else{
       switch(respuesta.error){
         case 'ok_no_insert' :
          alert('El cliente ya existe en odoo!!');
           break;
           default :
           Swal.fire(  'ERROR',respuesta.error, 'error') ;
           break; 
       }
      
     }
     this.loading.hide();
})
}


  cancelar(){
    this.NwCliente = { "id": 0,   
    "name": '',
    "parent_id": false,
    "display_name": '',
    "company_type": "",
    "is_company": 'No',
    "email": '',
    "mobile": '',
    "phone": '',
    "type": 'contact',
    "vat": '',
    "lang": '',
    "street": '',
    "city": '',
    "street2": '',
    //-----------------------------
    "state_id": [],
    "zip": '',
    "country_id": [],
    "function": '',
    "category_id": '',
    "title": '',
    "l10n_latam_identification_type_id":false
  }
  if(this.tipo_identificacionA[0] > 0){
this.NwCliente.l10n_latam_identification_type_id = this.tipo_identificacionA ;
  }
  console.log('tipo iden auxili',this.tipo_identificacionA );
  
  }
  async setMaestros(){
    this.loading.show() 
   let result = await this.MaestroClienteServices.getMaestrosClientes();
    console.log('termino el trabajo');
     
    this.tipo_direccion = this.MaestroClienteServices.getMaestroClientes('tipo_direccion'); 
    console.log(this.tipo_direccion);
    
    this.companias =  [];
    this.Provincias =  this.MaestroClienteServices.getMaestroClientes('provincias');
    this.titulos =  this.MaestroClienteServices.getMaestroClientes('titulos');
    this.categorias =  this.MaestroClienteServices.getMaestroClientes('categorias'); 
    this.loading.hide() 
this.gettipoDocuOdoo(); 
this.getEmpresas();
this.getCategorias();

  //  this.tipo_identificacion =   this.MaestroClienteServices.getMaestroClientes('tipo_identificacion');
    console.log('tipo_direccion',this.tipo_direccion);
    this.cancelar();
    this.getPaises();
    this.getTitulos();
    this.muestraCliente();
    
  }
  getEmpresas(){ 
    this.MaestroClienteServices.setEmpresas().subscribe((datos:any|select)=>{
     // console.log('EMPRESAS ODDO' , JSON.stringify(datos));
      
      datos.data.forEach((value:any)=>{
        
        this.companias.push({
        "dato": value.id,
        "label":value.display_name,
      })  
      })  
    });

  }
  
  getTitulos(){ 
    this.MaestroClienteServices.setTitulos().subscribe((datos:any|select)=>{
     // console.log('EMPRESAS ODDO' , JSON.stringify(datos));
      
      datos.data.forEach((value:any)=>{
        
        this.titulos.push({
        "dato": value.id,
        "label":value.display_name,
      })  
      })  
    });

  }
  
  getCategorias(){ 
    this.MaestroClienteServices.setCategorias().subscribe( (datos:any|select)=>{
       console.log('setCategorias ODDO' , JSON.stringify(datos));
      this.loading.show()
      datos.data.forEach((value:any)=>{
        
        this.categorias.push({
        "dato": value.id,
        "label":value.display_name,
      })  
      }) 
      this.loading.hide() ;
    });

  }
  gettipoDocuOdoo(){
    console.clear();
    let tp : any[] ;
    this.loading.show() 
    this.tipo_identificacion =[];
    this.MaestroClienteServices.setTiposDocumentos().subscribe((datos: any|select)=>{
      this.loading.show();
      datos.data.forEach((value:any)=>{
        tp = []; 
        tp[0] = value.id;
        tp[1] = value.display_name ; 
        this.tipo_identificacion.push(tp) 
      if (value.display_name.toUpperCase() === 'CÉDULA DE CIUDADANÍA' ||  value.display_name.toUpperCase() === 'CEDULA DE CIUDADANIA' && this.NwCliente.l10n_latam_identification_type_id === false )
      { 
        this.tipo_identificacionA= tp;
      } 
      }) 
        
    //  if ( this.NwCliente.l10n_latam_identification_type_id === false)
      //{
        this.NwCliente.l10n_latam_identification_type_id = this.tipo_identificacionA;
      //}
      this.loading.hide() 
    });
 
  }

  muestraCliente()
  {
    console.log('change nuevo cliente<',this.NwCliente);
    
  }
  getCiudad(){
    if(this.indexDepa>=0){
    this.indexCity=-1;
    this.loading.show() 
    this.NwCliente.state_id = this.Provincias[this.indexDepa] ; 
    this.Ciudades = [];  
    this.MaestroClienteServices.getCiudadesPorDepartamentoOdoo(this.NwCliente.state_id[0]).subscribe( (datos:any|select)=>{
      
      datos.data.forEach((value:any,index:number)=>{        
      this.Ciudades.push([value.id, value.display_name  , value.city_code ]) 
      if (value.display_name.trim().toUpperCase() === 'SANTA MARTA'){  
        this.indexCity =  index;
       // console.log('entro ciudad escogida' , this.indexCity)
      }
      }) 
      if (this.indexCity>=0){
        this.NwCliente.city = this.Ciudades[this.indexCity][1];
        this.NwCliente.zip = this.Ciudades[this.indexCity][2];
      }
  
    this.loading.hide() 
    })}}
    asignarCiudad(){
      if(this.indexCity>=0){
        this.NwCliente.city = this.Ciudades[this.indexCity][1];
        this.NwCliente.zip = this.Ciudades[this.indexCity][2];
      }else{
        this.NwCliente.city = false;
        this.NwCliente.zip = false;
      }
    }
    compararTipoId( tipo1:any[], tipo2:any[]) {
      if (tipo1==null || tipo2==null) {
      return false;
      } 
      
      return tipo1[0]===tipo2[0];
      }
      
  getPaises(){
    /*this.paises = [ {    "dato": 0 ,
   "label":'País'}];*/
   this.loading.show() 
   let selPais:any[];
   this.paises = [];
    this.MaestroClienteServices.getPaisesOdoo().subscribe( (datos:any|select)=>{ 
    datos.data.forEach((value:any,indexAux:number)=>{
      
    this.paises.push([
       value.id, value.display_name 
    ])
     if (  value.display_name.toUpperCase()  == 'COLOMBIA'){
      selPais = [value.id , value.display_name] ;
      this.indexPais=indexAux; 
    } 
    }) 
    
    this.NwCliente.country_id = selPais ;

    this.NwCliente.state_id = []; 
    
    if (selPais[0] > 0){
      this.getDepartamento();
    }
    this.loading.hide() 
  })
}
  getDepartamento(){
    this.loading.show() 
    this.paises;
    this.NwCliente.country_id = this.paises[this.indexPais]; 
    let selDEP:any[] =[];
    this.Provincias = [];
    this.Ciudades = [];
    this.MaestroClienteServices.getDepartamentosPorPaisOdoo(this.NwCliente.country_id[0]).subscribe( (datos:any|select)=>{
      datos.data.forEach((value:any, index:number)=>{
        if (  value.display_name.toUpperCase()  === 'MAGDALENA (CO)'){
          selDEP = [   value.id, value.display_name ];
          this.indexDepa = index ;
        }
        
      this.Provincias.push([   value.id, value.display_name ]
     
       )
      })

      this.NwCliente.state_id = selDEP; 
    if ( this.indexDepa  >= 0){
      this.getCiudad(); 
    }
    this.loading.hide() 
    })
  }
  ngOnInit(): void { 
     
     
  }

}
