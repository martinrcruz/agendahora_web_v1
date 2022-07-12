import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgendaService } from 'src/app/services/agenda.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-modal-calendario-edit',
  templateUrl: './modal-calendario-edit.component.html',
  styleUrls: ['./modal-calendario-edit.component.scss']
})

export class ModalCalendarioEditComponent implements OnInit {

  public visible = false;

  constructor(
    private agendaService: AgendaService,
    private userService: UsuariosService,
    private servicioService: ServiciosService
  ) { }

  @Output() editedCalendario = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  selectorTecnico: any;
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;
  id_hora_agenda: any;
  state: any;

  formularioObj = {
    id_hora_agenda: '',
    id_servicio: '',
    tipo_servicio: '',
    nombre_tipo_servicio: '',
    estado_solicitud: '',
    nombre: '',
    observacion: '',
    detalle: '',
    hora: '',
    fecha_agenda: '',
    agenda_inicio: '',
    agenda_fin: '',
    tecnico: '',
    id_supervisor: '',
    nombre_supervisor: '',
    id_cliente: '',
    nombre_cliente: '',
    id_vehiculo: '',
    marca: '',
    modelo: '',
    version: ''
  }

  calendarioForm = new FormGroup({
    id_hora_agenda: new FormControl({ disabled: true }),
    nombre: new FormControl('', Validators.required),
    id_servicio: new FormControl('', Validators.required),
    tipo_servicio: new FormControl('', Validators.required),
    estado_solicitud: new FormControl('', Validators.required),
    nombre_tipo_servicio: new FormControl('', Validators.required),
    observacion: new FormControl('', Validators.required),
    detalle: new FormControl('', Validators.required),
    fecha_agenda: new FormControl('', Validators.required),
    agenda_inicio: new FormControl('', Validators.required),
    agenda_fin: new FormControl('', Validators.required),
    id_supervisor: new FormControl('', Validators.required),
    nombre_supervisor: new FormControl('', Validators.required),
    id_cliente: new FormControl('', Validators.required),
    nombre_cliente: new FormControl('', Validators.required),
    id_tecnico: new FormControl('', Validators.required),
    nombre_tecnico: new FormControl('', Validators.required),
    id_vehiculo: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),

    // id_usuario_cargo: new FormControl('', Validators.required),
  })




  ngOnInit(): void {
    this.getSelectorTecnico();
  }


  loadData(id_hora_agenda: Number) {
    console.log(id_hora_agenda);
    var formData: any = new FormData();
    formData.append("id_hora_agenda", id_hora_agenda);
    this.id_hora_agenda = id_hora_agenda;
    this.agendaService.getAgendaById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0].estado_solicitud);






          this.formularioObj.id_hora_agenda = this.editData.data[0].id_hora_agenda;
          this.formularioObj.id_servicio = this.editData.data[0].id_servicio;
          this.formularioObj.tipo_servicio = this.editData.data[0].tipo_servicio;
          this.formularioObj.nombre_tipo_servicio = this.editData.data[0].nombre_tipo_servicio;
          this.formularioObj.estado_solicitud = this.editData.data[0].estado_solicitud;
          this.formularioObj.nombre = this.editData.data[0].nombre_tipo_servicio + ' ' + this.editData.data[0].marca + ' ' + this.editData.data[0].modelo + ' ' + this.editData.data[0].version;
          this.formularioObj.observacion = this.editData.data[0].observacion;
          this.formularioObj.detalle = this.editData.data[0].detalle;
          this.formularioObj.hora = this.editData.data[0].hora;
          this.formularioObj.tecnico = this.editData.data[0].tecnico;
          this.formularioObj.id_supervisor = this.editData.data[0].id_supervisor;
          this.formularioObj.nombre_supervisor = this.editData.data[0].nombre_supervisor;
          this.formularioObj.id_cliente = this.editData.data[0].id_cliente;
          this.formularioObj.nombre_cliente = this.editData.data[0].nombre_cliente;
          this.formularioObj.id_vehiculo = this.editData.data[0].id_vehiculo;
          this.formularioObj.marca = this.editData.data[0].marca;
          this.formularioObj.modelo = this.editData.data[0].modelo;
          this.formularioObj.version = this.editData.data[0].version;
          this.formularioObj.fecha_agenda = this.editData.data[0].fecha_agenda;
          this.formularioObj.agenda_inicio = this.editData.data[0].agenda_inicio;
          this.formularioObj.agenda_fin = this.editData.data[0].agenda_fin;


          this.state = this.editData.data[0].estado_solicitud;
          this.calendarioForm.setValue({
            id_hora_agenda: this.editData.data[0].id_hora_agenda,
            id_servicio: this.editData.data[0].id_servicio,
            tipo_servicio: this.editData.data[0].tipo_servicio,
            nombre_tipo_servicio: this.editData.data[0].nombre_tipo_servicio,
            nombre: this.editData.data[0].nombre_tipo_servicio + ' ' + this.editData.data[0].marca + ' ' + this.editData.data[0].modelo + ' ' + this.editData.data[0].version,
            observacion: this.editData.data[0].observacion,
            detalle: this.editData.data[0].detalle,
            estado_solicitud: this.editData.data[0].estado_solicitud,
            fecha_agenda: this.editData.data[0].fecha_agenda,
            agenda_inicio: this.editData.data[0].agenda_inicio,
            agenda_fin: this.editData.data[0].agenda_fin,
            id_tecnico: this.editData.data[0].id_tecnico,
            nombre_tecnico: this.editData.data[0].nombre_tecnico,
            id_supervisor: this.editData.data[0].id_supervisor,
            nombre_supervisor: this.editData.data[0].nombre_supervisor,
            id_cliente: this.editData.data[0].id_cliente,
            nombre_cliente: this.editData.data[0].nombre_cliente,
            id_vehiculo: this.editData.data[0].id_vehiculo,
            marca: this.editData.data[0].marca,
            modelo: this.editData.data[0].modelo,
            version: this.editData.data[0].version
          })
          this.openModal();

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }
  deleteCalendario() {
    var formData: any = new FormData();
    formData.append("id_hora_agenda", this.calendarioForm.get("id_hora_agenda")?.value);

    if (this.calendarioForm.valid) {
      this.agendaService.deleteAgenda(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.calendarioForm.getRawValue())
            this.saveResponse = err
          }
        })
    }
  }
  updateCalendario() {
    var formData: any = new FormData();
    formData.append("id_hora_agenda", this.calendarioForm.get("id_hora_agenda")?.value);
    formData.append("id_servicio", this.calendarioForm.get("id_servicio")?.value);
    formData.append("tipo_servicio", this.calendarioForm.get("tipo_servicio")?.value);
    formData.append("nombre_tipo_servicio", this.calendarioForm.get("nombre_tipo_servicio")?.value);
    formData.append("estado_solicitud", this.calendarioForm.get("estado_solicitud")?.value);

    formData.append("nombre", this.calendarioForm.get("nombre")?.value);
    formData.append("observacion", this.calendarioForm.get("observacion")?.value);
    formData.append("detalle", this.calendarioForm.get("detalle")?.value);
    formData.append("hora", this.calendarioForm.get("hora")?.value);
    formData.append("tecnico", this.calendarioForm.get("tecnico")?.value);
    formData.append("id_supervisor", this.calendarioForm.get("id_supervisor")?.value);
    formData.append("nombre_supervisor", this.calendarioForm.get("nombre_supervisor")?.value);
    formData.append("id_cliente", this.calendarioForm.get("id_cliente")?.value);
    formData.append("nombre_cliente", this.calendarioForm.get("nombre_cliente")?.value);
    formData.append("id_vehiculo", this.calendarioForm.get("id_vehiculo")?.value);
    formData.append("marca", this.calendarioForm.get("marca")?.value);
    formData.append("modelo", this.calendarioForm.get("modelo")?.value);
    formData.append("version", this.calendarioForm.get("version")?.value);

    // formData.append("id_usuario_cargo", this.calendarioForm.get("id_usuario_cargo")?.value);

    if (this.calendarioForm.valid) {
      this.agendaService.updateAgenda(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.calendarioForm.getRawValue())
            this.saveResponse = err
          }
        })
    }
  }

  clearForm() {
    this.calendarioForm.setValue({
      id_hora_agenda: '',
      id_servicio: '',
      tipo_servicio: '',
      estado_solicitud: '',
      nombre: '',
      observacion: '',
      detalle: '',
      hora: '',
      tecnico: '',
      id_supervisor: '',
      nombre_supervisor: '',
      id_cliente: '',
      nombre_cliente: '',
      id_vehiculo: '',
      marca: '',
      modelo: '',
      version: '',


      // id_usuario_cargo: '',
    })
  }

  getSelectorTecnico() {
    this.userService.getTecnicos()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const selectorTecnico = (newData[1][1])
          console.log(selectorTecnico)
          this.selectorTecnico = selectorTecnico;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  acceptHora() {
    var formData: any = new FormData();
    formData.append("id_hora_agenda", this.calendarioForm.get("id_hora_agenda")?.value);
    formData.append("estado_solicitud", 1);

    this.agendaService.processHoraAgenda(formData)
      .subscribe({
        next: (res) => {
          this.saveResponse = res;
          console.log(this.saveResponse)

          this.processAcceptedHora()
          // this.refreshTable.emit();
        },
        error: (err) => {
          console.log(this.calendarioForm.getRawValue())
          this.saveResponse = err
        }
      })

  }


  processAcceptedHora() {
    console.log(this.id_hora_agenda)
    var formData: any = new FormData();
    formData.append("tipo_servicio", this.calendarioForm.get("tipo_servicio")?.value);
    formData.append("nombre", this.calendarioForm.get("nombre")?.value);
    formData.append("observacion", this.calendarioForm.get("observacion")?.value);
    formData.append("detalle", this.calendarioForm.get("detalle")?.value);
    formData.append("estado_servicio", 3);
    formData.append("id_vehiculo", this.calendarioForm.get("id_vehiculo")?.value);
    formData.append("id_tecnico", this.calendarioForm.get("id_tecnico")?.value);
    formData.append("id_cliente", this.calendarioForm.get("id_cliente")?.value);
    formData.append("id_supervisor", this.calendarioForm.get("id_supervisor")?.value);

    formData.append("fecha_entrada", this.calendarioForm.get("agenda_inicio")?.value);
    formData.append("fecha_salida", this.calendarioForm.get("agenda_fin")?.value);

    formData.append("fecha_agenda", this.calendarioForm.get("fecha_agenda")?.value);
    formData.append("agenda_inicio", this.calendarioForm.get("agenda_inicio")?.value);
    formData.append("agenda_fin", this.calendarioForm.get("agenda_fin")?.value);

    this.servicioService.addServicio(formData)
      .subscribe({
        next: (res) => {
          this.saveResponse = res;
          console.log(this.saveResponse)
          this.refreshTable.emit();
          this.openModal()

        },
        error: (err) => {
          console.log(this.calendarioForm.getRawValue())
          this.saveResponse = err
        }
      })

  }




  rejectHora() {
    console.log(this.id_hora_agenda)
    var formData: any = new FormData();
    formData.append("id_hora_agenda", this.calendarioForm.get("id_hora_agenda")?.value);
    formData.append("estado_solicitud", 2);


    this.agendaService.processHoraAgenda(formData)
      .subscribe({
        next: (res) => {
          this.saveResponse = res;
          console.log(this.saveResponse)
          this.openModal()
          this.refreshTable.emit();
        },
        error: (err) => {
          console.log(this.calendarioForm.getRawValue())
          this.saveResponse = err
        }
      })

  }
  reviewHora() {
    console.log(this.id_hora_agenda)
    var formData: any = new FormData();
    formData.append("id_hora_agenda", this.calendarioForm.get("id_hora_agenda")?.value);
    formData.append("estado_solicitud", 4);


    this.agendaService.processHoraAgenda(formData)
      .subscribe({
        next: (res) => {
          this.saveResponse = res;
          console.log(this.saveResponse)
          this.openModal()
          this.refreshTable.emit();
        },
        error: (err) => {
          console.log(this.calendarioForm.getRawValue())
          this.saveResponse = err
        }
      })

  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

}