import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { loading } from 'src/app/models/app.loading';
import { select } from 'src/app/interfaces/generales.interface';
import { DocumentosModel } from 'src/app/models/documento.model';
import { DocumentoService } from 'src/app/services/documento.service';
import { MatDialog } from '@angular/material/dialog';
import { OdooPrd, responsePrd } from 'src/app/interfaces/odoo-prd';
import { MoverDocumentosComponent } from '../mover-documentos/mover-documentos.component';
import { BuscarProductosComponent } from '../buscar-productos/buscar-productos.component';
import { DocumentoListado } from 'src/app/interfaces/documento.interface';
import { ProductoService } from 'src/app/services/producto.service';
import { errorOdoo } from 'src/app/interfaces/odoo-prd';
import { MediosDePago } from 'src/app/interfaces/medios-de-pago.interface';
import { cajasServices } from 'src/app/services/Cajas.services';
import { DocpagosModel, pagosModel } from 'src/app/models/pagos.model';
import { PagosVentaComponent } from '../pagos-venta/pagos-venta.component';
import { printer, url } from 'src/app/models/app.db.url';
import { ConectorPlugin } from 'src/app/models/app.printer.con';
import { BuscarProdDirectoComponent } from '../buscar-prod-directo/buscar-prod-directo.component';
import { FndClienteComponent } from '../../cliente/fnd-cliente/fnd-cliente.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements AfterViewInit  {
  pagos:pagosModel[] =[]  ;
  indexEfectivo:number;
  focus:boolean;
  MedioP:MediosDePago[]=[];
  buscarClose : boolean = true;
  codigoProducto:string;
  vueltas:boolean = false;
  documentos : DocumentosModel[] = [];
  documentoActivo : DocumentosModel = new DocumentosModel();
  documentoRetorno : DocumentosModel = new DocumentosModel();
  documentoSeleccionadoActivo : DocumentosModel = new DocumentosModel(); 
  @ViewChild('codProd') codProdlement: ElementRef;
  constructor( public loading : loading,private serviceCaja : cajasServices ,
    private newAbrirDialog : MatDialog,
    private documentoService : DocumentoService,
    private productoService : ProductoService,
    
 ) {  
   
  
    this.getDocumentos(); 
  }
  ngAfterViewInit(): void {
    this.irbuscarProducto();
    this.getMediosP();
  }
  busquedaAuxiliarProducto( ){ 
 
      this.buscarClose = false ;
      this.newAbrirDialog.open(BuscarProdDirectoComponent ,{data:this.codigoProducto })
      .afterClosed()
      .subscribe(( response:responsePrd  )=>{
        console.log(response);
        
        if (response.confirmado){
         
          console.log('dato retornado busqueda directa',response.datoDevolucion);
          this.codigoProducto = response.datoDevolucion.id.toString();
            this.buscarClose = false ;
            this.newAbrirDialog.open(BuscarProductosComponent ,{data: response.datoDevolucion.id.toString() })
            .afterClosed()
            .subscribe((confirmado: Boolean)=>{ 
              this.crearDocumento();
              this.codigoProducto = ''; 
              this.buscarClose = true;
            })  
          
        }else{ 
          this.codigoProducto = '';
          this.irbuscarProducto();
         
        }  
      })  
    
  }

  async printer_factura_final()
  { let fecha = new Date();
     let dayOfMonth = fecha.getDate();
    let month = fecha.getMonth() + 1;
    let year = fecha.getFullYear();
    let hour = fecha.getHours();
    let minutes = fecha.getMinutes(); 
    let auxStr:string;
let fechaStr =  dayOfMonth + "/" + month +"/" + year +' '+ hour +':'+minutes;
    this.documentoRetorno = this.documentoActivo
   let nombreImpresora = printer.namePrinterGenerico;
   if (!nombreImpresora) return console.log("Selecciona una impresora");
   let conector = new ConectorPlugin(null);
   conector.cortar();
   conector.establecerTamanioFuente(1, 1);
   conector.establecerEnfatizado(0);
   conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
   conector.imagenDesdeUrl(url.brand + "/logoCobegisa.PNG")
   conector.texto( this.documentoRetorno.nombreEsta + "\n");
   conector.texto( 'Vende : '+this.documentoRetorno.vendedorNombre + "\n" ); 
   conector.texto("Fecha/Hora:"+fechaStr+ "\n");
   conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);
   conector.texto( "     Resolucion:"+ this.documentoRetorno.resolucion + "\n" ); 
   conector.texto( "     Desde :"+ this.documentoRetorno.consecutivoDesde +" Hasta :"+ this.documentoRetorno.consecutivoHasta + "\n" ); 
   conector.texto( "     Fecha:"+ this.documentoRetorno.fechaInicioResolucion  +" Hasta :"+this.documentoRetorno.fechaFinResolucion + "\n" ); 
   conector.texto("--------------------------------\n"); 
   conector.texto("Factura "+this.documentoRetorno.idDocumentoFinal + "\n");
   conector.texto("--------------------------------\n");
   this.documentoRetorno.listado.forEach((lista:DocumentoListado)=>{
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);
    conector.texto(lista.nombreProducto + "\n");
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha);    
    conector.texto( "Precio     cnt  dest     total\n");
    conector.texto(lista.presioVenta + " " );
    conector.texto(lista.cantidadVendida+ " ");
    conector.texto(lista.descuento+ " ");
    conector.texto(lista.valorTotal+ "\n\n");
   })
  
   conector.texto("--------------------------------\n");
   auxStr =  this.documentoRetorno.valorParcial.toString() ;  
   conector.texto("Valor Parcial  :  "+auxStr.padStart( 16  , ' ' )+ "\n");
   auxStr =  this.documentoRetorno.valorIVA.toString() ;  
   conector.texto("          IVA  :  "+auxStr.padStart( 16  , ' ' )+ "\n");
   auxStr =  this.documentoRetorno.valorTotal.toString() ;  
   conector.texto("Total Factura  :  "+auxStr.padStart( 16  , ' ' )+ "\n");
   auxStr =  this.documentoRetorno.totalFactura.toString() ;  
  // conector.texto("        TOTAL  :  "+auxStr.padStart( 16  , ' ' )+ "\n");
   conector.texto("--------------------------------\n\n");
   conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
   conector.texto("Medios de Pago\n");

   this.documentoRetorno.pagos.forEach((pagos:DocpagosModel)=>{
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);
    conector.texto("      "+pagos.nombreMedio + "\n");
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha);
    conector.texto(pagos.valorPagado+ "      \n");
    if (pagos.valorRecibido > 0 ){
      conector.texto( "Recibido           vueltos\n");
    conector.texto(pagos.valorRecibido + '           '+pagos.vueltos+ "\n");
    }else{
      conector.texto( "Referencia                \n");
    conector.texto('           '+pagos.referencia +"\n");
    }
    
   })
   conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
   conector.texto("***Gracias por su compra***\n");
   
   conector.feed(4)

   conector.abrirCajon() // Abrir cajón de dinero. Opcional
   conector.cortar()
   const respuestaAlImprimir = await conector.imprimirEn(nombreImpresora);
   if (respuestaAlImprimir === true) {
       console.log("Impreso correctamente");
   } else {
       console.log("Error. La respuesta es: " + respuestaAlImprimir);
   }
  } 
  getMediosP(){ 
  this.loading.show()
  this.serviceCaja.getMediosCajaActiva()
     .subscribe(
      (datos:select)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:MediosDePago , index )=>{
        this.MedioP[index] =   dato ;
        this.pagos[index] = new pagosModel();
        this.pagos[index].idMedioDePago = dato.id;
        if (dato.nombre === 'Efectivo')
       { this.indexEfectivo = index;
          this.pagos[index].valorPagado = this.documentoActivo.totalFactura;}
        else
        {this.pagos[index].valorPagado = 0;}
      }) 
      console.log(this.MedioP);
    }else{
      this.MedioP = [];
    }
    console.log('medios de pago' , this.MedioP );
        this.loading.hide()
      } ,
      error => {this.loading.hide();
        Swal.fire(
          'ERROR',error.error.error,
          'error');
      }
      );
  }
  generarEnvio(){ 
    if(this.documentoActivo.totalFactura <= 0){
      alert('El valor en la factura debe ser mayor a cero');
      return;
    }
    console.log('cliente',this.documentoActivo.cliente)
    if(this.documentoActivo.cliente === 0 ){
      
        this.newAbrirDialog.open(FndClienteComponent,{data:this.documentoActivo })
        .afterClosed()
        .subscribe((confirmado: Boolean)=>{
          this.generarDomicilio()
          this.buscarClose = true;

        })   
    }else{this.generarDomicilio()}

  }

  generarDomicilio(){
    this.loading.show() 
  this.documentoService.generarDomicilioDocumento(this.documentoActivo.orden).subscribe(
    (respuesta:select)=>{
      let cont = 0;
       console.log('crearDocumento',respuesta);  
       if (respuesta.error === 'ok'){
        this.getDocumentos(); 
       }else{
       this.getDocumentos();
         Swal.fire(  'ERROR',respuesta.error, 'error') ;
       }
       this.loading.hide();
       this.irbuscarProducto();

} );
  }
  buscarCliente(){
    this.newAbrirDialog.open(FndClienteComponent,{data:this.documentoActivo })
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
      this.getDocumentos();
      this.codigoProducto = '';
      this.irbuscarProducto();
      this.buscarClose = true;
    })   
  }

  buscarProducto( ){ 

    console.log('buscarProducto',this.codigoProducto)
    if (this.codigoProducto.trim() !== '' &&  this.buscarClose){
      this.buscarClose = false ;
      this.newAbrirDialog.open(BuscarProductosComponent ,{data:this.codigoProducto })
      .afterClosed()
      .subscribe((confirmado: Boolean)=>{
        this.getDocumentos();
        this.codigoProducto = '';
        this.irbuscarProducto();
        this.buscarClose = true;
      })  
    }
  }
  moverDocumentoCaja(){
     this.newAbrirDialog.open(MoverDocumentosComponent ,{data:this.documentoActivo })
      .afterClosed()
      .subscribe((confirmado: Boolean)=>{
        if (confirmado){ 
          this.getDocumentos();
      }
      })
  } 

  eliminarLinea(linea:DocumentoListado){
    console.log(linea)
    this.loading.show() 
    this.productoService.devolverPrdCompra(linea).subscribe(
      (respuesta:select)=>{
        
        console.log(JSON.stringify(respuesta));
        if (respuesta.error !== 'ok'){
            Swal.fire(  'ERROR',respuesta.error, 'error') ;
            
          }else{
            this.getDocumentos();
          }
          this.loading.hide()
        },
        (error:errorOdoo) =>{
          console.log(JSON.stringify( error) );
          
          alert(error.error.error +"\n" + error.error.msg); 
          this.loading.hide()
        }) 

  }
  irbuscarProducto( ){
   let activeTextarea = document.activeElement.tagName; 
   console.log(activeTextarea)
   if(activeTextarea.toUpperCase().indexOf('SELECT') < 0)
    this.codProdlement.nativeElement.focus();
  }
  irbuscarProductoObl( ){ 
     this.codProdlement.nativeElement.focus(); 
     
   }

  asignarPagosAVenta(){
    this.newAbrirDialog.open(PagosVentaComponent ,{data:this.documentoActivo })
     .afterClosed()
     .subscribe((confirmado: Boolean)=>{
       if (confirmado){ 
         this.facturarDocumento();
     }
     })
 }  
  facturarDocumento(){

     
    if (typeof(this.documentoActivo.pagos) === 'undefined' || this.documentoActivo.pagos.length === 0)
      {this.documentoActivo.pagos[0] = new DocpagosModel();
        this.documentoActivo.pagos[0].idDocumento =  this.documentoActivo.orden;
        try {
          this.documentoActivo.pagos[0].idMedioDePago =  this.pagos[ this.indexEfectivo].idMedioDePago;
        this.documentoActivo.pagos[0].referencia =  'Efectivo';
        this.documentoActivo.pagos[0].valorPagado =  this.pagos[ this.indexEfectivo].valorPagado;
        } catch (error) {
          this.documentoActivo.pagos[0].idMedioDePago =  1;
        this.documentoActivo.pagos[0].referencia =  'Efectivo';
        this.documentoActivo.pagos[0].valorPagado =  this.documentoActivo.valorTotal;
        }
        
        
      }else{
        console.log( this.documentoActivo.pagos);
      }
      //return;
      if (this.documentoActivo.listado.length === 0){
      alert('Debe ingresar los productos a facturar') ; 
      return;
    }
    if (parseInt(this.documentoActivo.totalFactura.toString()) === 0){
      alert('el total de la factura debe ser mayor a cero') ; 
      return;
    } 
  //  documentoActivo

  this.loading.show() 
  this.documentoService.cerrarDocumento(this.documentoActivo.orden).subscribe(
    (respuesta:select)=>{
      let cont = 0;
       console.log('cerrarDocumento',respuesta); 
       if (respuesta.error === 'ok'){
        this.documentoRetorno = respuesta.data.documentoFinal;
        this.printer_factura_final()
        this.crearDocumento();
        
       }else{
         Swal.fire(  'ERROR',respuesta.error, 'error') ;
       }
       this.loading.hide();
       this.irbuscarProducto();

} );
  
  }
  crearDocumento(){
    this.loading.show() 
  this.documentoService.crearDocumento().subscribe(
    (respuesta:select)=>{
      let cont = 0;
       console.log('crearDocumento',respuesta); 
       if (respuesta.error === 'ok'){
        this.getDocumentos();
        
       }else{
         Swal.fire(  'ERROR',respuesta.error, 'error') ;
       }
       this.loading.hide();
       this.irbuscarProducto();

} );
  } 
  cambiarDocumentoActivo(){
    this.loading.show() 
  this.documentoService.cambiarDocumento(this.documentoActivo.orden).subscribe(
    (respuesta:select)=>{
      let cont = 0;
       console.log('cambiarDocumento',respuesta);  
       if (respuesta.error !== 'ok'){  
         Swal.fire(  'ERROR',respuesta.error, 'error') ; 
         
       }else{ 
        try {
          this.pagos[ this.indexEfectivo].valorPagado = this.documentoActivo.totalFactura;
        } catch (error) {
          
        }
          
      
      }
       this.loading.hide();
       this.irbuscarProducto();

} );
  }
  actualizarPagosDocumento(){

  }
  cancelarDocumento(){
    this.loading.show() 
  this.documentoService.cancelarDocumento(this.documentoActivo.orden).subscribe(
    (respuesta:select)=>{
      let cont = 0;
       console.log('crearDocumento',respuesta);  
       if (respuesta.error === 'ok'){
        this.getDocumentos(); 
       }else{
       this.getDocumentos();
         Swal.fire(  'ERROR',respuesta.error, 'error') ;
       }
       this.loading.hide();
       this.irbuscarProducto();

} );
  }

 getDocumentos(){
  //this.printer_factura_final();
  this.vueltas =true;
  this.pagos = [];
  this.documentoService.getDocumentosUsuarioCaja().subscribe(
    (datos:select)=>{
      let cont = 0;
       console.log('getDocumentos',datos); 
       this.documentos = [];
       let documentoSeleccionado:DocumentosModel;
  if (datos.numdata > 0 ){ 
    datos.data.forEach((dato:any , index  )=>{ 
     // this.documentos = 
     this.documentos.push(dato.objeto);
     if(index === 0)  documentoSeleccionado = dato.objeto;
     if (dato.objeto.estado == 1 ){
      documentoSeleccionado = dato.objeto;
     }
     
     console.log(dato);
    })
    this.documentoActivo = documentoSeleccionado;
    if (this.documentoActivo.pagos.length > 0 ){
      this.pagos = this.documentoActivo.pagos;
      console.log('pagos factura',this.pagos)
    }else{
      try {
        this.pagos[ this.indexEfectivo].valorPagado = this.documentoActivo.totalFactura;
      } catch (error) {
        
      }
    }
    
   
   // this.documentoActivo 
    this.irbuscarProducto();
   // this.printer_factura_final()
 }
 
 this.vueltas =false;
} ,
(error: any) =>{
  alert(JSON.stringify(error));

});
}
}
