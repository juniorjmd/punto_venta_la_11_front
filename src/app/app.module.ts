import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CierresComponent } from './components/cierres/cierres.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MiUsuarioComponent } from './components/mi-usuario/mi-usuario.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PosComponent } from './components/pos/pos.component';
import { AbrirCajaComponent } from './components/pos/abrir-caja/abrir-caja.component';
import { VentasComponent } from './components/pos/ventas/ventas.component';
import { CerrarCajaComponent } from './components/pos/cerrar-caja/cerrar-caja.component';
import { DevolucionesComponent } from './components/pos/devoluciones/devoluciones.component';
import { EnviosComponent } from './components/pos/envios/envios.component';
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
import { UsuarioComponent } from './components/admon/usuario/usuario.component';
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

import { loading } from 'src/app/models/app.loading';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon'; 
import {MatTreeModule} from '@angular/material/tree';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { MenucardsComponent } from './components/layout/menucards/menucards.component';

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
    UsuarioComponent,
    InventariosComponent,
    NavbarComponent,
    UsuarioDetalleComponent,
    UsuarioEditarComponent,
    UsuarioNuevoComponent,
    UsuarioPerfilComponent,
    LoadingComponent,
    MenucardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    HttpClientModule,
    MatDialogModule,FontAwesomeModule
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
    MaestroClienteServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
