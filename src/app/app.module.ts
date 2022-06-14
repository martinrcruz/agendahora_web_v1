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
import { ProfileComponent } from './website/pages/profile/profile.component';
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

import { MatNativeDateModule } from '@angular/material/core';


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
    ProfileComponent,
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
    ModalSolicitudClienteEditComponent
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
    MatSelectModule
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
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
