import { Component } from '@angular/core';
import { faCogs, faEdit, faFolderMinus, faHouseUser, faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-datos-pos',
  templateUrl: './datos-pos.component.html',
  styleUrls: ['./datos-pos.component.css']
})
export class DatosPosComponent {
  faFolderMinus = faFolderMinus;
  faHouseUser = faHouseUser;
  faCogs= faCogs;
}
