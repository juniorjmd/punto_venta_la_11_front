import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { select } from 'src/app/interfaces/generales';
import { departamento, pais } from 'src/app/interfaces/maestros.interface';
import { loading } from 'src/app/models/app.loading';
import { CiudadModel } from 'src/app/models/maestros.model';
import { MaestroClienteServices } from 'src/app/services/MaestroCliente.services';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nciudad',
  templateUrl: './nciudad.component.html',
  styleUrls: ['./nciudad.component.css']
})
export class NciudadComponent  {
  faSpinner = faSpinner;
  paises:pais[] = [] ; 
  dep:departamento[] = [] ; 
  numpaises:number = 0;
  numdep:number = 0;
  cityN:CiudadModel; 
  loading = new loading();
  
  constructor( 
    private maestroServicio : MaestroClienteServices ,
    public dialogo: MatDialogRef<NciudadComponent>,
    @Inject(MAT_DIALOG_DATA) public cityNuevo: CiudadModel

  ) {  this.cityN = cityNuevo;
    this.getPaises();
    this.getDepartamento();



  }

  ngOnInit(): void {
  }
  ingresar(form : NgForm){   
    if (form.invalid){
      return;
    } 
    this.loading.show();
    let codDep:number =1 ;
    console.log("ciudad enviada"+ JSON.stringify(this.cityN));
    this.dep.forEach(departamentos =>{
      console.log(this.cityN.cod_departamento, departamentos.id);
     if ( this.cityN.cod_departamento === departamentos.id){
      codDep =departamentos.cod_departamento;
     }
    })
    this.cityN.cod_dane = ( codDep * 1000) +  this.cityN.cod_ciudad ;
    if(this.cityN.id > 0 ){
        this.maestroServicio.actualizarCiudades(this.cityN).subscribe(
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
      this.maestroServicio.setCiudades(this.cityN).subscribe(
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
        });
    }
    console.log('nuevo pais',this.cityN)
  }

  limpiarForm(){ 
    this.cityN = new CiudadModel();      
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }

 
  getPaises(){
    this.loading.show() 
    this.maestroServicio.getPaises().subscribe({next:
      (datos:any|select)=>{ 
    this.numpaises = datos.numdata;
    if (datos.numdata > 0 ){
      this.paises = datos.data;
    }else{
      this.paises = [];
      alert('no existen paises Creador');
      this.cerrarDialogo();
      
    }
        
        console.log(this.paises);
        this.loading.hide() 
      } ,error:
      error => {this.loading.hide();
        Swal.fire(
          'ERROR',error.error.error,
          'error');}});
   }


   getDepartamentosPorPais(id:number){
     if(id>0){
    this.loading.show() 
    this.maestroServicio.getDepartamentosPorPais([id]).subscribe(
      (datos:any|select)=>{ 
    this.numdep = datos.numdata;
    console.log(datos );
    
    if (datos.numdata > 0 ){

      this.dep = datos.data;
    }else{
      this.dep = [];
      alert('no existen Departamentos Para el pais seleccionado'); 
    }
        
        console.log(this.dep);
        this.loading.hide() 
      } ,
      error => {this.loading.hide();
        Swal.fire(
          'ERROR',error.error.error,
          'error');});
   }}


   getDepartamento(){
    this.loading.show() 
    this.maestroServicio.getDepartamentos().subscribe(
      (datos:any|select)=>{ 
    this.numdep = datos.numdata;
    if (datos.numdata > 0 ){
      this.dep = datos.data;
    }else{
      this.dep = [];
      alert('no existen Departamentos Creados');
      this.cerrarDialogo();
    }
        
        console.log(this.paises);
        this.loading.hide() 
      } ,
      error => {this.loading.hide();
        Swal.fire(
          'ERROR',error.error.error,
          'error');});
   }
}

