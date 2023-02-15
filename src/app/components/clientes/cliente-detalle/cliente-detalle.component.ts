import { Component } from '@angular/core';
import { MaestroClienteServices } from 'src/app/services/MaestroCliente.services';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css']
})
export class ClienteDetalleComponent {

  tipo_direccion: any[] = [];
  companias: any[] = [];
  Provincias: any[] = [];
  titulos: any[] = [];
  categorias: any[] = [];
  tipo_identificacion: any[] = [];
  constructor( private _MaestroClienteServices :MaestroClienteServices ) {  
  }


}
