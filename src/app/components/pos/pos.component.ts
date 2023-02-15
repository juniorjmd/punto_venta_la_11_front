import { Component, OnInit } from '@angular/core';
import { loading } from 'src/app/models/app.loading';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
  loading = new loading();
  constructor() { }

  ngOnInit(): void {
  }

}
