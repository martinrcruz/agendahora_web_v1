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
        path: 'historial-agenda',
        component: HistorialAgendaComponent
      },
      {
        path: 'mensajeria',
        component: MensajeriaComponent
      },
      {
        path: 'solicitud-cliente',
        component: SolicitudClienteComponent
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
