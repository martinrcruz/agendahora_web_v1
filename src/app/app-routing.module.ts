import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './website/containers';

import { HomeComponent } from './website/pages/home/home.component';
import { AgendaComponent } from './website/pages/agenda/agenda.component';
import { HistorialAgendaComponent } from './website/pages/historial-agenda/historial-agenda.component';
import { SolicitudVehiculoComponent } from './website/pages/solicitud-vehiculo/solicitud-vehiculo.component';
import { SolicitudClienteComponent } from './website/pages/solicitud-cliente/solicitud-cliente.component';
import { MensajeriaComponent } from './website/pages/mensajeria/mensajeria.component';
import { NotFoundComponent } from './website/pages/not-found/not-found.component';
import { ServiciosComponent } from './website/pages/servicios/servicios.component';
import { ClienteComponent } from './website/pages/cliente/cliente.component';
import { VehiculoComponent } from './website/pages/vehiculo/vehiculo.component';
import { LoginComponent } from './website/pages/auth/login/login.component'
import { ForgotPasswordComponent } from './website/pages/auth/forgot-password/forgot-password.component';

import { AuthGuard } from '../app/guards/auth.guard';
import { UsuariosComponent } from './website/pages/usuarios/usuarios.component';
import { PerfilComponent } from './website/pages/perfil/perfil.component';
import { AjustesCuentaComponent } from './website/pages/ajustes-cuenta/ajustes-cuenta.component';

const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
     
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        component: HomeComponent
      },
      {
        path: 'agenda',
        canActivate: [AuthGuard],
        component: AgendaComponent
      },
      {
        path: 'servicios',
        canActivate: [AuthGuard],
        component: ServiciosComponent
      },
      {
        path: 'historial-agenda',
        canActivate: [AuthGuard],
        component: HistorialAgendaComponent
      },
      {
        path: 'mensajeria',
        canActivate: [AuthGuard],
        component: MensajeriaComponent
      },
      {
        path: 'cliente',
        canActivate: [AuthGuard],
        component: ClienteComponent
      },
      {
        path: 'solicitud-cliente',
        component: SolicitudClienteComponent
      },
      {
        path: 'vehiculo',
        canActivate: [AuthGuard],
        component: VehiculoComponent
      },
      {
        path: 'solicitud-vehiculo',
        canActivate: [AuthGuard],
        component: SolicitudVehiculoComponent
      },
      {
        path: 'auth/login',
        component: LoginComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'ajustes-cuenta',
        component: AjustesCuentaComponent
      }



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
