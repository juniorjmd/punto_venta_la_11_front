import { Component, Inject } from '@angular/core';
import { Cartera } from '../../../../interfaces/cartera';
import { loading } from 'src/app/models/app.loading';
import { LibranzasService } from '../../../../services/libranzas.service';
import { select } from 'src/app/interfaces/generales';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentosModel } from 'src/app/models/documento.model';

@Component({
  selector: 'app-busquedas-libpg',
  templateUrl: './busquedas-libpg.component.html',
  styleUrls: ['./busquedas-libpg.component.css']
})
export class BusquedasLibpgComponent {
    numeroLib = 0;
    cantCarteraLib = 0;
    carteras:Cartera[] = [];
    loading = new loading();
constructor(private Libranzas: LibranzasService,
  public dialogo: MatDialogRef<BusquedasLibpgComponent>,
  @Inject(MAT_DIALOG_DATA) public Documento:DocumentosModel){

    console.log('documento recibido',this.Documento);
    
}
 guardarPagoLibranza(){
  let contPagos=0;
  this.carteras.forEach((cartera)=>{
    if(cartera.totalAPagar! > 0 ){
      contPagos++; 
    }
  })
  if(contPagos== 0){
    Swal.fire(  'ERROR','No existen pagos de libranzas registrado para este usuario', 'error') ;
    return;
  }
  this.loading.show(); 

  this.Libranzas.guardarPagos(this.carteras , this.Documento.orden).subscribe(
    (respuesta:any|select)=>{
        console.log('cerrarDocumento',respuesta); 
       if (respuesta.error === 'ok'){ 
        this.dialogo.close(true)

       }else{
         Swal.fire(  'ERROR',respuesta.error, 'error') ;
       }
       this.loading.hide(); 

} );
 }
    buscarLibranzaPorCedula(){
      if(this.numeroLib <=  0 || this.numeroLib.toString().trim() ==='' )
      this.loading.show() 
  this.Libranzas.buscarCarteraPPPorCedula(this.numeroLib).subscribe(
    (respuesta:any|select)=>{
      let cont = 0;
       console.log('cerrarDocumento',respuesta); 
       if (respuesta.error === 'ok'){

        if (respuesta.numdata > 0){

          this.cantCarteraLib = respuesta.numdata ;
          this.carteras = respuesta.data ;
          
         }else{
           Swal.fire(  'ERROR','No existen libranzas pendientes por pago registrado para este usuario', 'error') ;
         }

       }else{
         Swal.fire(  'ERROR',respuesta.error, 'error') ;
       }
       this.loading.hide(); 

} );
    }

    guardarPagosListado(){


      this.loading.show() 
      this.Libranzas.guardarPagos(this.carteras,this.Documento.orden).subscribe(
        (respuesta:any|select)=>{
            console.log('cerrarDocumento',respuesta); 
           if (respuesta.error === 'ok'){
             this.dialogo.close(true)
           }else{
             Swal.fire(  'ERROR',respuesta.error, 'error') ;
           }
           this.loading.hide(); 
    


    })
}}

