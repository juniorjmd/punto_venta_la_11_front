import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { select } from 'src/app/interfaces/generales';
import { pais } from 'src/app/interfaces/maestros.interface';
import { loading } from 'src/app/models/app.loading';
import { PaisModel } from 'src/app/models/maestros.model';
import { MaestroClienteServices } from 'src/app/services/MaestroCliente.services';
import Swal from 'sweetalert2';
import { DialogoConfirmacionComponent } from '../../layout/dialogo-confirmacion/dialogo-confirmacion.component';
import { NpaisComponent } from '../new/npais/npais.component';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent {
  paises : pais[] = [];
  faEdit = faEdit;
faTrash = faTrash;
  changePais : PaisModel = new PaisModel();
  loading = new loading()
    numpaises:number = 0;//private maestroServicio : MaestroClienteServices
  constructor(private maestroCliente : MaestroClienteServices ,
    private dialogo : MatDialog,
    private newPais : MatDialog, 
    ) 
    {
    this.listarPaises();
   }


   borrarPais(pais:PaisModel ){
     
    this.dialogo.
    open(DialogoConfirmacionComponent,{data:`Realmente quieres eliminar el país ${pais.nombre}`})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
      if (confirmado){
        this.maestroCliente.eliminarPaises(pais).subscribe(
          (respuesta:any)=>{console.log(respuesta)
            if (respuesta.error === 'ok'){
              alert('datos eliminados con exito');     
              this.listarPaises();
            } 
          }
        );
      } 
    })
   }
   listarPaises(){
    this.loading.show() 
    this.maestroCliente.getPaises().subscribe({next:
      (datos:any|select)=>{ 
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
   
   editarPais( id:number , codPais:string , nombre:string){
     this.changePais.id = id ;
     this.changePais.cod_pais = codPais;
     this.changePais.nombre = nombre; 
     //activaModal.click()
     this.newPais.open(NpaisComponent,{data:this.changePais})
     .afterClosed()
     .subscribe((confirmado: Boolean)=>{
       if (confirmado)
      this.listarPaises() 
     })
      
   }

  ngOnInit(): void {


  }
  

}

