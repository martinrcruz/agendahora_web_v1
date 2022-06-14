import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SolicitudVehiculoService } from 'src/app/services/solicitud-vehiculo.service';
import { TablaSolicitudVehiculoComponent } from '../../tablas/tabla-solicitud-vehiculo/tabla-solicitud-vehiculo.component';



@Component({
  selector: 'app-modal-solicitud-vehiculo-add',
  templateUrl: './modal-solicitud-vehiculo-add.component.html',
  styleUrls: ['./modal-solicitud-vehiculo-add.component.scss'],

})
export class ModalSolicitudVehiculoAddComponent implements OnInit {

  constructor(private solicitudVehiculoService: SolicitudVehiculoService) { }



  @Output() onSubmited = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  
  ngOnInit(): void {
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  solicitudVehiculoForm = new FormGroup({
    id_solicitud_vehiculo: new FormControl({value: 'No aplica', disabled: true}),
    id_marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    ano: new FormControl('', Validators.required),
    patente: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
    ano_compra: new FormControl('', Validators.required),
    sucursal_compra: new FormControl('', Validators.required),
    nro_chasis: new FormControl('', Validators.required),
    nro_motor: new FormControl('', Validators.required),
    img_1: new FormControl('', Validators.required),
    img_2: new FormControl('', Validators.required),
    img_3: new FormControl('', Validators.required),
    id_usuario_gestor: new FormControl('', Validators.required),
    id_cliente: new FormControl('', Validators.required),
  })

  addSolicitudVehiculo() {
    var formData: any = new FormData();
    formData.append("id_marca", this.solicitudVehiculoForm.get("id_marca")?.value);
    formData.append("modelo", this.solicitudVehiculoForm.get("modelo")?.value);
    formData.append("ano", this.solicitudVehiculoForm.get("ano")?.value);
    formData.append("patente", this.solicitudVehiculoForm.get("patente")?.value);
    formData.append("version", this.solicitudVehiculoForm.get("version")?.value);
    formData.append("ano_compra", this.solicitudVehiculoForm.get("ano_compra")?.value);
    formData.append("sucursal_compra", this.solicitudVehiculoForm.get("sucursal_compra")?.value);
    formData.append("nro_chasis", this.solicitudVehiculoForm.get("nro_chasis")?.value);
    formData.append("nro_motor", this.solicitudVehiculoForm.get("nro_motor")?.value);
    formData.append("img_1", this.solicitudVehiculoForm.get("img_1")?.value);
    formData.append("img_2", this.solicitudVehiculoForm.get("img_2")?.value);
    formData.append("img_3", this.solicitudVehiculoForm.get("img_3")?.value);
    formData.append("id_usuario_gestor", this.solicitudVehiculoForm.get("id_usuario_gestor")?.value);
    formData.append("id_cliente", this.solicitudVehiculoForm.get("id_cliente")?.value);


    if (this.solicitudVehiculoForm.valid) {
      this.solicitudVehiculoService.addSolicitudVehiculo(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.solicitudVehiculoForm.getRawValue())
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