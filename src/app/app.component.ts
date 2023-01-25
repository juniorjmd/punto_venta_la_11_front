import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jdsC11_frontend';
  height:any = $(window).height(); 
  constructor(){
    
  }
  ngAfterContentInit() {
    console.log('  ChildComponent==>ngAfterContentInit');
    $('#contenedorGeneral').height(this.height);
  }
}
