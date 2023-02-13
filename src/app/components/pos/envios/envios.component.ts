import { Component, OnInit } from '@angular/core';
import { DomiciliosService } from 'src/app/services/domicilios.service';
import { loading } from 'src/app/models/app.loading'; 
import { MatDialog } from '@angular/material/dialog';
import { DocpagosModel } from 'src/app/models/pagos.model';
import { Documento, DocumentoListado } from 'src/app/interfaces/documento.interface';
import { DocumentosModel } from 'src/app/models/documento.model'; 
import { DocumentoService } from 'src/app/services/documento.service'; 
import { ConectorPlugin } from 'src/app/models/app.printer.con';
import { printer, url } from 'src/app/models/app.db.url';
import { DomiciliosModel } from 'src/app/models/domicilios/domicilios.model';
import { PagosVentaComponent } from '../pagos-venta/pagos-venta.component';
import { select } from 'src/app/interfaces/generales';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.css']
})
export class EnviosComponent implements OnInit {
  listadoDePedidos:DomiciliosModel[] = [];  
  documentoRetorno : DocumentosModel = new DocumentosModel();


  constructor(private serviceDomicilio : DomiciliosService , 
              private loading : loading ,
              private documentoService :DocumentoService,
              private newAbrirDialog : MatDialog ) { 


                this.getDomicilios();
              }

  generarPago( envio:DocumentosModel){ 
    
      console.log('envio generado',envio);
      this.newAbrirDialog.open(PagosVentaComponent ,{data:envio })
       .afterClosed()
       .subscribe((confirmado: Boolean)=>{
         if (confirmado){ 
           this.facturarDocumento(envio.orden );
       }
       }) 
  }
  
  facturarDocumento(idDocumento: number){ 
  //  documentoActivo

  this.loading.show() 
  this.documentoService.cerrarDocumento(idDocumento).subscribe(
    (respuesta:any|select)=>{
      let cont = 0;
       console.log('cerrarDocumento',respuesta); 
       if (respuesta.error === 'ok'){
        this.documentoRetorno = respuesta.data.documentoFinal;
        this.printer_factura_final()         
       }else{
         Swal.fire(  'ERROR',respuesta.error, 'error') ;
       }
       this.loading.hide(); 

} );
  
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
   let nombreImpresora = printer.namePrinterGenerico;
   if (!nombreImpresora) return console.log("Selecciona una impresora");
   let conector = new ConectorPlugin('');
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
   this.documentoRetorno.listado!.forEach((lista:DocumentoListado)=>{
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

   this.documentoRetorno.pagos!.forEach((pagos:DocpagosModel)=>{
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
   
   conector.feed('4')

   conector.abrirCajon() // Abrir cajón de dinero. Opcional
   conector.cortar()
   const respuestaAlImprimir = await conector.imprimirEn(nombreImpresora);
   if (respuestaAlImprimir === true) {
       console.log("Impreso correctamente");
   } else {
       console.log("Error. La respuesta es: " + respuestaAlImprimir);
   }
  } 
  MostrarDetalle(obj:DocumentosModel){}

  getDomicilios(){
     
    this.loading.show();
    this.serviceDomicilio.getListadosDomicilios().subscribe(
      (respuesta:any)=>{console.log(respuesta)
       
      if (respuesta.error === 'ok'){
         this.listadoDePedidos = respuesta.data;
      }else{
        Swal.fire(  'ERROR',respuesta.error, 'error') ;
      }
      
      this.loading.hide();
      }
  
     )
  }           
  ngOnInit(): void {
  }

}
