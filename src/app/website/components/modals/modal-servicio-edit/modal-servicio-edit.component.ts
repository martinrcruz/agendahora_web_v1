import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from 'src/app/services/servicios.service';
import { disposeEmitNodes } from 'typescript/lib/tsserverlibrary';
import { TablaServicioComponent } from '../../tablas/tabla-servicio/tabla-servicio.component';

@Component({
  selector: 'app-modal-servicio-edit',
  templateUrl: './modal-servicio-edit.component.html',
  styleUrls: ['./modal-servicio-edit.component.scss']
})

export class ModalServicioEditComponent implements OnInit {

  public visible = false;

  constructor(private servicioService: ServiciosService, private tablaservicio: TablaServicioComponent) { }

  @Output() editedservicio = new EventEmitter<string>();
  @Output() onRefreshTable = new EventEmitter<string>();

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

 servicioForm = new FormGroup({
    id_servicio: new FormControl({ disabled: true }),
    nombre: new FormControl('', Validators.required),
    observacion: new FormControl('', Validators.required),
    detalles: new FormControl('', Validators.required),
    nombre_cliente: new FormControl('', Validators.required),
    id_cliente: new FormControl('', Validators.required),
    id_vehiculo: new FormControl('', Validators.required),
    nombre_tecnico: new FormControl('', Validators.required),
    id_tecnico: new FormControl('', Validators.required),
    fecha_entrada: new FormControl('', Validators.required),
    fecha_salida: new FormControl('', Validators.required),
    fecha_agenda: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),

  })


  ngOnInit(): void {
  }

  loadData(id_servicio: any) {
    var formData: any = new FormData();
    formData.append("id_servicio", id_servicio);
    this.servicioService.getServicioById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          this.servicioForm.setValue({
            id_servicio: this.editData.data[0].id_servicio,
            nombre: this.editData.data[0].nombre,
            observacion: this.editData.data[0].observacion,
            detalles: this.editData.data[0].detalle,
            id_vehiculo: this.editData.data[0].id_vehiculo,
            id_tecnico: this.editData.data[0].id_tecnico,
            nombre_tecnico: this.editData.data[0].nombre_tecnico,
            id_cliente: this.editData.data[0].id_cliente,
            nombre_cliente: this.editData.data[0].nombre_cliente,
            fecha_entrada: this.editData.data[0].fecha_entrada,
            fecha_salida: this.editData.data[0].fecha_salida,
            fecha_agenda: this.editData.data[0].fecha_agenda,
            marca: this.editData.data[0].marca,
            modelo: this.editData.data[0].modelo,
            version: this.editData.data[0].version,


          })
          this.openModal()

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateServicio() {
    var formData: any = new FormData();
    formData.append("id_servicio", this.servicioForm.get("id_servicio")?.value);
    formData.append("nombre", this.servicioForm.get("nombre")?.value);
    formData.append("observacion", this.servicioForm.get("observacion")?.value);
    formData.append("id_vehiculo", this.servicioForm.get("id_vehiculo")?.value);
    formData.append("id_tecnico", this.servicioForm.get("id_tecnico")?.value);






    if (this.servicioForm.valid) {
      this.servicioService.updateServicio(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.onRefreshTable.emit();
          },
          error: (err) => {
            console.log(this.servicioForm.getRawValue())
            this.saveResponse = err
          }
        })
    }
  }

  clearForm() {
    this.servicioForm.setValue({
      nombre: '',
      observacion: '',
      id_tecnico: '',
      id_vehiculo: '',

    })
  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

}