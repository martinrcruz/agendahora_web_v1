import { NgModule, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './website/containers';

//Import angular
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  ModalModule
} from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';

//COREUI
import { IconModule, IconSetService } from '@coreui/icons-angular';

//COMPONENTES 
import { HomeComponent } from './website/pages/home/home.component';
import { AgendaComponent } from './website/pages/agenda/agenda.component';
import { HistorialAgendaComponent } from './website/pages/historial-agenda/historial-agenda.component';
import { SolicitudVehiculoComponent } from './website/pages/solicitud-vehiculo/solicitud-vehiculo.component';
import { SolicitudClienteComponent } from './website/pages/solicitud-cliente/solicitud-cliente.component';
import { MensajeriaComponent } from './website/pages/mensajeria/mensajeria.component';
import { NotFoundComponent } from './website/pages/not-found/not-found.component';
import { TablaClienteComponent } from './website/components/tablas/tabla-cliente/tabla-cliente.component';
import { TablaHistorialServicioComponent } from './website/components/tablas/tabla-historial-servicio/tabla-historial-servicio.component';
import { TablaSolicitudClienteComponent } from './website/components/tablas/tabla-solicitud-cliente/tabla-solicitud-cliente.component';
import { TablaVehiculoComponent } from './website/components/tablas/tabla-vehiculo/tabla-vehiculo.component';
import { TablaSolicitudVehiculoComponent } from './website/components/tablas/tabla-solicitud-vehiculo/tabla-solicitud-vehiculo.component';
import { ModalVehiculoAddComponent } from './website/components/modals/modal-vehiculo-add/modal-vehiculo-add.component';
import { CalendarioComponent } from './website/components/calendario/calendario.component';
import { VehiculoComponent } from './website/pages/vehiculo/vehiculo.component';
import { ClienteComponent } from './website/pages/cliente/cliente.component';
import { ServiciosComponent } from './website/pages/servicios/servicios.component';
import { TablaServicioComponent } from './website/components/tablas/tabla-servicio/tabla-servicio.component';
import { ModalVehiculoEditComponent } from './website/components/modals/modal-vehiculo-edit/modal-vehiculo-edit.component';
import { ModalServicioAddComponent } from './website/components/modals/modal-servicio-add/modal-servicio-add.component';
import { ModalServicioCheckComponent } from './website/components/modals/modal-servicio-check/modal-servicio-check.component';
import { ModalServicioEditComponent } from './website/components/modals/modal-servicio-edit/modal-servicio-edit.component';
import { ForgotPasswordComponent } from './website/pages/auth/forgot-password/forgot-password.component';
import { UsuariosComponent } from './website/pages/usuarios/usuarios.component';
import { AjustesCuentaComponent } from './website/pages/ajustes-cuenta/ajustes-cuenta.component';
import { LoginComponent } from './website/pages/auth/login/login.component';
import { ModalClienteEditComponent } from './website/components/modals/modal-cliente-edit/modal-cliente-edit.component';
import { ModalClienteAddComponent } from './website/components/modals/modal-cliente-add/modal-cliente-add.component';
import { ModalSolicitudVehiculoAddComponent } from './website/components/modals/modal-solicitud-vehiculo-add/modal-solicitud-vehiculo-add.component';
import { ModalSolicitudVehiculoEditComponent } from './website/components/modals/modal-solicitud-vehiculo-edit/modal-solicitud-vehiculo-edit.component';
import { ModalHistorialServicioAddComponent } from './website/components/modals/modal-historial-servicio-add/modal-historial-servicio-add.component';
import { ModalHistorialServicioEditComponent } from './website/components/modals/modal-historial-servicio-edit/modal-historial-servicio-edit.component';
import { ModalSolicitudClienteAddComponent } from './website/components/modals/modal-solicitud-cliente-add/modal-solicitud-cliente-add.component';
import { ModalSolicitudClienteEditComponent } from './website/components/modals/modal-solicitud-cliente-edit/modal-solicitud-cliente-edit.component';
import { TablaUsuariosComponent } from './website/components/tablas/tabla-usuarios/tabla-usuarios.component';
import { ModalUsuarioAddComponent } from './website/components/modals/modal-usuario-add/modal-usuario-add.component';
import { ModalUsuarioEditComponent } from './website/components/modals/modal-usuario-edit/modal-usuario-edit.component';
import { PerfilComponent } from './website/pages/perfil/perfil.component';
import { ModalCalendarioAddComponent } from './website/components/modals/modal-calendario-add/modal-calendario-add.component';
import { ModalCalendarioEditComponent } from './website/components/modals/modal-calendario-edit/modal-calendario-edit.component';
import { TablaAgendaComponent } from './website/components/tablas/tabla-agenda/tabla-agenda.component';
import { ModalAgendaCheckComponent } from './website/components/modals/modal-agenda-check/modal-agenda-check.component';
import { MarcaComponent } from './website/pages/marca/marca.component';
import { ModeloComponent } from './website/pages/modelo/modelo.component';
import { VersionComponent } from './website/pages/version/version.component';
import { ModalMarcaAddComponent } from './website/components/modals/modal-marca-add/modal-marca-add.component';
import { ModalMarcaEditComponent } from './website/components/modals/modal-marca-edit/modal-marca-edit.component';
import { ModalModeloAddComponent } from './website/components/modals/modal-modelo-add/modal-modelo-add.component';
import { ModalModeloEditComponent } from './website/components/modals/modal-modelo-edit/modal-modelo-edit.component';
import { ModalVersionAddComponent } from './website/components/modals/modal-version-add/modal-version-add.component';
import { ModalVersionEditComponent } from './website/components/modals/modal-version-edit/modal-version-edit.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Grafico1Component } from './website/components/graficos/grafico1/grafico1.component';
import { Grafico2Component } from './website/components/graficos/grafico2/grafico2.component';
import { Grafico3Component } from './website/components/graficos/grafico3/grafico3.component';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { TablaMarcaComponent } from './website/components/tablas/tabla-marca/tabla-marca.component';
import { TablaModeloComponent } from './website/components/tablas/tabla-modelo/tabla-modelo.component';
import { TablaVersionComponent } from './website/components/tablas/tabla-version/tabla-version.component';
import { EstadoServicioComponent } from './website/pages/estado-servicio/estado-servicio.component';
import { EstadoSolicitudComponent } from './website/pages/estado-solicitud/estado-solicitud.component';
import { TipoServicioComponent } from './website/pages/tipo-servicio/tipo-servicio.component';

//[ANGULAR MATERIAL]
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';


//FULLCALENDAR
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ModalAgendaEditComponent } from './website/components/modals/modal-agenda-edit/modal-agenda-edit.component';



FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin
]);


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    HomeComponent,
    AgendaComponent,
    HistorialAgendaComponent,
    SolicitudVehiculoComponent,
    SolicitudClienteComponent,
    MensajeriaComponent,
    NotFoundComponent,
    CalendarioComponent,
    VehiculoComponent,
    ClienteComponent,
    ServiciosComponent,
    TablaClienteComponent,
    TablaServicioComponent,
    TablaHistorialServicioComponent,
    TablaSolicitudClienteComponent,
    TablaVehiculoComponent,
    TablaSolicitudVehiculoComponent,
    ModalVehiculoAddComponent,
    ModalVehiculoEditComponent,
    ModalServicioAddComponent,
    ModalServicioCheckComponent,
    ModalServicioEditComponent,
    ForgotPasswordComponent,
    UsuariosComponent,
    AjustesCuentaComponent,
    LoginComponent,
    TablaVehiculoComponent,
    TablaSolicitudVehiculoComponent,
    ModalClienteEditComponent,
    ModalClienteAddComponent,
    ModalSolicitudVehiculoAddComponent,
    ModalSolicitudVehiculoEditComponent,
    ModalHistorialServicioAddComponent,
    ModalHistorialServicioEditComponent,
    ModalSolicitudClienteAddComponent,
    ModalSolicitudClienteEditComponent,
    TablaUsuariosComponent,
    ModalUsuarioAddComponent,
    ModalUsuarioEditComponent,
    PerfilComponent,
    ModalCalendarioAddComponent,
    ModalCalendarioEditComponent,
    Grafico1Component,
    Grafico2Component,
    Grafico3Component,
    TablaAgendaComponent,
    ModalAgendaCheckComponent,
    MarcaComponent,
    ModeloComponent,
    VersionComponent,
    TablaMarcaComponent,
    TablaModeloComponent,
    TablaVersionComponent,
    ModalMarcaAddComponent,
    ModalMarcaEditComponent,
    ModalModeloAddComponent,
    ModalModeloEditComponent,
    ModalVersionAddComponent,
    ModalVersionEditComponent,
    EstadoServicioComponent,
    EstadoSolicitudComponent,
    TipoServicioComponent,
    ModalAgendaEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    FullCalendarModule,
    ModalModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    SweetAlert2Module,
    ChartjsModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: MAT_DATE_LOCALE, useValue: 'es-ES'
    },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
