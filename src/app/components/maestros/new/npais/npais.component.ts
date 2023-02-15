import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { loading } from 'src/app/models/app.loading';
import { PaisModel } from 'src/app/models/maestros.model';
import { MaestroClienteServices } from 'src/app/services/MaestroCliente.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-npais',
  templateUrl: './npais.component.html',
  styleUrls: ['./npais.component.css']
})
export class NpaisComponent {
  // @Input() pais : PaisModel
   loading =new loading()
   constructor( private _Router : Router, 
                config: NgbModalConfig, 
                private modalService: NgbModal, 
                private maestroServicio : MaestroClienteServices ,
                public dialogo: MatDialogRef<NpaisComponent>,
                @Inject(MAT_DIALOG_DATA) public pais: PaisModel
    ) { 
 
   }
   limpiarForm(){
     this.pais.nombre = '';
     this.pais.id = 0 ;
     this.pais.cod_pais = '';      
   }
   ingresarPais(form : NgForm){
     this.loading.show();
     if(this.pais.id > 0 ){
         this.maestroServicio.actualizarPaises(this.pais).subscribe(
 
           (respuesta:any)=>{console.log(respuesta)
             this.loading.hide();
             if (respuesta.error === 'ok'){
               Swal.fire({
         position: 'top-end',
         icon: 'success',
         title: 'datos ingresados con exito',
         showConfirmButton: false,
         timer: 1500
       }); 
               this.confirmado(); 
                  
             } 
             
           }
         
         );
     }else{
       this.maestroServicio.setPaises(this.pais).subscribe(
         (respuesta:any)=>{console.log(respuesta)
           this.loading.hide();
         if (respuesta.error === 'ok'){
           Swal.fire({
         position: 'top-end',
         icon: 'success',
         title: 'datos ingresados con exito',
         showConfirmButton: false,
         timer: 1500
       }); 
           this.confirmado(); 
              
         } 
         }
       
       );
     }
     console.log('nuevo pais',this.pais)
   }
 
   ngOnInit(): void {
   }
   cerrarDialogo(): void {
     this.dialogo.close(false);
   }
   confirmado(): void {
     this.dialogo.close(true);
   }
 
 }
 
