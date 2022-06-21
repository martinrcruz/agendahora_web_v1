import { Component, OnInit, ViewChildren,ViewChild } from '@angular/core';
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

  @ViewChild(ModalCalendarioAddComponent) modalCalendarioAddComponent!:ModalCalendarioAddComponent;
  @ViewChild(ModalCalendarioEditComponent) modalCalendarioEditComponent!:ModalCalendarioEditComponent;


  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
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
          for(let i = 0; i < datos.length; i++){
            newEvents.push({
              id_hora_agenda: datos[i].id_hora_agenda,
              id_servicio: datos[i].id_servicio,
              nombre: datos[i].nombre,
              descripcion: datos[i].descripcion,
              fecha_entrada: datos[i].fecha_entrada,
              fecha_salida: datos[i].fecha_salida,
              id_usuario_tecnico: datos[i].id_usuario_tecnico,
              id_cliente: datos[i].id_cliente,
              id_vehiculo: datos[i].id_vehiculo,
              id_usuario_cargo: datos[i].id_usuario_cargo,
              title: datos[i].nombre,
              start: datos[i].fecha_entrada,
              end: datos[i].fecha_salida,
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
  refreshTable(){
    this.getCalendario();
  }
}
