import { Component } from '@angular/core';
import { faFolderMinus, faHouseUser, faCogs } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  fafolderminus = faFolderMinus;
  fahouseuser = faHouseUser;
  facogs = faCogs;
  constructor() { }

  ngOnInit(): void { }

  buscaCliente(evento:Event , texto : string){
    evento.preventDefault();
    console.log(texto);
  }
}
