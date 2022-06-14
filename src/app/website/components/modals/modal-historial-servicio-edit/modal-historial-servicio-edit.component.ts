import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HistorialAgendaService } from 'src/app/services/historial-agenda.service';
import { disposeEmitNodes } from 'typescript/lib/tsserverlibrary';
import { TablaHistorialServicioComponent } from '../../tablas/tabla-historial-servicio/tabla-historial-servicio.component';

@Component({
  selector: 'app-modal-historial-servicio-edit',
  templateUrl: './modal-historial-servicio-edit.component.html',
  styleUrls: ['./modal-historial-servicio-edit.component.scss']
})

export class ModalHistorialServicioEditComponent implements OnInit {

  public visible = false;

  constructor(private historialAgendaService: HistorialAgendaService, private tablahistorialServicio: TablaHistorialServicioComponent) { }

  @Output() editedhistorialServicio = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

 historialServicioForm = new FormGroup({
  id_historial_servicio: new FormControl({ disabled: true}),
  nombre: new FormControl('', Validators.required),
  descripcion: new FormControl('', Validators.required),
  fecha_entrada: new FormControl('', Validators.required),
  fecha_salida: new FormControl('', Validators.required),
  id_usuario_cargo: new FormControl('', Validators.required),
  id_cliente: new FormControl('', Validators.required),
  id_usuario_tecnico: new FormControl('', Validators.required),
  })


  ngOnInit(): void {
  }

  loadData(id_historial_servicio: any) {
    var formData: any = new FormData();
    formData.append("id_historial_servicio", id_historial_servicio);
    this.historialAgendaService.getHistorialAgendaById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0].nombre);
          this.historialServicioForm.setValue({
            id_historial_servicio: this.editData.data[0].id_historial_servicio,
            nombre: this.editData.data[0].nombre,
            descripcion: this.editData.data[0].marca,
            fecha_entrada: this.editData.data[0].modelo,
            fecha_salida: this.editData.data[0].version,
            id_usuario_cargo: this.editData.data[0].patente,
            id_cliente: this.editData.data[0].id_cliente,
            id_usuario_tecnico: this.editData.data[0].color,
          })
          this.openModal()

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateHistorialServicio() {
    var formData: any = new FormData();
    formData.append("id_historial_servicio", this.historialServicioForm.get("id_historial_servicio")?.value);
    formData.append("nombre", this.historialServicioForm.get("nombre")?.value);
    formData.append("descripcion", this.historialServicioForm.get("descripcion")?.value);
    formData.append("fecha_entrada", this.historialServicioForm.get("fecha_entrada")?.value);
    formData.append("fecha_salida", this.historialServicioForm.get("fecha_salida")?.value);
    formData.append("id_usuario_cargo", this.historialServicioForm.get("id_usuario_cargo")?.value);
    formData.append("id_cliente", this.historialServicioForm.get("id_cliente")?.value);
    formData.append("id_usuario_tecnico", this.historialServicioForm.get("id_usuario_tecnico")?.value);


    if (this.historialServicioForm.valid) {
      this.historialAgendaService.updateHistorialAgenda(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.historialServicioForm.getRawValue())
            this.saveResponse = err
          }
        })
    }
  }

  clearForm() {
    this.historialServicioForm.setValue({
      nombre: '',
      descripcion: '',
      fecha_entrada: '',
      fecha_salida: '',
      id_usuario_cargo: '',
      id_cliente: '',
      id_usuario_tecnico: '',

    })
  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

}