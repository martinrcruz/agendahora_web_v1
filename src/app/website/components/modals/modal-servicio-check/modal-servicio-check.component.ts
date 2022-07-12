import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-modal-servicio-check',
  templateUrl: './modal-servicio-check.component.html',
  styleUrls: ['./modal-servicio-check.component.scss']
})
export class ModalServicioCheckComponent implements OnInit {

  constructor(private serviciosService: ServiciosService) { }

  ngOnInit(): void {
  }

  public visible = false;
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

  @Output() onRefreshTable = new EventEmitter<string>();


  servicioCheckForm = new FormGroup({
    id_servicio: new FormControl({ value: 'no aplica', disabled: true }),
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
    estado_servicio: new FormControl()
  })

  loadData(id_servicio: any) {
    var formData: any = new FormData();
    formData.append("id_servicio", id_servicio);
    this.serviciosService.getServicioById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          this.servicioCheckForm.setValue({
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
            estado_servicio: this.editData.data[0].estado_servicio
          })
          this.openModal()

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  checkServicio() {
    var formData: any = new FormData();
    formData.append("id_servicio", this.servicioCheckForm.get("id_servicio")?.value);
    formData.append("estado_servicio", this.servicioCheckForm.get("estado_servicio")?.value);


    if (this.servicioCheckForm.valid) {
      this.serviciosService.updateServicioState(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.onRefreshTable.emit();
          },
          error: (err) => {
            console.log(this.servicioCheckForm.getRawValue())
            this.saveResponse = err
          }
        })


    } else {
      this.errorMessage = 'Porfavor rellena todos los campos obligatorios.';
      this.errorClass = "errorMessage";
    }
  }
  clearForm() {
    this.servicioCheckForm.setValue({
      id_servicio: '',
      nombre: '',
      observacion: '',
      id_vehiculo: '',
      id_tecnico: '',
    })
  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

}
