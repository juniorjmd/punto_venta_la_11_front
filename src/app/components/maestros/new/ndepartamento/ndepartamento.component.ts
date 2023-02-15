import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { select } from 'src/app/interfaces/generales';
import { pais } from 'src/app/interfaces/maestros.interface';
import { loading } from 'src/app/models/app.loading';
import { DepartamentoModel } from 'src/app/models/maestros.model';
import { MaestroClienteServices } from 'src/app/services/MaestroCliente.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ndepartamento',
  templateUrl: './ndepartamento.component.html',
  styleUrls: ['./ndepartamento.component.css']
})
export class NdepartamentoComponent  {
  paises : pais[] = [];
  numpaises:number = 0;
  faSpinner = faSpinner;
  deprto:DepartamentoModel ; loading = new loading()
  constructor(   
               config: NgbModalConfig, 
               private modalService: NgbModal, 
               private maestroServicio : MaestroClienteServices ,
               public dialogo: MatDialogRef<NdepartamentoComponent>,
               @Inject(MAT_DIALOG_DATA) public depart: DepartamentoModel
  
  ) { this.getPaises()
    this.deprto = depart;
  }

  getPaises(){
    this.loading.show() 
    this.maestroServicio.getPaises().subscribe(
     {next: (datos:any|select)=>{ 
    this.numpaises = datos.numdata;
    if (datos.numdata > 0 ){
      this.paises = datos.data;
    }else{
      this.paises = [];
    }
        
        console.log(this.paises);
        this.loading.hide() 
      } ,error:
      error => {this.loading.hide();
        Swal.fire(
          'ERROR',error.error.error,
          'error');}});
   }
   

  limpiarForm(){ 
    this.deprto = new DepartamentoModel();      
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }
  ingresarDepartamento(form : NgForm){
    this.loading.show();
    if(this.deprto.id > 0 ){
        this.maestroServicio.actualizarDepartamentos(this.deprto).subscribe(

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
      this.maestroServicio.setDepartamentos(this.deprto).subscribe(
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
    console.log('nuevo pais',this.deprto)
  }
  ngOnInit(): void {
    
  }

}
