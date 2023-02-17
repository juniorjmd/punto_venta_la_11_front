import { Component, Inject, OnInit, NgModule } from '@angular/core'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cajaModel } from 'src/app/models/cajas.model';
import { loading } from 'src/app/models/app.loading'; 
import { cajasServices } from 'src/app/services/Cajas.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-definir-base-caja',
  templateUrl: './definir-base-caja.component.html',
  styleUrls: ['./definir-base-caja.component.css']
})
export class DefinirBaseCajaComponent implements OnInit {
 caja:cajaModel ;
 valorIngresar!:number;loading = new loading();
  constructor( private cajaService : cajasServices,
    public dialogo: MatDialogRef<DefinirBaseCajaComponent>,
    @Inject(MAT_DIALOG_DATA) public cajaImport:cajaModel, ) { 
      this.caja = this.cajaImport;
      console.log('caja a establecer',this.caja);
      
    }

  ngOnInit(): void {
  }
  cerrarFormulario(){
    this.dialogo.close(false);
  }
  cerrarFormularioTrue(){
    alert(this.valorIngresar);
    if(typeof(this.valorIngresar) == 'undefined'){
      alert('Debe ingresar el Valor inicial de la caja');
    }else{
      this.loading.show() 
      this.cajaService.abrirCaja(this.caja, this.valorIngresar).subscribe(
      {next:  (respuesta:any)=>{
          console.log(respuesta)
         
        if (respuesta.error === 'ok'){
         alert( respuesta.datos[0].msg );  
         this.dialogo.close(true);
        }else{
          Swal.fire(  'ERROR',respuesta.error, 'error') ;
        }
        this.loading.hide();
       
        },error:
        error => {this.loading.hide();
          Swal.fire(
          'ERROR',error.error.error,
          'error');
        }}
        );
    }
    
  }

}
