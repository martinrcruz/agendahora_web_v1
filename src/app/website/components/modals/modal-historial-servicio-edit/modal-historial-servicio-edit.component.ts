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
  detalles: new FormControl('', Validators.required),
  id_vehiculo: new FormControl('', Validators.required),
  fecha_entrada: new FormControl('', Validators.required),
  fecha_salida: new FormControl('', Validators.required),
  id_supervisor: new FormControl('', Validators.required),
  id_cliente: new FormControl('', Validators.required),
  id_tecnico: new FormControl('', Validators.required),
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
            descripcion: this.editData.data[0].descripcion,
            detalles: this.editData.data[0].detalles,
            fecha_entrada: this.editData.data[0].fecha_entrada,
            fecha_salida: this.editData.data[0].fecha_salida,
            id_vehiculo: this.editData.data[0].id_vehiculo,
            id_supervisor: this.editData.data[0].id_supervisor,
            id_cliente: this.editData.data[0].id_cliente,
            id_tecnico: this.editData.data[0].id_tecnico,
          })
          this.openModal()

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }



  clearForm() {
    this.historialServicioForm.setValue({
      nombre: '',
      descripcion: '',
      detalles: '',
      fecha_entrada: '',
      fecha_salida: '',
      id_vehiculo: '',
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