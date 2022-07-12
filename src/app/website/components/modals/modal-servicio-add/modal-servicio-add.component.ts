import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiciosService } from 'src/app/services/servicios.service';
import { TablaServicioComponent } from '../../tablas/tabla-servicio/tabla-servicio.component';



@Component({
  selector: 'app-modal-servicio-add',
  templateUrl: './modal-servicio-add.component.html',
  styleUrls: ['./modal-servicio-add.component.scss'],

})
export class ModalServicioAddComponent implements OnInit {

  constructor(private servicioService: ServiciosService) { }



  @Output() onSubmited = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  
  ngOnInit(): void {
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  servicioForm = new FormGroup({
    id_servicio: new FormControl({value: 'No aplica', disabled: true}),
    nombre: new FormControl('', Validators.required),
    observacion: new FormControl('', Validators.required),
    id_vehiculo: new FormControl('', Validators.required),
    id_tecnico: new FormControl('', Validators.required),
  })

  addServicio() {
    var formData: any = new FormData();
    formData.append("nombre", this.servicioForm.get("nombre")?.value);
    formData.append("observacion", this.servicioForm.get("observacion")?.value);
    formData.append("id_vehiculo", this.servicioForm.get("id_vehiculo")?.value);
    formData.append("id_tecnico", this.servicioForm.get("id_tecnico")?.value);

    if (this.servicioForm.valid) {
      this.servicioService.addServicio(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.servicioForm.getRawValue())
            this.saveResponse = err
          }
        })


    } else {
      this.errorMessage = 'Porfavor rellena todos los campos obligatorios.';
      this.errorClass = "errorMessage";
    }
  }


  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }
}
