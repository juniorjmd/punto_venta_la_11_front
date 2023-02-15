import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faEdit, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import { select } from 'src/app/interfaces/generales';
import { departamento } from 'src/app/interfaces/maestros.interface';
import { loading } from 'src/app/models/app.loading';
import { DepartamentoModel } from 'src/app/models/maestros.model';
import { MaestroClienteServices } from 'src/app/services/MaestroCliente.services';
import Swal from 'sweetalert2';
import { DialogoConfirmacionComponent } from '../../layout/dialogo-confirmacion/dialogo-confirmacion.component';
import { NdepartamentoComponent } from '../new/ndepartamento/ndepartamento.component';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent  { 
  faEdit= faEdit ; 
faTrash= faTrash ; 
  departamentos: departamento[]  = []  ;
  departamentoChange : DepartamentoModel = new DepartamentoModel();
  numdepartamentos : number = 0 ; loading =new loading()
    constructor( private maestroCliente : MaestroClienteServices,
      private dialogo : MatDialog ,
      private newDep : MatDialog   ) { 
    
      this.listarDepartamentos()
}
listarDepartamentos(){
  this.loading.show();
  this.maestroCliente.getDepartamentos()
  .subscribe({next:
    (datos:any|select)=>{ 
  this.numdepartamentos = datos.numdata;
  if (datos.numdata > 0 ){
    this.departamentos = datos.data;
  }else{
    this.departamentos = [];
  }
      
      console.log(this.departamentos);
      this.loading.hide();
    } ,error:
    error => { this.loading.hide();
      Swal.fire(
        'ERROR',error.error.error,
        'error');}});
}

borrar(dep:DepartamentoModel ){
   
  this.dialogo.
  open(DialogoConfirmacionComponent,{data:`Realmente quieres eliminar el Departamento ${dep.nombre}`})
  .afterClosed()
  .subscribe((confirmado: Boolean)=>{
    if (confirmado){
      this.maestroCliente.eliminarDepartamento(dep).subscribe(
        (respuesta:any)=>{console.log(respuesta)
          if (respuesta.error === 'ok'){
            alert('datos eliminados con exito');     
            this.listarDepartamentos();
          } 
        }
      );
    } 
  })
 }
editarDepartamento (dep : DepartamentoModel){ 
  this.newDep.open(NdepartamentoComponent,{data:dep})
  .afterClosed()
  .subscribe((confirmado: Boolean)=>{
    if (confirmado){
    this.listarDepartamentos() 
    console.log('se listo');
    
  }
  })
}
ngOnInit(): void {
}

}

