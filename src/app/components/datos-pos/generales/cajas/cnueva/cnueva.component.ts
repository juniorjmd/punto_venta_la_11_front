import { Component } from '@angular/core';
import { cajaModel } from 'src/app/models/cajas.model';
import { establecimientoModel } from 'src/app/models/establecimientos.model';
import { cajasServices } from 'src/app/services/Cajas.services';
import { loading } from 'src/app/models/app.loading';
import { caja } from 'src/app/interfaces/caja.interface';
import { select } from 'src/app/interfaces/generales';
import { Establecimientos } from 'src/app/interfaces/establecimientos.interface';
import { LoadingComponent } from 'src/app/components/layout/loading/loading.component';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cnueva',
  templateUrl: './cnueva.component.html',
  styleUrls: ['./cnueva.component.css']
})
export class CnuevaComponent{

  
  cajas :cajaModel[]  = []; 
  newCaja : cajaModel = new cajaModel(undefined);
  esta : establecimientoModel[] = [];
  artloading = new loading();
  faPencilAlt = faPencilAlt;
  constructor( private serviceCaja : cajasServices   ) { 
     this.getEstablecimiento();
     this.getCajas();
    
  }
  Cancelar(){
    this.newCaja =  new cajaModel(undefined);
  }
  getEstablecimiento(){
    this.serviceCaja.getEstablecimientos()
    .subscribe(
      { next : (datos:any)=>{
        
        {
          console.log(datos);
          this.esta = [];   
     if (datos.numdata > 0 ){ 
       
       datos.data.forEach((dato:Establecimientos , index:number )=>{
         this.esta[index] = new establecimientoModel( dato );
       }) 
       console.log(this.esta);
     }
 
        this.artloading.hide()
       } 

       }  ,
       error :  (err:any )=> {console.log(err)
        alert( err.error.error)
      }
     }
        );  
   
  } 



  setActualizaCaja(cajaActualizar : cajaModel){
    this.newCaja = cajaActualizar ; 
  }


getCajas(){
  this.cajas[0] = this.newCaja ;
  
  this.artloading.show()
  this.serviceCaja.getCajas()
  .subscribe(
    { next : (datos:any)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:caja , index:number )=>{
        this.cajas[index] = new cajaModel( dato );
      }) 
      console.log(this.cajas);
    }else{
      this.cajas = [];
    }

       this.artloading.hide()
      } ,
      error :  (err:any )=> {console.log(err)
        alert( err.error.error)
      } }
      );
}


  ngOnInit(): void {
  }
  guardarCaja(){
   console.log('nueva caja',this.newCaja.nombre)
   if (typeof(this.newCaja.nombre) === 'undefined'){
    this.artloading.hide();
    alert('Debe ingresar el Nombre de la caja');
    return;
   }
   if (typeof(this.newCaja.descripcion) === 'undefined'){
    this.newCaja.descripcion = this.newCaja.nombre ;
   }else{
    if ( this.newCaja.descripcion.trim() === ''){
      this.newCaja.descripcion = this.newCaja.nombre ;
     }
   }
   if (this.newCaja.estadoGeneral === 0){
    this.newCaja.estadoGeneral = 2 ;
   }
   if (this.newCaja.establecimiento === 0){
    this.newCaja.establecimiento = 1 ;
   }
   
  this.artloading.show(); 
   this.serviceCaja.setCaja(this.newCaja).subscribe(
    (respuesta:any)=>{console.log(respuesta)
     
    if (respuesta.error === 'ok'){
      	
		
	Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'datos ingresados con exito',
        showConfirmButton: false,
        timer: 1500
      });  
      this.newCaja =  new cajaModel(undefined);
      this.getCajas();
    }else{
      	   Swal.fire(
          'ERROR',respuesta.error,
          'error');
      this.artloading.hide();
    }
    }

   )
  }


}
