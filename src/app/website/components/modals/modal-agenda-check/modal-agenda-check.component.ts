import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgendaService } from 'src/app/services/agenda.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TablaAgendaComponent } from '../../tablas/tabla-agenda/tabla-agenda.component';

@Component({
  selector: 'app-modal-agenda-check',
  templateUrl: './modal-agenda-check.component.html',
  styleUrls: ['./modal-agenda-check.component.scss']
})
export class ModalAgendaCheckComponent implements OnInit {
  public visible = false;

  constructor(
    private agendaService: AgendaService,
    private tablaAgenda: TablaAgendaComponent,
    private userService: UsuariosService
  ) { }

  selectorTecnico: any;
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;


  ngOnInit(): void {


  }



  agendaHoraForm = new FormGroup({
    id_hora_agenda: new FormControl({ disabled: true }),
    nombre: new FormControl('', Validators.required),
    id_servicio: new FormControl('', Validators.required),
    tipo_servicio: new FormControl('', Validators.required),
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
  })



  loadData(id_agenda: any) {
    var formData: any = new FormData();
    formData.append("id_hora_agenda", id_agenda);

    this.agendaService.getAgendaById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData)
          this.agendaHoraForm.setValue({
            id_hora_agenda: this.editData.data[0].id_hora_agenda,
            id_servicio: this.editData.data[0].id_servicio,
            tipo_servicio: this.editData.data[0].tipo_servicio,
            nombre_tipo_servicio: this.editData.data[0].nombre_tipo_servicio,
            nombre: this.editData.data[0].nombre_tipo_servicio + ' ' + this.editData.data[0].marca + ' ' + this.editData.data[0].modelo + ' ' + this.editData.data[0].version,
            observacion: this.editData.data[0].observacion,
            detalle: this.editData.data[0].detalle,
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

          this.openModal()

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }

  updateAgendaHora() {
    var formData: any = new FormData();
    formData.append("id_hora_agenda", this.agendaHoraForm.get("id_hora_agenda")?.value);
    formData.append("id_servicio", this.agendaHoraForm.get("id_servicio")?.value);
    formData.append("tipo_servicio", this.agendaHoraForm.get("tipo_servicio")?.value);
    formData.append("nombre_tipo_servicio", this.agendaHoraForm.get("nombre_tipo_servicio")?.value);

    formData.append("nombre", this.agendaHoraForm.get("nombre")?.value);
    formData.append("observacion", this.agendaHoraForm.get("observacion")?.value);
    formData.append("detalle", this.agendaHoraForm.get("detalle")?.value);
    formData.append("hora", this.agendaHoraForm.get("hora")?.value);
    formData.append("tecnico", this.agendaHoraForm.get("tecnico")?.value);
    formData.append("id_supervisor", this.agendaHoraForm.get("id_supervisor")?.value);
    formData.append("nombre_supervisor", this.agendaHoraForm.get("nombre_supervisor")?.value);
    formData.append("id_cliente", this.agendaHoraForm.get("id_cliente")?.value);
    formData.append("nombre_cliente", this.agendaHoraForm.get("nombre_cliente")?.value);
    formData.append("id_vehiculo", this.agendaHoraForm.get("id_vehiculo")?.value);
    formData.append("marca", this.agendaHoraForm.get("marca")?.value);
    formData.append("modelo", this.agendaHoraForm.get("modelo")?.value);
    formData.append("version", this.agendaHoraForm.get("version")?.value);

    if (this.agendaHoraForm.valid) {
      this.agendaService.updateAgenda(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            // this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.agendaHoraForm.getRawValue())
            this.saveResponse = err
          }
        })
    }
  }

  clearForm() {
    this.agendaHoraForm.setValue({
      id_hora_agenda: '',
      id_servicio: '',
      tipo_servicio: '',
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
  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
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
}
