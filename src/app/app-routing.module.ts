import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';

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
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'agenda',
        component: AgendaComponent
      },
      {
        path: 'servicios',
        component: ServiciosComponent
      },
      {
        path: 'historial-agenda',
        component: HistorialAgendaComponent
      },
      {
        path: 'mensajeria',
        component: MensajeriaComponent
      },
      {
        path: 'cliente',
        component: ClienteComponent
      },
      {
        path: 'solicitud-cliente',
        component: SolicitudClienteComponent
      },
      {
        path: 'vehiculo',
        component: VehiculoComponent
      },
      {
        path: 'solicitud-vehiculo',
        component: SolicitudVehiculoComponent
      },

    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
