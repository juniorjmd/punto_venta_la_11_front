import { Component, OnInit } from '@angular/core';
import { MaestroClienteServices } from '../../../services/MaestroCliente.services';
import { loading } from 'src/app/models/app.loading';
import { dfltAnswOdoo, dfltAnswOdoo2 } from 'src/app/interfaces/clientes-odoo'; 
import { ProductoService } from 'src/app/services/producto.service';
import { OdooPrd, responsePrd } from 'src/app/interfaces/odoo-prd';
import { MatDialogRef } from '@angular/material/dialog';
import { select } from 'src/app/interfaces/generales';
import Swal from 'sweetalert2';
import { faMousePointer } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-buscar-prod-directo',
  templateUrl: './buscar-prod-directo.component.html',
  styleUrls: ['./buscar-prod-directo.component.css']
})
export class BuscarProdDirectoComponent  {
  show = false ;
  faMousePointer = faMousePointer;
  textFindMarcas:string = '';
  textFindProductos:string = '';
  parceros : OdooPrd[] = [];
  prdBusqueda!: OdooPrd;
  listPrdBusqueda :OdooPrd[] = [];
  respuestaDialog:responsePrd = {  "confirmado": false, 
  "datoDevolucion":this.listPrdBusqueda[0]};
  codPrd!:string ;   
  cantidadPrd!: number;  
  disabled:boolean[] = [];
  //--------------------
  marcas:dfltAnswOdoo2[] = [];
  marcasAux:dfltAnswOdoo2[] = [];
  categorias:dfltAnswOdoo2[] = [];
  loading = new loading();
  constructor( public dialogo: MatDialogRef<BuscarProdDirectoComponent>
    , private prdService : ProductoService,
    private MaestroClienteServices :MaestroClienteServices) {
    this.buscarProductos();
    this.getCategorias();
    this.getMarcas();
   }
   getProductosPorFiltro(){
    console.log('busqueda productos inicial' ); 
     this.loading.show() 
     this.listPrdBusqueda = [];
     this.prdService.getProductosPorNombre(30 ,this.textFindProductos ).subscribe(
      {next:(respuesta:any|select)=>{
         if (respuesta.error === 'ok'){
            if (respuesta.numdata > 0 ){
              this.listPrdBusqueda =  respuesta.data;
  
            }else{alert('la busqueda no genero ningun resultado') 
               } 
          }else{
            Swal.fire(  'ERROR',respuesta.error, 'error') ;
          } 
          console.log('getProductosPorCategoria',JSON.stringify(respuesta));
          this.loading.hide();
         
          },
          error:error => {this.loading.hide();
            Swal.fire(
          'ERROR',error.error.error,
          'error');
          } }
     );
    }
   buscarProductos(){
    console.log('busqueda productos inicial' ); 
     this.loading.show() 
     this.listPrdBusqueda = [];
     this.prdService.getProductosGeneral(15).subscribe(
      {next:(respuesta:any|select)=>{
         if (respuesta.error === 'ok'){
            if (respuesta.numdata > 0 ){
              this.listPrdBusqueda =  respuesta.data;
  
            }else{alert('la busqueda no genero ningun resultado') 
               } 
          }else{
            Swal.fire(  'ERROR',respuesta.error, 'error') ;
          } 
          console.log('getProductosPorCategoria',JSON.stringify(respuesta));
          this.loading.hide();
         
          },
          error:error => {this.loading.hide();
            Swal.fire(
          'ERROR',error.error.error,
          'error');
          } }
     );
    }
   buscarPorCategoria(categoria:dfltAnswOdoo2){
    this.listPrdBusqueda = [];
     console.log('categoria' , categoria); 
      this.loading.show() 
      this.prdService.getProductosPorCategoria(categoria.dato ).subscribe(
        {next:(respuesta:any|select)=>{
          if (respuesta.error === 'ok'){
             if (respuesta.numdata > 0 ){

              respuesta.data.forEach((value:any,index:number) => {
                 value.precio_sin_iva =   parseFloat( (value.lst_price / (1 + ( value.impuestos[0].amount /100))).toFixed(2) ) ;
                 value.valor_del_iva = parseFloat( (value.lst_price  - value.precio_sin_iva ).toFixed(2) );
                if(!Number.isInteger(value.descuento)){
                  value.descuento = 0;
                }
                this.listPrdBusqueda[index] = value ;  
              }); 
   
             }else{alert('la busqueda no genero ningun resultado') 
                } 
           }else{
             Swal.fire(  'ERROR',respuesta.error, 'error') ;
           } 
           console.log('getProductosPorCategoria',JSON.stringify(respuesta));
           this.loading.hide();
          
           },
           error: error => {this.loading.hide();
             Swal.fire(
          'ERROR',error.error.error,
          'error');
           } }
      );
     }
     enviarProducto(prd:OdooPrd){
      this.respuestaDialog.confirmado = true;
      this.respuestaDialog.datoDevolucion = prd;

      this.dialogo.close(this.respuestaDialog);
     }
   buscarPorMarca(marca:dfltAnswOdoo2){
     
    this.listPrdBusqueda = [];
    console.log('marca' , marca);
    this.loading.show() 
      this.prdService.getProductosPorMarca(marca.dato ).subscribe(
         {next:(respuesta:any|select)=>{
          if (respuesta.error === 'ok'){
             if (respuesta.numdata > 0 ){

              respuesta.data.forEach((value:any,index:number) => {
                 value.precio_sin_iva =   parseFloat( (value.lst_price / (1 + ( value.impuestos[0].amount /100))).toFixed(2) ) ;
                 value.valor_del_iva = parseFloat( (value.lst_price  - value.precio_sin_iva ).toFixed(2) );
                if(!Number.isInteger(value.descuento)){
                  value.descuento = 0;
                }
                this.listPrdBusqueda[index] = value ;  
              }); 
   
             }else{alert('la busqueda no genero ningun resultado') 
                } 
           }else{
             Swal.fire(  'ERROR',respuesta.error, 'error') ;
           } 
           console.log('getProductosPorMarca',JSON.stringify(respuesta));
           this.loading.hide();
          
           },
           error:error => {this.loading.hide();
             Swal.fire(
          'ERROR',error.error.error,
          'error');
           } }
      );

   }
   //BUSCAR_MARCAS
   
   getCategorias(){  this.loading.show()
    this.MaestroClienteServices.getCategoriasPrdAux().subscribe((datos:any|select)=>{     
      this.categorias = datos.data;          
      this.loading.hide() ;
      console.log('categorias ',this.categorias);
    });

  }
  getMarcas(){  this.loading.show()
    this.MaestroClienteServices.getMarcasPrdAux().subscribe(
      (datos:any|select)=>{
       console.log('setMarcas ODDO' , JSON.stringify(datos)); 
      this.marcas =datos.data; 
      this.marcasAux = this.marcas;
      console.log('marcas',this.marcas);
      
      this.loading.hide() ;
    });

  }
  getMarcasPorFiltro(){
    //this.marcasAux = this.marcas;
    let marcas3 : dfltAnswOdoo2[] = [];
    let cont = 0;
    let auxTxt = this.textFindMarcas.trim().toUpperCase();
    if (  auxTxt === '')
     { this.marcas = this.marcasAux} 
     else{

      this.marcas.forEach( ( value:dfltAnswOdoo2) =>{
        console.log(value.label,value.label.indexOf(auxTxt));
        
        if ( value.label.toUpperCase() === auxTxt || value.label.toUpperCase().indexOf(auxTxt) >= 0){
        // console.log(cont,value);
         
          marcas3[cont] = value ; 
          cont++;
        }
      })
     // console.log(marcas3);
      this.marcas = marcas3;
     }
  }
  getMarcasCategoria(id:number){ 
    this.MaestroClienteServices.setMarcasCatego(id).subscribe((datos:any|select)=>{
       console.log('setMarcas ODDO' , JSON.stringify(datos));
      this.loading.show()
      this.marcas = [];
      datos.data.forEach((value:any,index:number)=>{
        console.log('value' , value,'index',index);
        
       /* this.categorias[index].dato = value.id;
        this.categorias[index].label = value.display_name;*/
        this.marcas.push({
          "dato": value.id,
          "label":value.display_name,
          "color":value.color,
        })  
    
      }) 
      console.log(this.categorias);
      
      this.loading.hide() ;
    });

  }

}
