import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDetalleComponent } from './components/clientes/cliente-detalle/cliente-detalle.component';
import { ClienteInicioComponent } from './components/clientes/cliente-inicio/cliente-inicio.component';
import { ClienteNuevoComponent } from './components/clientes/cliente-nuevo/cliente-nuevo.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DatosPosComponent } from './components/datos-pos/datos-pos.component';
import { CajasComponent } from './components/datos-pos/generales/cajas/cajas.component';
import { CategoriasComponent } from './components/datos-pos/generales/categorias/categorias.component';
import { ContadoresComponent } from './components/datos-pos/generales/contadores/contadores.component';
import { CuentasCntComponent } from './components/datos-pos/generales/cuentas-cnt/cuentas-cnt.component';
import { EstablecimientosComponent } from './components/datos-pos/generales/establecimientos/establecimientos.component';
import { GeneralesComponent } from './components/datos-pos/generales/generales.component';
import { ImpuestosComponent } from './components/datos-pos/generales/impuestos/impuestos.component';
import { InventariosComponent } from './components/datos-pos/generales/inventarios/inventarios.component';
import { MediosDePagoComponent } from './components/datos-pos/generales/medios-de-pago/medios-de-pago.component';
import { ProductosComponent } from './components/datos-pos/generales/productos/productos.component';
import { TiposDeDocumentosComponent } from './components/datos-pos/generales/tipos-de-documentos/tipos-de-documentos.component';
import { HomeComponent } from './components/home/home.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { CiudadesComponent } from './components/maestros/ciudades/ciudades.component';
import { DepartamentosComponent } from './components/maestros/departamentos/departamentos.component';
import { MaestrosComponent } from './components/maestros/maestros.component';
import { PaisesComponent } from './components/maestros/paises/paises.component';
import { MiUsuarioComponent } from './components/mi-usuario/mi-usuario.component';
import { AbrirCajaComponent } from './components/pos/abrir-caja/abrir-caja.component';
import { CerrarCajaComponent } from './components/pos/cerrar-caja/cerrar-caja.component';
import { DevolucionesComponent } from './components/pos/devoluciones/devoluciones.component';
import { EnviosComponent } from './components/pos/envios/envios.component';
import { PosComponent } from './components/pos/pos.component';
import { VentasComponent } from './components/pos/ventas/ventas.component';
import { CnuevaComponent } from './components/datos-pos/generales/cajas/cnueva/cnueva.component';
import { CdetalleComponent } from './components/datos-pos/generales/cajas/cdetalle/cdetalle.component';
import { CierresComponent } from './components/cierres/cierres.component';
import { ReportesComponent } from './components/admon/reportes/reportes.component';
import { UsuarioComponent } from './components/admon/usuario/usuario.component';

const routes: Routes =  
[
    { path : 'login' , component : LoginComponent}, 
    { path : 'home' , 
    component : HomeComponent ,
      children : [       
        { path : 'miUsuario' , component : MiUsuarioComponent}, 
        { path : 'inicio' ,component : InicioComponent, },
        
          { path : 'pos' , component : PosComponent
           ,children:[
            { path : 'abrir' , component : AbrirCajaComponent},
            { path : 'ventas' , component : VentasComponent},
            { path : 'cerrar' , component : CerrarCajaComponent},
            { path : '**' , pathMatch:'full' , redirectTo : 'abrir'}, 
           ]}, 

           { path : 'devoluciones' , component : DevolucionesComponent},
           { path : 'envios' , component : EnviosComponent},

          { path : 'clientes' , component : ClientesComponent,
           children:[
            { path : 'listado' , component : ClienteInicioComponent},
            { path : 'nuevo' , component : ClienteNuevoComponent},
            { path : 'detalle/idCliente' , component : ClienteDetalleComponent},
            { path : 'maestros' , component : MaestrosComponent,
               children:[
                {   path : 'ciudades' , component: CiudadesComponent}, 
                {   path : 'departamentos' , component: DepartamentosComponent}, 
                {   path : 'paises' , component: PaisesComponent},     
                { path : '**' , pathMatch:'full' , redirectTo : 'ciudades'},  
                  
                ]},
            { path : '**' , pathMatch:'full' , redirectTo : 'listado'}, 
            ]}, 
        { path : 'DatosPos' , component: DatosPosComponent,
              children:[
                { path : 'generales' ,      component: GeneralesComponent},
                { path : 'contadores' ,      component: ContadoresComponent},
                { path : 'Medios' ,      component: MediosDePagoComponent},
                { path : 'inventarios' ,      component: InventariosComponent},
                { path : 'categorias' ,      component: CategoriasComponent},
                { path : 'productos' ,      component: ProductosComponent},
                { path : 'tipoDocumentos' ,      component: TiposDeDocumentosComponent},
                { path : 'establecimientos' ,    component: EstablecimientosComponent},
                { path : 'cuentasContables', component:CuentasCntComponent},
                { path : 'impuestos', component:ImpuestosComponent},
                { path : 'caja' ,      component: CajasComponent},
                { path : 'cajaNueva' ,      component: CnuevaComponent},
                { path : 'cajaDetalle:id' ,      component: CdetalleComponent},
                { path : '**' , pathMatch:'full' , redirectTo : 'generales'}, 
              ]          
              }, 
        
        { path : 'cierres' ,      component: CierresComponent},
        { path : 'reportes' ,      component: ReportesComponent},
        { path : 'usuarios' ,  component: UsuarioComponent },
                  
        { path : '**' , pathMatch:'full' , redirectTo : 'inicio'} 
      ]
    },
    { path : '**' , pathMatch:'full' , redirectTo : 'login'},
] ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


