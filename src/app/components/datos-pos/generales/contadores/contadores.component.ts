import { Component } from '@angular/core';

@Component({
  selector: 'app-contadores',
  templateUrl: './contadores.component.html',
  styleUrls: ['./contadores.component.css']
})
export class ContadoresComponent  {
  tipContadores :TipoDocumento [] = [];
  contadores :Contador [] = [] ;
  cajas :cajaModel[]  = []; 
  newContador :  Contador;
  esta : establecimientoModel[];
  constructor( private serviceCaja : cajasServices ,    
    private loading : loading ) { 
      this.Cancelar();
      this.getTiposDocumentosConContadores();
     this.getEstablecimiento();
     this.getContadores();
      }
      ngOnInit(): void {
      }
      Cancelar(){
        this.newContador={
          tipoContador:0,
                id : 0,
                codContador :'',
                establecimiento : 0, 
                contador:0, 
                contador_real_establecimiento:0, 
                estado:0,
                nombreEstablecimiento:'',
                nombre_estado :'',    
                desde :1    ,
                hasta : 1000      };
        
         
      }
      getTiposDocumentosConContadores(){
        this.tipContadores= [];
        this.serviceCaja.getTiposDocumentosConContadores()
         .subscribe(
          (datos:select)=>{
             console.log(datos);
             this.esta = [];   
        if (datos.numdata > 0 ){ 
          
          datos.data.forEach((dato:TipoDocumento , index )=>{
            this.tipContadores[index] = dato;
          })  
        }
    
            this.loading.hide()
          } ,
          error => {this.loading.hide();
            
            this.tipContadores = [];
            Swal.fire(
          'ERROR',error.error.error,
          'error');
          }
          );
      }
      getEstablecimiento(){
        this.newContador.establecimiento = 0;
        this.serviceCaja.getEstablecimientos()
         .subscribe(
          (datos:select)=>{
             console.log('datos establecimientos',datos);
             this.esta = [];   
        if (datos.numdata > 0 ){ 
          
          datos.data.forEach((dato:Establecimientos , index )=>{
            this.esta[index] =  dato ;
          }) 
          console.log(this.esta);
        }
    
            this.loading.hide()
          } ,
          error => {this.loading.hide();
            
        this.esta = [];
            Swal.fire(
          'ERROR',error.error.error,
          'error');
          }
          );
      }
      setActualizaCaja(cajaActualizar : Contador){
        this.newContador = cajaActualizar ; 
      }
    getContadores(){ 
      this.contadores = [];
      this.loading.show()
      this.serviceCaja.getContadores()
         .subscribe(
          (datos:select)=>{
             console.log(datos);
             
        if (datos.numdata > 0 ){ 
          datos.data.forEach((dato:Contador  , index )=>{ 
            this.contadores[index] = dato ;
          }) 
          console.log(this.contadores);
        }else{
          this.contadores = [];
        }
    
            this.loading.hide()
          } ,
          error => {this.loading.hide();
            Swal.fire(
          'ERROR',error.error.error,
          'error');
          }
          );
    }
    
    
     
       guardarContador(){ 
       if (typeof(this.newContador.codContador) === 'undefined'){
        this.loading.hide();
        alert('Debe ingresar el codigo para el contador');
        return;
       } 
       if (this.newContador.establecimiento === 0){
        this.loading.hide();
        alert('Debe escoger el establecimiento');
        return;
       }
       if (this.newContador.tipoContador === 0){
        this.loading.hide();
        alert('Debe escoger el tipo de contador');
        return;
       }
       
       this.loading.show(); 
       this.serviceCaja.setConsecutivo(this.newContador).subscribe(
        (respuesta:any)=>{console.log(respuesta)
         
        if (respuesta.error === 'ok'){
          Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'datos ingresados con exito',
        showConfirmButton: false,
        timer: 1500
      });  
          this.Cancelar();
          this.getContadores();
        }else{
          Swal.fire(  'ERROR',respuesta.error, 'error') ;
          this.loading.hide();
        }
        },
        error => {this.loading.hide();
          Swal.fire(
          'ERROR',error.error.error,
          'error');
          this.loading.hide();
        }
    
       )
      }
     
    
    }
