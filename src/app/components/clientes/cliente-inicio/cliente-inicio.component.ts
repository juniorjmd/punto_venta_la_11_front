import { Component } from '@angular/core';
import { ClientesOdoo } from 'src/app/interfaces/clientes-odoo';
import { select } from 'src/app/interfaces/generales';
import { loading } from 'src/app/models/app.loading';
import { ClientesService } from 'src/app/services/Clientes.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-inicio',
  templateUrl: './cliente-inicio.component.html',
  styleUrls: ['./cliente-inicio.component.css']
})
export class ClienteInicioComponent{
  clientes:ClientesOdoo[] = [];
  loading  = new loading()
  constructor(  private ClienteService:ClientesService) { 
    this.getClientesOdoo() 

  }

  ngOnInit(): void {
   // this.clientes= this.ClienteService.getDatosIniClientes()
  }
  getClientesOdoo(){
    this.loading.show();
    this.ClienteService.getClientesOdoo().subscribe((respuesta:any|select)=>{
      let cont = 0;
      
       console.log('cerrarDocumento',respuesta); 
       if (respuesta.error === 'ok'){ 
        console.log(respuesta);
        this.clientes = respuesta.data ; 
       
       }else{
         Swal.fire(  'ERROR',respuesta.error, 'error') ;
       }
       this.loading.hide();
       

} )
  }
}
