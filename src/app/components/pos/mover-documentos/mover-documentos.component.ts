import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { select } from 'src/app/interfaces/generales';
import { loading } from 'src/app/models/app.loading';
import { cajaModel } from 'src/app/models/cajas.model';
import { DocumentosModel } from 'src/app/models/documento.model';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-mover-documentos',
  templateUrl: './mover-documentos.component.html',
  styleUrls: ['./mover-documentos.component.css']
})
export class MoverDocumentosComponent implements OnInit {
 cajasActivas: cajaModel[] = [];loading = new loading();
  constructor( 
    private documentoService : DocumentoService ,
     public dialogo: MatDialogRef<MoverDocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public Documento:DocumentosModel) { this.getCajasActivasEstablecimiento()}

  ngOnInit(): void {
  }
  asignarACaja(caja:cajaModel){
    console.log(caja);
    caja.documentoActivoCaja = this.Documento.orden
    this.loading.show();
  this.documentoService.cambiarDocumentoDeCaja(caja).subscribe(
    (datos:any|select)=>{ 
       console.log('asignarACaja',datos);  
       this.loading.hide();
       this.dialogo.close(true);
} )
    
  }
  getCajasActivasEstablecimiento(){
    this.documentoService.getCajasActivas(this.Documento.establecimiento).
    subscribe(
      (datos:any|select)=>{
        let cont = 0;
         console.log('getCajasActivas',datos); 
         this.cajasActivas = []; 
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:any    )=>{  
       this.cajasActivas.push(dato); 
       
       console.log(dato);
      }) 
   }
} )
}}  
