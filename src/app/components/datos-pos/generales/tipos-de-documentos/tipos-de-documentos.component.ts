import { Component } from '@angular/core';
import { TipoDeDocumentos } from 'src/app/interfaces/tipo-de-documentos';
import { loading } from 'src/app/models/app.loading';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipos-de-documentos',
  templateUrl: './tipos-de-documentos.component.html',
  styleUrls: ['./tipos-de-documentos.component.css']
})
export class TiposDeDocumentosComponent  {
  tiposDeDocumento : TipoDeDocumentos[] = [];  loading = new loading()
  constructor( private servicePrd : ProductoService ,   ) {
    this.loading.show();
    this.servicePrd.getTiposDeDocumentos().subscribe(
      (respuesta:any)=>{console.log(respuesta)
       
      if (respuesta.error === 'ok'){
         this.tiposDeDocumento = respuesta.data;
      }else{
        Swal.fire(  'ERROR',respuesta.error, 'error') ;
      }
      
      this.loading.hide();
      }
  
     )
   }

  ngOnInit(): void {
  }

}
