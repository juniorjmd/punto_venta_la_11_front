 import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { select } from 'src/app/interfaces/generales';
import { ciudad } from 'src/app/interfaces/maestros.interface';
import { loading } from 'src/app/models/app.loading';
import { CiudadModel } from 'src/app/models/maestros.model';
import { MaestroClienteServices } from 'src/app/services/MaestroCliente.services';
import Swal from 'sweetalert2';
import { DialogoConfirmacionComponent } from '../../layout/dialogo-confirmacion/dialogo-confirmacion.component';
import { NciudadComponent } from '../new/nciudad/nciudad.component';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent {
  faEdit = faEdit;
faTrash = faTrash;
  ciudades :ciudad[] = [];
  ciudadChange : CiudadModel = new CiudadModel();
  numCiudades : number = 0 ;
  loading = new loading();
  ////////////////////////////
    constructor(private maestroCliente : MaestroClienteServices, 
      private dialogo : MatDialog ,
      private newCiudad : MatDialog , 
      ) { 
          
        this.listar();
    }
    
    editar(city : CiudadModel){ 
      this.loading.show();
      this.newCiudad.open(NciudadComponent,{data:city})
      .afterClosed()
      .subscribe((confirmado: Boolean)=>{
        if (confirmado){
        this.listar()  
        this.loading.show();
      }
      })
    }
  
    
    
    borrar(CityD:CiudadModel ){
       
      this.dialogo.
      open(DialogoConfirmacionComponent,{data:`Realmente quieres eliminar el Ciudad ${CityD.nombre}`})
      .afterClosed()
      .subscribe((confirmado: Boolean)=>{
        if (confirmado){
          this.maestroCliente.eliminarCiudades(CityD).subscribe(
            (respuesta:any)=>{console.log(respuesta)
              if (respuesta.error === 'ok'){
                alert('datos eliminados con exito');     
                this.listar();
              } 
            }
          );
        } 
      })
     }
    listar(){
      this.loading.show();
      this.maestroCliente.getCiudades()
        .subscribe({next:
          (datos:any|select)=>{
            
        this.numCiudades = datos.numdata;
        if (datos.numdata > 0 ){
          this.ciudades = datos.data;
        }else{
          this.ciudades = [];
        }
            this.loading.hide()
          } ,error:
          error => {this.loading.hide();
            Swal.fire(
            'ERROR',error.error.error,
            'error');
          }}
          );
        
    }
  
    ngOnInit(): void {
    }
  
  }
  
