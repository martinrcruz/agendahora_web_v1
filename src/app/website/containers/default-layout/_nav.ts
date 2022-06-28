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
    name: 'Calendario',
    iconComponent: { name: 'cil-calendar' },
    children: [
      {
        name: 'Agenda',
        url: '/agenda',
        iconComponent: { name: 'cil-book' },

      },
      {
        name: 'Servicios',
        url: '/servicios',
        iconComponent: { name: 'cil-task' },

      },
      {
        name: 'Historial',
        url: '/historial-agenda',
        iconComponent: { name: 'cil-history' },

      }
    ]
  },

  {
    name: 'Clientes',
    iconComponent: { name: 'cil-group' },
    children: [
      {
        name: 'Clientes',
        url: '/cliente',
        iconComponent: { name: 'cil-hand-point-right' },

      },
    ]
  },
  {
    name: 'Vehiculos',
    iconComponent: { name: 'cil-car-alt' },
    children: [
      {
        name: 'Vehiculos',
        url: '/vehiculo',
        iconComponent: { name: 'cil-hand-point-right' },

      },
      {
        name: 'Solicitud Vehiculos',
        url: '/solicitud-vehiculo',
        iconComponent: { name: 'cil-bell-exclamation' },

      },
      {
        name: 'Mantenedores',
        iconComponent: { name: 'cil-car-alt' },
        children: [
          {
            name: 'Marca',
            url: '/marca',
            iconComponent: { name: 'cil-triangle' },

          },
          {
            name: 'Modelo',
            url: '/modelo',
            iconComponent: { name: 'cil-square' },

          },
          {
            name: 'Version',
            url: '/version',
            iconComponent: { name: 'cil-circle' },

          }
        ]
      },

    ]

  },
  {
    name: 'Usuarios',
    url: '/usuarios',
    iconComponent: { name: 'cil-group' }
  },
  {
    name: 'Mensajeria',
    url: '/mensajeria',
    iconComponent: { name: 'cil-chat-bubble' }
  },

];
