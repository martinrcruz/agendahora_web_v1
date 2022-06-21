import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-modal-calendario-edit',
  templateUrl: './modal-calendario-edit.component.html',
  styleUrls: ['./modal-calendario-edit.component.scss']
})

export class ModalCalendarioEditComponent implements OnInit {

  public visible = false;

  constructor(private agendaService: AgendaService) { }

  @Output() editedCalendario = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

  calendarioForm = new FormGroup({
    id_hora_agenda: new FormControl({ disabled: true }),
    id_servicio: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    fecha_entrada: new FormControl('', Validators.required),
    fecha_salida: new FormControl('', Validators.required),
    id_usuario_tecnico: new FormControl('', Validators.required),
    id_cliente: new FormControl('', Validators.required),
    id_vehiculo: new FormControl('', Validators.required),
    id_usuario_cargo: new FormControl('', Validators.required),
  })




  ngOnInit(): void {
  }
  loadData(id_hora_agenda: Number) {
    console.log(id_hora_agenda);
    var formData: any = new FormData();
    formData.append("id_hora_agenda", id_hora_agenda);
    this.agendaService.getAgendaById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0].id_hora_agenda);
          this.calendarioForm.setValue({
            id_hora_agenda: this.editData.data[0].id_hora_agenda,
            id_servicio: this.editData.data[0].id_servicio,
            nombre: this.editData.data[0].nombre,
            descripcion: this.editData.data[0].descripcion,
            fecha_entrada: this.editData.data[0].fecha_entrada,
            fecha_salida: this.editData.data[0].fecha_salida,
            id_usuario_tecnico: this.editData.data[0].id_usuario_tecnico,
            id_cliente: this.editData.data[0].id_cliente,
            id_vehiculo: this.editData.data[0].id_vehiculo,
            id_usuario_cargo: this.editData.data[0].id_usuario_cargo,
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
    formData.append("nombre", this.calendarioForm.get("nombre")?.value);
    formData.append("descripcion", this.calendarioForm.get("descripcion")?.value);
    formData.append("fecha_entrada", this.calendarioForm.get("fecha_entrada")?.value);
    formData.append("fecha_salida", this.calendarioForm.get("fecha_salida")?.value);
    formData.append("id_usuario_tecnico", this.calendarioForm.get("id_usuario_tecnico")?.value);
    formData.append("id_cliente", this.calendarioForm.get("id_cliente")?.value);
    formData.append("id_vehiculo", this.calendarioForm.get("id_vehiculo")?.value);
    formData.append("id_usuario_cargo", this.calendarioForm.get("id_usuario_cargo")?.value);

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
      nombre: '',
      descripcion: '',
      fecha_entrada: '',
      fecha_salida: '',
      id_usuario_tecnico: '',
      id_cliente: '',
      id_vehiculo: '',
      id_usuario_cargo: '',
    })
  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

}