import { Component } from '@angular/core';
import { faFolderClosed, faMoneyBill, faPencilAlt, faRightFromBracket  } from '@fortawesome/free-solid-svg-icons';
import { select } from 'src/app/interfaces/generales';
import { loading } from 'src/app/models/app.loading';
import { CortesDeCajaPagosModule } from 'src/app/models/cortes-de-caja-pagos/cortes-de-caja-pagos.module';
import { CortesDeCajaProductosVendidosModule } from 'src/app/models/cortes-de-caja-productos-vendidos/cortes-de-caja-productos-vendidos.module';
import { CortesDeCajaModule } from 'src/app/models/cortes-de-caja/cortes-de-caja.module';
import { CortesDeCajaService } from 'src/app/services/cortes-de-caja.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cierres',
  templateUrl: './cierres.component.html',
  styleUrls: ['./cierres.component.css']
})
export class CierresComponent { 
  faMoneyBill = faMoneyBill; 
  faFolderClosed= faFolderClosed;
  faRightFromBracket = faRightFromBracket;
  cierres:CortesDeCajaModule[] = []
  cierresP:CortesDeCajaModule[] = []
  cierresPagos:CortesDeCajaPagosModule[] = [] 
   loading = new loading()
  constructor(  private _serviceCierre:CortesDeCajaService) {this.getCierresTotalesYparciales() }

  ngOnInit(): void {
    
  }

  getCierresTotalesYparciales(){
    this.loading.show();
  this._serviceCierre.getCierresTotalesYparciales().subscribe(
    (respuesta:any|select)=>{
      let cont = 0;
       console.log('getCierresTotalesYparciales',respuesta); 
       if (respuesta[0].error === 'ok' || respuesta[1].error === 'ok' || respuesta[2].error === 'ok'){ 
         if (respuesta[0].numdata > 0)
         {//respuesta.data[0]; 
        console.log('datos cierres',respuesta[0].data);
        this.cierres = respuesta[0].data;
        this.cierresP = respuesta[1].data;
        this.cierresPagos = respuesta[2].data;
       console.log('getCierresTotalesYparciales' ,
        this.cierres,     this.cierresP = respuesta[1].data ,this.cierresPagos = respuesta[2].data)
        }

       }else{
         alert(respuesta.error);
       }
       this.loading.hide();
  }) 

  }

mostrarProductosVendidosPorCierre(cierreActual:CortesDeCajaModule){
  
  this.loading.show();
  this._serviceCierre.getProductosPorCierres(cierreActual.id).subscribe(
    (respuesta:any|select)=>{
      let cont = 0;
       console.log('getCierresTotalesYparciales',respuesta); 
       if (respuesta.error === 'ok' ){ 
         if (respuesta.numdata > 0)
         {//respuesta.data[0]; 
        console.log('datos cierres',respuesta.data);

 
        let pagosHtml:string =  `<h1>Cierre de caja # ${cierreActual.id} <br>de la caja ${cierreActual.nombreCajaCierre}</h1>
        <h3>Productos Vendidos</h3>
        <table class='table' style='font-size:12px'>  
        <tr>
        <td>Producto</td>
        <td nowrap>Codigo</td>
        <td nowrap >Cantidad</td>
        <td>precio sin iva</td>
        <td>Descuento</td>
        <td>IVA</td>
        <td>Total</td> 
        </tr>`;
          ;
        respuesta.data.forEach((item:CortesDeCajaProductosVendidosModule)=>{
          pagosHtml +=`<tr> `;
         pagosHtml +=` <td style="text-align: left;">${item.nombreProducto}</td> `;
         pagosHtml +=` <td>${item.idProducto}</td> `;
         pagosHtml +=` <td>${item.cant_real_descontada}</td> `;
         pagosHtml +=` <td>${item.total_presioSinIVa}</td> `;
         pagosHtml +=` <td>${item.descuento}</td> `;
         pagosHtml +=` <td>${item.total_IVA}</td> `;
         pagosHtml +=` <td>${item.valorTotal}</td> `; 
         pagosHtml +=`</tr> `;
         
       });       
       pagosHtml += '</table>';
       Swal.fire({html:pagosHtml, width: '800px'});
      }   else{
        Swal.fire({html:'No existen "Productos Vendidos" relacionados a este cierre', width: '800px'});
      }

       }else{
         alert(respuesta.error);
       }
       this.loading.hide();
  }) 
}

  mostrarCierresParciales(item2:CortesDeCajaModule){

 
   let pagosHtml:string =  `<h1>Cierre de caja # ${item2.id} <br>de la caja ${item2.nombreCajaCierre}</h1>
   <h3>Cierres Parciales</h3>
   <table class='table' style='font-size:12px'>  
   <tr>
   <td>fecha inicio</td>
   <td>fecha cierre</td>
   <td>Base</td>
   <td>Subtotal</td>
   <td>IVA</td>
   <td>Descuento</td>
   <td>Total</td>
   <td>caja</td>
   <td>Usuario Abre</td>
   <td>Usuario cierre</td>
   </tr>`;

   this.cierresP.forEach(item=>{
    if(item2.id === item.id_cierre_total){pagosHtml +=`<tr> `;
    pagosHtml +=` <td>${item.fecha_apertura}</td> `;
    pagosHtml +=` <td>${item.fecha_cierre}</td> `;
    pagosHtml +=` <td>${item.base}</td> `;
    pagosHtml +=` <td>${item.sub_total_venta}</td> `;
    pagosHtml +=` <td>${item.total_iva}</td> `;
    pagosHtml +=` <td>${item.total_descuento}</td> `;
    pagosHtml +=` <td>${item.total_venta}</td> `;
    pagosHtml +=` <td>${item.nombreCajaCierre}</td> `;
    pagosHtml +=` <td>${item.nombreUsuarioApertura}</td> `;
    pagosHtml +=` <td>${item.nombreUsuarioCierre}</td> `;
    pagosHtml +=`</tr> `;}
    
  });
  
  pagosHtml += '</table>'



  Swal.fire({html:pagosHtml, width: '1000px'});

  }
  mostrarCierresPagos(item2:CortesDeCajaModule){ 
    
   let pagosHtml:string =  `<h1>Total de pagos relizados en el Cierre de caja # ${item2.id} <br>de la caja${item2.nombreCajaCierre}</h1>
   <h3>Pagos Realizados en el cierre</h3>
   <table class='table' style='font-size:12px'>  
   <tr>
   <td>Medio de Pago</td>
   <td>Total</td>
   </tr>`;


   this.cierresPagos.forEach(item=>{
    if(item2.id === item.cod_cierre){
    pagosHtml +=`<tr> `;
    pagosHtml +=` <td>${item.nombre}</td> `;
    pagosHtml +=` <td>${item.valor}</td> `; 
    pagosHtml +=`</tr> `;}
  });
  
  pagosHtml += '</table>'



  Swal.fire({html:pagosHtml, width: '800px'});

  }
}
