import { Component } from '@angular/core';
import { faPencilAlt, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { select } from 'src/app/interfaces/generales';
import { loading } from 'src/app/models/app.loading';
import { TiposEstablecimientosModel } from 'src/app/models/tipos-establecimientos.model';
import { cajasServices } from 'src/app/services/Cajas.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipos-estable',
  templateUrl: './tipos-estable.component.html',
  styleUrls: ['./tipos-estable.component.css']
})
export class TiposEstableComponent {
  fatrash = faTrash
  fasave = faSave
  loading = new loading();
  faPencilAlt = faPencilAlt;
  tiposEsta: TiposEstablecimientosModel[] = [];
  newTipEstabl : TiposEstablecimientosModel = new TiposEstablecimientosModel(undefined); 
  constructor( private serviceCaja : cajasServices ,     
     ) {
      this.getTiposEstablecimiento(); 
    
  } 
  Cancelar(){
    this.newTipEstabl =  new TiposEstablecimientosModel(undefined);
  }

  
  getTiposEstablecimiento(){ 
    this.serviceCaja.getAllTiposEstablecimientos()
         .subscribe({next: (datos:any|select)=>{
          console.log(datos);
          this.tiposEsta = [];   
     if (datos.numdata > 0 ){ 
       
       datos.data.forEach((dato:TiposEstablecimientosModel , index:number )=>{
         this.tiposEsta[index] = new TiposEstablecimientosModel( dato );
       }) 
       console.log(this.tiposEsta);
     }
 
         this.loading.hide()
       } ,
       error:  (error:any) => {this.loading.hide();
        
    this.tiposEsta = [];
        Swal.fire(
          'ERROR',error.error.error,
          'error');
      }}
      );
  }

  setActualizaCaja(estaActualiza : TiposEstablecimientosModel){
    this.newTipEstabl = estaActualiza ; 
    console.log('setActualizaCaja',this.newTipEstabl, estaActualiza);
  }
 

  ngOnInit(): void {
  }
  guardarCaja(){
   console.log('nueva caja',this.newTipEstabl.nombre)
   if (typeof(this.newTipEstabl.nombre) === 'undefined'){
    this.loading.hide();
    alert('Debe ingresar el Nombre de la caja');
    return;
   }
   if (typeof(this.newTipEstabl.descripcion) === 'undefined'){
    this.newTipEstabl.descripcion = this.newTipEstabl.nombre ;
   }else{
    if ( this.newTipEstabl.descripcion.trim() === ''){
      this.newTipEstabl.descripcion = this.newTipEstabl.nombre ;
     }
   }
   
   this.loading.show(); 
   this.serviceCaja.setTipoEstablecimiento(this.newTipEstabl).subscribe(
    (respuesta:any)=>{console.log(respuesta)
     
    if (respuesta.error === 'ok'){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'datos ingresados con exito',
        showConfirmButton: false,
        timer: 1500
      });  
      this.newTipEstabl =  new TiposEstablecimientosModel();
      this.getTiposEstablecimiento();
    }else{
      Swal.fire(  'ERROR',respuesta.error, 'error') ;
      this.loading.hide();
    }
    }

   )
  }


}

