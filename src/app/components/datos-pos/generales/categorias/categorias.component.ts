import { Component } from '@angular/core';
import { faAddressCard, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { select } from 'src/app/interfaces/generales';
import { loading } from 'src/app/models/app.loading';
import { CategoriasModel } from 'src/app/models/categorias.model';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent  {
  categorias: CategoriasModel[] = []; 
  loading = new loading()
  faPencilAlt = faPencilAlt;
  faAddressCard = faAddressCard;
  constructor( private productoService:ProductoService ) 
        {this.getUsuarios() }
  crearCategoria(){}
  setAgregarPerfil(categoriga : Categoria){}
  setActualizacategoria(categoriga : Categoria){}
  getUsuarios(){ 
    this.loading.show()
    this.productoService.getCategorias().subscribe(
      {next: 
      (datos:any|select)=>{
         console.log(datos);
         
    if (datos.numdata > 0 ){ 
      datos.data.forEach((dato:Categoria , index : number)=>{
        this.categorias[index] = new CategoriasModel(dato) ;
      }) 
      console.log(this.categorias);
    }else{
      this.categorias = [];
    }

        this.loading.hide()
      } ,
      error:error => {this.loading.hide();
        console.log(error)
        Swal.fire(
          'ERROR',error.error.error,
          'error');
      }}
      );
  }

  ngOnInit(): void {
  }

}
