import { Component, Input } from '@angular/core';
import { RecursoDetalle } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-menucards',
  templateUrl: './menucards.component.html',
  styleUrls: ['./menucards.component.css']
})
export class MenucardsComponent {
  @Input()  menuDetalle!: RecursoDetalle; 
}
