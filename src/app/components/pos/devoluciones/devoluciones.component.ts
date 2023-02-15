import { Component, OnInit } from '@angular/core';
import { loading } from 'src/app/models/app.loading';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent implements OnInit {
  loading = new loading();
  constructor() { }

  ngOnInit(): void {
  }

}
