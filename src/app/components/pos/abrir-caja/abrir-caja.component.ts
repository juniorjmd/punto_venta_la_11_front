import { Component, OnInit } from '@angular/core';
import { cajaModel } from 'src/app/models/cajas.model';
import { cajasServices } from 'src/app/services/Cajas.services';
import { loading } from 'src/app/models/app.loading'; 
import { caja } from 'src/app/interfaces/caja.interface';
import { cajaResumen } from 'src/app/interfaces/cajaResumen.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DefinirBaseCajaComponent } from '../definir-base-caja/definir-base-caja.component';
import { ResumenCajaComponent } from '../resumen-caja/resumen-caja.component';
import { cajasResumenModel } from 'src/app/models/cajasResumen.model';
import Swal from 'sweetalert2';
import { select } from 'src/app/interfaces/generales';
@Component({
  selector: 'app-abrir-caja',
  templateUrl: './abrir-caja.component.html',
  styleUrls: ['./abrir-caja.component.css']
})
export class AbrirCajaComponent implements OnInit {
  cajas : cajaModel[]=[];
  cajaAbierta!: cajaModel;
  cajaAbiertaFlag:boolean = false;
  constructor(private serviceCaja : cajasServices ,    
    private _Router : Router,
    private loading : loading, private cajaService : cajasServices,
    private newAbrirCajaDialog : MatDialog) { 
      this.getCajas()
    }

  ngOnInit(): void {
  }
  abrirResumen(cajaResumen : cajasResumenModel){
    
    /*["/home", "pos"]*/ 
    this.newAbrirCajaDialog.open(ResumenCajaComponent,{ data:cajaResumen})
    .afterClosed()
    .subscribe((confirmado: Boolean)=>{
      if (confirmado){ 
        this.getCajas()
    }
    })
  }
  cerrar_parcial(caja :cajaModel){
    let cajaResumen:cajaResumen ;    
    this.loading.show()
    this.serviceCaja.cerrarCajaParcial(caja)
       .subscribe(
        (respuesta:any)=>{
          console.log(respuesta)
         
        if (respuesta.error === 'ok'){ 
           
      if (respuesta.numdata > 0 ){ 
        respuesta.data.forEach((dato:any   )=>{
          cajaResumen =  dato  ;

          console.log(cajaResumen, dato , dato); 
        }) 
        this.abrirResumen(cajaResumen );
        
        this.loading.hide();
      } 

        }else{
          Swal.fire(  'ERROR',respuesta.error, 'error') ;
          this.loading.hide();
        }
       
        }
        );}
  cerrar(caja :cajaModel ){
    let cajaResumen:cajaResumen ;    
    this.loading.show()
    this.serviceCaja.cerrarCaja(caja)
       .subscribe(
        (respuesta:any)=>{
          console.log(respuesta)
         
        if (respuesta.error === 'ok'){ 
           
      if (respuesta.numdata > 0 ){ 
        respuesta.data.forEach((dato:any   )=>{
          cajaResumen =  dato  ;

          console.log(cajaResumen, dato , dato); 
        }) 
        this.abrirResumen(cajaResumen );
        
        this.loading.hide();
      } 

        }else{
          Swal.fire(  'ERROR',respuesta.error, 'error') ;
          this.loading.hide();
        }
       
        }
        );
  }

   getResumenCaja(caja:cajaModel){
    let cajaResumen:cajasResumenModel = new cajasResumenModel() ; 
    this.loading.show()
    this.serviceCaja.resumenCaja(caja)
       .subscribe({next:
        (datos:any|select)=>{
           console.log(datos);  
      if (datos.numdata > 0 ){ 
        datos.data.forEach((dato:any   )=>{
          cajaResumen = dato.json ; 
        }) 
        this.abrirResumen(cajaResumen );
      } 
  
          this.loading.hide()
        } , error :
        error => {this.loading.hide();
          Swal.fire(
          'ERROR',error.error.error,
          'error');
        }
       } );
   }
  getCajas(){
    this.cajas[0] = new cajaModel(undefined) ;
    let cajaAux :cajaModel;
    this.loading.show()
    this.serviceCaja.getCajasUsuario()
       .subscribe({next: (datos:any|select)=>{
          let cont = 0;
           console.log('getCajas',datos);
           this.cajaAbiertaFlag = false;   
      if (datos.numdata > 0 ){ 
        datos.data.forEach((dato:caja   )=>{
          cajaAux =  new cajaModel( dato ); 
          if (cajaAux.nombreEstado === "Abierta" && cajaAux.idUsuario == cajaAux.usuarioEstadoCaja){
            this.loading.hide() 
            this.cajaAbierta = cajaAux;
            this.cajaAbiertaFlag = true;
            return;
          }else{
            if (cajaAux.nombreEstado !== "Abierta" ){
                this.cajas[cont] = cajaAux;
                  cont++;
                }
              
              
              }
               
        }) 
        console.log(this.cajas);
      }else{
        this.cajas = [];
      }
  
          this.loading.hide()
        } ,
        error: error => {this.loading.hide();
          Swal.fire(
          'ERROR',error.error.error,
          'error');
        }}
        );
  }
  asignarCaja(caja : cajaModel){
    /*["/home", "pos"]*/ 
      this.newAbrirCajaDialog.open(DefinirBaseCajaComponent,{data:caja})
      .afterClosed()
      .subscribe((confirmado: Boolean)=>{
        if (confirmado){ 
          this._Router.navigate(["/home","pos","ventas"]);
      }
      })
  }
  continuar(){
    this._Router.navigate(["/home","pos","ventas"]);
  }

  continuar_caja_suspendida(caja : cajaModel){
    
    this.loading.show() 
    this.cajaService.abrirCaja(caja, 0).subscribe(
      {next:  (respuesta:any)=>{
        console.log(respuesta)
       
      if (respuesta.error === 'ok'){
       alert( respuesta.datos[0].msg ); 
       this.continuar();
      }else{
        Swal.fire(  'ERROR',respuesta.error, 'error') ;
      }
      this.loading.hide();
     
      }, error :
      error => {this.loading.hide();
        Swal.fire(
          'ERROR',error.error.error,
          'error');
      }}
      );
  } 
  
}
