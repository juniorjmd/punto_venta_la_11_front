import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { select } from 'src/app/interfaces/generales';
import { errorOdoo, OdooPrd } from 'src/app/interfaces/odoo-prd';

import { loading } from 'src/app/models/app.loading';
import { DocumentosModel } from 'src/app/models/documento.model';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';
import { Documento } from '../../../interfaces/documento.interface';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.css']
})
export class BuscarProductosComponent implements OnInit {
  parceros : OdooPrd[] = [];
  prdBusqueda!: OdooPrd;
  codPrd:string ;  
  show = false ;
  show_reemplazo = false;
  DocumentoActivo:DocumentosModel;
  cantidadPrd:number ;  
  disabled:boolean[];loading = new loading();
  constructor(   private prdService : ProductoService,
    
    public dialogo: MatDialogRef<BuscarProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public codPrdInser:{codigo:string , doc:DocumentosModel} ) { 
      console.clear()
      this.cantidadPrd = 0 ;
      this.codPrd =  codPrdInser.codigo ;
      this.DocumentoActivo =  codPrdInser.doc ;
      console.log('busquedaprd - documento',codPrdInser);
      
      this.buscarProducto();
      this.disabled = [true,true,true,true,true,true,true,true,true,true];
    }

  ngOnInit(): void {
  }
  addCnt(cnt:number){
    this.cantidadPrd += cnt ;
    if (this.prdBusqueda.cantidad! < this.cantidadPrd){
       this.cantidadPrd =  this.prdBusqueda.cantidad! ;
    }
  }

  enviarCnt( cnt:number ){
    this.disabled = [true, true, true, true, true, true, true, true, true, true];
    this.cantidadPrd  += cnt ;
    if ( this.cantidadPrd > 0 && this.prdBusqueda.cantidad! >= this.cantidadPrd){  
            this.prdBusqueda.cantidadVendida = this.cantidadPrd;
            this.loading.show() 
            this.prdService.guardarPrdCompra(this.prdBusqueda ).subscribe({ next:
              (respuesta:any|select)=>{
                if (respuesta.error !== 'ok'){
                    Swal.fire(  'ERROR',respuesta.error, 'error') ;
                    console.log(JSON.stringify(respuesta));
                    this.dialogo.close(false); 
                  }
                  else{ this.dialogo.close(true); 
                    console.log('productoVendido',JSON.stringify(respuesta));}
                  this.loading.hide() 

                },error : 
                (error:errorOdoo) =>{
                  console.log(JSON.stringify( error) );
                  
                  alert(error.error.error +"\n" + error.error.msg); 
                  this.dialogo.close(false); 
                  this.loading.hide() 
                } } ) 
       
        
    }
  }

   
   buscarProducto(){
    console.clear()
    this.loading.show() 
    this.prdService.getProductosCodBarrasVCnt(this.codPrd  ).subscribe(
      {next :  (respuesta:any|select)=>{
        if (respuesta.error === 'ok'){
           if (respuesta.numdata > 0 ){ 
console.log('getProductosCodBarrasVCnt',respuesta.data[0]);
           this.prdBusqueda =  respuesta.data[0] ; 
            if(typeof(this.prdBusqueda.impuestos) === 'string')
            this.prdBusqueda.impuestos =JSON.parse(this.prdBusqueda.impuestos );
         // debugger
    this.prdBusqueda.precio_sin_iva =   parseFloat( (this.prdBusqueda.lst_price / (1 + ( this.prdBusqueda.impuestos![0].amount /100))).toFixed(2) ) ;
    this.prdBusqueda.valor_del_iva = parseFloat( (this.prdBusqueda.lst_price  - this.prdBusqueda.precio_sin_iva ).toFixed(2) );
    if(!Number.isInteger(this.prdBusqueda.descuento)){
      this.prdBusqueda.descuento = 0;
    }
    this.prdBusqueda.cantidad= 0;

    respuesta.data.forEach((element:any) => {
     if( element.bodega == this.DocumentoActivo.idStockOdooPOS ){
      this.prdBusqueda.cantidad= element.cantidad_real;
      this.prdBusqueda.codigoExistencia= element.idExistencia;
     }
    });

    



           if(this.prdBusqueda.cantidad! >= 10 ){
            this.disabled = [false ,false ,false ,false ,false ,false ,false ,false ,false ,false ];
           }else{
             switch (this.prdBusqueda.cantidad ){
              case 0 : 
                this.disabled = [true, true, true, true, true, true, true, true, true, true];
              break;
              case 1 : 
                this.disabled = [false ,true, true, true, true, true, true, true, true, true];
              break;
              case 2 : 
                this.disabled = [false ,false ,true, true, true, true, true, true, true, true];
              break;
              case 3 : 
                this.disabled = [false ,false ,false ,true, true, true, true, true, true, true];
              break;
              case 4 : 
                this.disabled = [false ,false ,false ,false ,true, true, true, true, true, true];
              break;
              case 5 : 
                this.disabled = [false ,false ,false ,false ,false ,true, true, true, true, true];
              break;
              case 6 : 
                this.disabled = [false ,false ,false ,false ,false ,false ,true, true, true, true];
              break;
              case 7 : 
                this.disabled = [false ,false ,false ,false ,false ,false ,false ,true, true, true];
              break;
              case 8 : 
                this.disabled = [false ,false ,false ,false ,false ,false ,false ,false ,true, true];
              break;
              case 9 : 
                this.disabled = [false ,false ,false ,false ,false ,false ,false ,false ,false ,true];
              break;
              case 10 : 
                this.disabled = [true, true, true, true, true, true, true, true, true, false ];
              break;
             }  
            
           }
           this.parceros = respuesta.prodReemplazo ;
          this.show = true;  

           }else{alert('la busqueda no genero ningun resultado')
               this.dialogo.close(true);
              }

          /****** */
           
          //this.dialogo.close(true);
         }else{
           Swal.fire(  'ERROR',respuesta.error, 'error') ;
         } 
         console.log('getProductosCodBarrasVCnt',JSON.stringify(respuesta));
         this.loading.hide();
        
         },
         error : error => {this.loading.hide();
           Swal.fire(
          'ERROR',error.error.error,
          'error');
         } }
    );
   }

}
