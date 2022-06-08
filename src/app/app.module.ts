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
} from './containers';

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
import { HomeComponent } from './pages/home/home.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { HistorialAgendaComponent } from './pages/historial-agenda/historial-agenda.component';
import { SolicitudVehiculoComponent } from './pages/solicitud-vehiculo/solicitud-vehiculo.component';
import { SolicitudClienteComponent } from './pages/solicitud-cliente/solicitud-cliente.component';
import { MensajeriaComponent } from './pages/mensajeria/mensajeria.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TablaClienteComponent } from './components/tablas/tabla-cliente/tabla-cliente.component';
import { ModalVehiculoAddComponent } from './components/modals/modal-vehiculo-add/modal-vehiculo-add.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { TablaServicioComponent } from './components/tablas/tabla-servicio/tabla-servicio.component';


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
import { TablaHistorialServicioComponent } from './components/tablas/tabla-historial-servicio/tabla-historial-servicio.component';
import { TablaSolicitudClienteComponent } from './components/tablas/tabla-solicitud-cliente/tabla-solicitud-cliente.component';
import { TablaVehiculoComponent } from './components/tablas/tabla-vehiculo/tabla-vehiculo.component';
import { TablaSolicitudVehiculoComponent } from './components/tablas/tabla-solicitud-vehiculo/tabla-solicitud-vehiculo.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalVehiculoEditComponent } from './components/modals/modal-vehiculo-edit/modal-vehiculo-edit.component';
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
    LoginComponent,
    RegisterComponent,
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
    ModalVehiculoEditComponent],
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
