import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select } from 'src/app/interfaces/generales.interface';
import { MediosDePago } from 'src/app/interfaces/medios-de-pago.interface';
import { loading } from 'src/app/models/app.loading';
import { cajaModel } from 'src/app/models/cajas.model';
import { DocumentosModel } from 'src/app/models/documento.model';
import { DocpagosModel, pagosModel } from 'src/app/models/pagos.model';
import { cajasServices } from 'src/app/services/Cajas.services';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-pagos-venta',
  templateUrl: './pagos-venta.component.html',
  styleUrls: ['./pagos-venta.component.css']
})
export class PagosVentaComponent implements OnInit {
  pagos:DocpagosModel[] = [];
  indexEfectivo:number = 0;
  MedioP:MediosDePago[]= [];
  listo:boolean = false;
  constructor(
    public loading : loading,private serviceCaja : cajasServices ,
    public dialogo: MatDialogRef<PagosVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public Documento:DocumentosModel

  ) { this.getMediosP()}

  ngOnInit(): void {
  }
  finalizarOk(){
    //documentos_pagos
    this.serviceCaja.setPagoDocumento(this.Documento.orden ,this.pagos )
     .subscribe(
      (datos:select)=>{
         console.log(datos); 
    console.log('pagos realizados' , this.pagos ); 
        this.loading.hide()
        this.listo = true;
        this.dialogo.close(true);
      } ,
      error => {this.loading.hide();
        Swal.fire(
          'ERROR',error.error.error,
          'error');
      }
      );
  }
  cancelar(){
    this.dialogo.close(false);
  }
  cambioDeValor( index:number){
    if (this.pagos[index].valorPagado <= this.pagos[this.indexEfectivo].valorPagado){
      this.pagos[this.indexEfectivo].valorPagado = this.pagos[this.indexEfectivo].valorPagado -this.pagos[index].valorPagado ;
    }else{
      this.pagos[index].valorPagado = 0;
    }
    this.pagos[this.indexEfectivo].valorPagado = this.Documento.totalFactura;
    this.pagos.forEach((dato:DocpagosModel , index )=>{
      if (index !== this.indexEfectivo)
      this.pagos[this.indexEfectivo].valorPagado -= dato.valorPagado;
    })
    this.pagos[this.indexEfectivo].valorRecibido = this.pagos[this.indexEfectivo].valorPagado;
    this.pagos[this.indexEfectivo].vueltos = 0; 

  }
setVueltos(index:number){
  if(this.pagos[index].valorPagado > this.pagos[index].valorRecibido  ) {
    this.pagos[index].valorRecibido = this.pagos[index].valorPagado;
    this.pagos[index].vueltos = 0; 
  }else{
   
    this.pagos[index].vueltos = this.pagos[index].valorRecibido - this.pagos[index].valorPagado;
  } 
  
 
}
getMediosP(){ 
  console.log('DocumentoActivo',this.Documento)
  this.listo = false;
  this.loading.show()
  this.serviceCaja.getMediosCajaActiva()
     .subscribe(
      (datos:select)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:MediosDePago , index )=>{
        this.pagos[index] = new DocpagosModel();
        this.pagos[index].idMedioDePago = dato.id;
        this.pagos[index].nombreMedio =dato.nombre;
        this.pagos[index].valorRecibido = 0;
        this.pagos[index].vueltos = 0; 
        this.pagos[index].valorTotalAPagar = 0; 
        if (dato.nombre === 'Efectivo')
       { this.indexEfectivo = index;
          this.pagos[index].valorPagado = this.Documento.totalFactura;
          this.pagos[index].valorRecibido = this.pagos[index].valorPagado;
          this.pagos[index].vueltos = 0; 
       
        }
        else
        {this.pagos[index].valorPagado = 0;}
      }) 
     // console.log(this.MedioP);
    }else{
      this.MedioP = [];
    } 
    console.log('pagos realizados' , this.pagos ); 
        this.loading.hide()
        this.listo = true;
      } ,
      error => {this.loading.hide();
        Swal.fire(
          'ERROR',error.error.error,
          'error');
      }
      );
  }
}
