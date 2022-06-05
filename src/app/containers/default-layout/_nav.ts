import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/home',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'NAVEGACION'
  },
  {
    name: 'Agenda',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Calendario',
        url: '/agenda',
        iconComponent: { name: 'cil-cursor' },

      },
      {
        name: 'Historial',
        url: '/historial-agenda',
        iconComponent: { name: 'cil-cursor' },

      }
    ]
  },
  {
    name: 'Solicitudes',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Solicitud Vehiculos',
        url: '/solicitud-vehiculo',
        iconComponent: { name: 'cil-cursor' },

      },
      {
        name: 'Solicitud Clientes',
        url: '/solicitud-cliente',
        iconComponent: { name: 'cil-cursor' },

      }
    ]
  },

  {
    name: 'Mensajeria',
    url: '/mensajeria',
    iconComponent: { name: 'cil-chart-pie' }
  },

];
