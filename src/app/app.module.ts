import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MiUsuarioComponent } from './components/mi-usuario/mi-usuario.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AbrirCajaComponent } from './components/pos/abrir-caja/abrir-caja.component';
import { VentasComponent } from './components/pos/ventas/ventas.component';
import { CerrarCajaComponent } from './components/pos/cerrar-caja/cerrar-caja.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteInicioComponent } from './components/clientes/cliente-inicio/cliente-inicio.component';
import { ClienteNuevoComponent } from './components/clientes/cliente-nuevo/cliente-nuevo.component';
import { ClienteDetalleComponent } from './components/clientes/cliente-detalle/cliente-detalle.component';
import { MaestrosComponent } from './components/maestros/maestros.component';
import { CiudadesComponent } from './components/maestros/ciudades/ciudades.component';
import { DepartamentosComponent } from './components/maestros/departamentos/departamentos.component';
import { PaisesComponent } from './components/maestros/paises/paises.component';
import { DatosPosComponent } from './components/datos-pos/datos-pos.component';
import { BodegasComponent } from './components/datos-pos/generales/bodegas/bodegas.component';
import { CaracteristicasComponent } from './components/datos-pos/generales/caracteristicas/caracteristicas.component';
import { CategoriasComponent } from './components/datos-pos/generales/categorias/categorias.component';
import { ContadoresComponent } from './components/datos-pos/generales/contadores/contadores.component';
import { CuentasCntComponent } from './components/datos-pos/generales/cuentas-cnt/cuentas-cnt.component';
import { EstablecimientosComponent } from './components/datos-pos/generales/establecimientos/establecimientos.component';
import { ImpuestosComponent } from './components/datos-pos/generales/impuestos/impuestos.component';
import { IventariosComponent } from './components/datos-pos/generales/iventarios/iventarios.component';
import { MediosDePagoComponent } from './components/datos-pos/generales/medios-de-pago/medios-de-pago.component';
import { ProductosComponent } from './components/datos-pos/generales/productos/productos.component';
import { TiposDeDocumentosComponent } from './components/datos-pos/generales/tipos-de-documentos/tipos-de-documentos.component';
import { CdetalleComponent } from './components/datos-pos/generales/cajas/cdetalle/cdetalle.component';
import { CnuevaComponent } from './components/datos-pos/generales/cajas/cnueva/cnueva.component';
import { CajasComponent } from './components/datos-pos/generales/cajas/cajas.component';
import { GeneralesComponent } from './components/datos-pos/generales/generales.component';
import { ReportesComponent } from './components/admon/reportes/reportes.component'; 
import { InventariosComponent } from './components/datos-pos/generales/inventarios/inventarios.component';
import { cajasServices } from './services/Cajas.services';
import { ClientesService } from './services/Clientes.services';
import { DatosInicialesService } from './services/datos-iniciales.service';
import { DocumentoService } from './services/documento.service';
import { LoginService } from './services/login.service';
import { DomiciliosService } from './services/domicilios.service';
import { ProductoService } from './services/producto.service';
import { MaestroClienteServices } from './services/MaestroCliente.services';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { UsuarioDetalleComponent } from './components/usuario/usuario-detalle/usuario-detalle.component';
import { UsuarioEditarComponent } from './components/usuario/usuario-editar/usuario-editar.component';
import { UsuarioNuevoComponent } from './components/usuario/usuario-nuevo/usuario-nuevo.component';
import { UsuarioPerfilComponent } from './components/usuario/usuario-perfil/usuario-perfil.component';
import { usuarioService } from './services/usuario.services';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/layout/loading/loading.component'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatToolbarModule} from '@angular/material/toolbar' ; 
import {MatRadioModule } from '@angular/material/radio' ; 
import {MatButtonModule } from '@angular/material/button' ; 
import {MatInputModule} from '@angular/material/input' ; 
import {MatSelectModule} from '@angular/material/select' ; 
import {MatTreeModule} from '@angular/material/tree' ; 
import {MatIconModule} from '@angular/material/icon' ; 
import {MatListModule} from '@angular/material/list' ; 
import {MatExpansionModule} from '@angular/material/expansion' ; 



import { MenucardsComponent } from './components/layout/menucards/menucards.component';
import { DineroPipe } from './pipes/dinero.pipe';
import { booleanpPipe } from './pipes/booleanp.pipe';
import { dataArrayOdooPipe } from './pipes/dataArrayOdoo.pipe';
import { ImgB64Pipe } from './pipes/imgB64.pipe';
import { DatePipe } from '@angular/common';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CierresComponent } from './components/admon/cierres/cierres.component';
import { TiposEstableComponent } from './components/datos-pos/generales/establecimientos/tipos-estable/tipos-estable.component';
import { SincOdooComponent } from './components/sinc-odoo/sinc-odoo.component';
import { PosComponent } from './components/pos/pos.component';
import { BuscarProdDirectoComponent } from './components/pos/buscar-prod-directo/buscar-prod-directo.component';
import { BuscarProductosAuxComponent } from './components/pos/buscar-productos-aux/buscar-productos-aux.component';
import { BuscarProductosComponent } from './components/pos/buscar-productos/buscar-productos.component';
import { DefinirBaseCajaComponent } from './components/pos/definir-base-caja/definir-base-caja.component';
import { MostrarProductoComponent } from './components/pos/mostrar-producto/mostrar-producto.component';
import { MoverDocumentosComponent } from './components/pos/mover-documentos/mover-documentos.component';
import { PagosVentaComponent } from './components/pos/pagos-venta/pagos-venta.component';
import { ResumenCajaComponent } from './components/pos/resumen-caja/resumen-caja.component';
import { FndClienteComponent } from './components/clientes/fnd-cliente/fnd-cliente.component';
import { DevolucionesComponent } from './components/pos/devoluciones/devoluciones.component';
import { EnviosComponent } from './components/pos/envios/envios.component'; 
import { DialogoConfirmacionComponent } from './components/layout/dialogo-confirmacion/dialogo-confirmacion.component';

import { NciudadComponent } from './components/maestros/new/nciudad/nciudad.component';
import { NpaisComponent } from './components/maestros/new/npais/npais.component';
import { NdepartamentoComponent } from './components/maestros/new/ndepartamento/ndepartamento.component';
import { NavbarUbicacionComponent } from './components/maestros/navbar-ubicacion/navbar-ubicacion.component';
import { ClientesDisponiblesComponent } from './components/clientes/clientes-disponibles/clientes-disponibles.component';
import { CambioPassComponent } from './components/login/cambio-pass/cambio-pass.component';
import { ClientesDispoLibranzaComponent } from './components/clientes/clientes-dispo-libranza/clientes-dispo-libranza.component';
import { LibranzasComponent } from './components/pos/libranzas/libranzas.component';
import { BusquedasLibComponent } from './components/pos/libranzas/busquedas-lib/busquedas-lib.component';
import { BusquedasLibpgComponent } from './components/pos/libranzas/busquedas-libpg/busquedas-libpg.component';

@NgModule({
  declarations: [
    AppComponent,
    CierresComponent,
    LoginComponent,
    HomeComponent,
    MiUsuarioComponent,
    InicioComponent,
    PosComponent,
    AbrirCajaComponent,
    VentasComponent,
    CerrarCajaComponent,
    DevolucionesComponent,
    EnviosComponent,
    ClientesComponent,
    ClienteInicioComponent,
    ClienteNuevoComponent,
    ClienteDetalleComponent,
    MaestrosComponent,
    CiudadesComponent,
    DepartamentosComponent,
    PaisesComponent,
    DatosPosComponent,
    BodegasComponent,
    CaracteristicasComponent,
    CategoriasComponent,
    ContadoresComponent,
    CuentasCntComponent,
    EstablecimientosComponent,
    ImpuestosComponent,
    IventariosComponent,
    MediosDePagoComponent,
    ProductosComponent,
    TiposDeDocumentosComponent,
    CdetalleComponent,
    CnuevaComponent,
    CajasComponent,
    GeneralesComponent,
    ReportesComponent, 
    InventariosComponent,
    NavbarComponent,
    UsuarioDetalleComponent,
    UsuarioEditarComponent,
    UsuarioNuevoComponent,
    UsuarioPerfilComponent,
    UsuarioComponent,
    LoadingComponent,
    MenucardsComponent,
    FndClienteComponent,
    DineroPipe,
    ImgB64Pipe,
    dataArrayOdooPipe,
    booleanpPipe,
    TiposEstableComponent,
    SincOdooComponent,
    DialogoConfirmacionComponent,
    BuscarProdDirectoComponent,
    BuscarProductosComponent,
    BuscarProductosAuxComponent,
    DefinirBaseCajaComponent,
    MostrarProductoComponent,
    MoverDocumentosComponent,
    PagosVentaComponent,
    ResumenCajaComponent,  
    NciudadComponent, NpaisComponent, NdepartamentoComponent, NavbarUbicacionComponent, ClientesDisponiblesComponent, CambioPassComponent, ClientesDispoLibranzaComponent, LibranzasComponent, BusquedasLibComponent, BusquedasLibpgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,  
    HttpClientModule,
    MatDialogModule,
    MatCheckboxModule,
    MatToolbarModule, 
    MatInputModule,
    MatSelectModule,
    MatTreeModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatRadioModule ,
    MatButtonModule,

    FontAwesomeModule
  ],
  providers: [
    cajasServices,
    ClientesService,
    DatosInicialesService,
    DocumentoService,
    LoginService,
    DomiciliosService,
    ProductoService,
    usuarioService,
    MaestroClienteServices,
    DatePipe ,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
