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

  @Output() refreshTable = new EventEmitter<string>();


  servicioCheckForm = new FormGroup({
    id_servicio: new FormControl({value: 'No aplica', disabled: true}),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    id_vehiculo: new FormControl('', Validators.required),
    id_tecnico: new FormControl('', Validators.required),
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
            descripcion: this.editData.data[0].descripcion,
            id_vehiculo: this.editData.data[0].id_vehiculo,
            id_tecnico: this.editData.data[0].id_tecnico
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
    formData.append("nombre", this.servicioCheckForm.get("nombre")?.value);
    formData.append("descripcion", this.servicioCheckForm.get("descripcion")?.value);
    formData.append("id_vehiculo", this.servicioCheckForm.get("id_vehiculo")?.value);
    formData.append("id_tecnico", this.servicioCheckForm.get("id_tecnico")?.value);


    if (this.servicioCheckForm.valid) {
      this.serviciosService.updateServicio(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
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
      descripcion: '',
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
