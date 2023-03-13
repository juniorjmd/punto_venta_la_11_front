import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { Clientes } from 'src/app/interfaces/clientes.interface';
import { select } from 'src/app/interfaces/generales';
import { Persona } from 'src/app/interfaces/persona';
import { loading } from 'src/app/models/app.loading';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { usuarioService } from 'src/app/services/usuario.services';
import Swal from 'sweetalert2';
import { ClientesDisponiblesComponent } from '../../clientes/clientes-disponibles/clientes-disponibles.component';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html',
  styleUrls: ['./usuario-nuevo.component.css']
})
export class UsuarioNuevoComponent {
  newUsuario:UsuarioModel =  new UsuarioModel();
  fatrash = faTrash
  fasave = faSave
  public loading = new loading();
  constructor( public dialogo: MatDialogRef<UsuarioNuevoComponent>, 
    private newUsuarioDialog : MatDialog ,  
     private userService : usuarioService) { 
      this.newUsuario.estado = 0
  }

  ngOnInit(): void {
  }
  
  buscarPersonaDisponible(){
    this.newUsuarioDialog.open(ClientesDisponiblesComponent,{data:null})
  .afterClosed()
  .subscribe((result:{confirmado:boolean , persona: Persona} )=>{
    if (result.confirmado){ 
      console.log(result.persona);
      this.newUsuario.nombreCompleto = result.persona.display_name! ;
      this.newUsuario.Nombre1 = result.persona.display_name! ;
      this.newUsuario.mail = result.persona.email! ;
      this.newUsuario.idPersona = result.persona.id! ;
  }
  })
  }
  guardarUsuario(){
    console.log('nueva caja',this.newUsuario.Nombre1)
    this.newUsuario.usr_registro =  parseInt(localStorage.getItem('#2@56YH7H82BF')!); 
    if (typeof(this.newUsuario.Nombre1) === 'undefined'){
     this.loading.hide();
     alert('Debe ingresar el Nombre de la caja');
     return;
    }
    if (typeof(this.newUsuario.Login) === 'undefined'){
      this.loading.hide();
      alert('Debe ingresar el Usuario para inicio de sesión');
      return;
     }
    if (typeof(this.newUsuario.estado) === 'undefined'){
     this.newUsuario.estado = 1 ;
    }else{
     if ( this.newUsuario.estado  === 0){
       this.newUsuario.estado = 1 ;
      }
    }
  
    
    this.loading.show(); 
    this.userService.guardarUsuarios(this.newUsuario).subscribe(
     (respuesta:any)=>{console.log(respuesta)
      
     if (respuesta.error === 'ok'){
       Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'datos ingresados con exito',
        showConfirmButton: false,
        timer: 1500
      });  
       this.newUsuario =  new UsuarioModel(undefined); 
     }else{
       Swal.fire(  'ERROR',respuesta.error, 'error') ;
     }
     this.loading.hide();
     this.cerrarFormularioTrue()
     })
  }
  cerrarFormulario(){
    this.dialogo.close(false);
  }
  cerrarFormularioTrue(){
    this.dialogo.close(true);
  }
  limpiarFormulario(){
    this.newUsuario = new UsuarioModel(undefined);
  }
  buscarPersonas(){
     
  this.loading.show();
  this.userService.getPersonasDisponibles().subscribe( 
    async ( respuesta:any|select)=>{
      let cont = 0;
       console.log('getCierresTotalesYparciales',respuesta); 
       if (respuesta.error === 'ok' ){ 
         if (respuesta.numdata > 0)
         {//respuesta.data[0]; 
        console.log('datos cierres',respuesta.data);

 
        let pagosHtml:string =  `
        <h3>Personas Disponibles</h3>
        <table class='table' style='font-size:12px'>  
        <tr> 
        <td colspan='3'>  <div class="row"> <div class="col-sm-1">
        <label for="email">Filtro: </label></div>
        <div class="col-sm-10"> <div class="form-group">
        <input   type="text"  class="o_input"  >
        </div></div></div>
    </td> 
        </tr>
        <tr>
        <td>Nombre</td>
        <td>Correo</td>
        <td>Identificacion</td>
        </tr>`;
          ;
        respuesta.data.forEach((item:Persona)=>{
          pagosHtml +=`<tr  click = 'alert(${item.id})' clase="personalDisp"> `;
         pagosHtml +=` <td style="text-align: left;">${item.display_name}</td> `;
         pagosHtml +=` <td>${item.email}</td> `;
         pagosHtml +=` <td>${item.vat}</td> `;
         pagosHtml +=`</tr> `;
         
       });       
       
       pagosHtml += `</table>`;
       
       await Swal.fire({html:pagosHtml, width: '800px'})  
       this.agregarClick()
      }

       }else{
         alert(respuesta.error);
       }
       this.loading.hide();
  }) 
  }
agregarClick( ){ 
  alert('eje')
    $('.personalDisp').prop('click',function(){alert(this)
    }) ;
     
  }
   
}

