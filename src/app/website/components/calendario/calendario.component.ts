import { Component, OnInit, ViewChildren, ViewChild, Output, EventEmitter } from '@angular/core';
import { CalendarApi, CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/angular';
import { ModalCalendarioAddComponent } from '../modals/modal-calendario-add/modal-calendario-add.component';
import { ModalCalendarioEditComponent } from '../modals/modal-calendario-edit/modal-calendario-edit.component';
import { AgendaService } from 'src/app/services/agenda.service';
import { cibJquery } from '@coreui/icons';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})

export class CalendarioComponent implements OnInit {

  @ViewChild(ModalCalendarioAddComponent) modalCalendarioAddComponent!: ModalCalendarioAddComponent;
  @ViewChild(ModalCalendarioEditComponent) modalCalendarioEditComponent!: ModalCalendarioEditComponent;


  @Output() dateSelectedForDay = new EventEmitter<string>();

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    locale: 'es',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    // select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5],
      startTime: '08:00',
      endTime: '18:00',
    },
    slotDuration: '00:15:00',
    slotMinTime: '08:00:00',
    slotMaxTime: '23:00:00',
    timeZone: 'America/Santiago',

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor(private agendaService: AgendaService) { }

  ngOnInit() {
    this.getCalendario();
  }

  getCalendario() {
    this.agendaService.getAgenda()
      .subscribe({
        next: (res) => {
          var newEvents: any = [];
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          for (let i = 0; i < datos.length; i++) {

            var eventColor = this.getEventColor(datos[i].estado_solicitud)
            newEvents.push({
              id_hora_agenda: datos[i].id_hora_agenda,
              id_servicio: datos[i].id_servicio,
              nombre: datos[i].nombre,
              observacion: datos[i].observacion,
              fecha_entrada: datos[i].fecha_entrada,
              fecha_salida: datos[i].fecha_salida,
              id_usuario_tecnico: datos[i].id_usuario_tecnico,
              id_cliente: datos[i].id_cliente,
              id_vehiculo: datos[i].id_vehiculo,
              id_usuario_cargo: datos[i].id_usuario_cargo,
              title: datos[i].nombre_tipo_servicio,
              start: datos[i].fecha_entrada,
              end: datos[i].fecha_salida,
              display: "block",
              borderColor: eventColor,
              backgroundColor: eventColor
            })
          }
          this.calendarOptions.events = newEvents;
        },
        error: (err: any) => {
          alert('Error fetching')
        }
      })
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.modalCalendarioAddComponent.openModal();

  }

  handleEventClick(clickInfo: EventClickArg) {
    this.modalCalendarioEditComponent.loadData(clickInfo.event.extendedProps['id_hora_agenda']);
  }
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
  refreshTable() {
    this.getCalendario();
  }

  getEventColor(eventId: any) {
    switch (eventId) {
      case '1':
        return '#37b853';
      case '3':
        return '#dbcd00';
      case '4':
        return '#8e1492';
      default:
        return '#0ae4f0';
    }

  }
}
