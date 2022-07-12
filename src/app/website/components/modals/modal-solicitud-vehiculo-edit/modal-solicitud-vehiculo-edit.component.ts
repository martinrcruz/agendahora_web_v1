import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SolicitudVehiculoService } from 'src/app/services/solicitud-vehiculo.service';
import { disposeEmitNodes } from 'typescript/lib/tsserverlibrary';
import { TablaSolicitudVehiculoComponent } from '../../tablas/tabla-solicitud-vehiculo/tabla-solicitud-vehiculo.component';

@Component({
  selector: 'app-modal-solicitud-vehiculo-edit',
  templateUrl: './modal-solicitud-vehiculo-edit.component.html',
  styleUrls: ['./modal-solicitud-vehiculo-edit.component.scss']
})

export class ModalSolicitudVehiculoEditComponent implements OnInit {

  public visible = false;

  constructor(private solicitudVehiculoService: SolicitudVehiculoService, private tablaVehiculo: TablaSolicitudVehiculoComponent) { }

  @Output() editedSolicitudVehiculo = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

  solicitudVehiculoForm = new FormGroup({
    id_solicitud_vehiculo: new FormControl({ disabled: true}),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    ano: new FormControl('', Validators.required),
    patente: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
    ano_compra: new FormControl('', Validators.required),
    // sucursal_compra: new FormControl('', Validators.required),
    nro_chasis: new FormControl('', Validators.required),
    nro_motor: new FormControl('', Validators.required),
    img_1: new FormControl('', Validators.required),
    img_2: new FormControl('', Validators.required),
    img_3: new FormControl('', Validators.required),
    id_usuario_gestor: new FormControl('', Validators.required),
    id_cliente: new FormControl('', Validators.required),
  })


  ngOnInit(): void {
  }

  loadData(id_solicitud_vehiculo: any) {

    this.solicitudVehiculoService.getSolicitudVehiculoById(id_solicitud_vehiculo)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0].nombre);
          this.solicitudVehiculoForm.setValue({
            id_solicitud_vehiculo: this.editData.data[0].id_solicitud_vehiculo,
            marca: this.editData.data[0].marca,
            modelo: this.editData.data[0].modelo,
            ano: this.editData.data[0].ano,
            patente: this.editData.data[0].patente,
            version: this.editData.data[0].version,
            ano_compra: this.editData.data[0].ano_compra,
            // sucursal_compra: this.editData.data[0].sucursal_compra,
            nro_chasis: this.editData.data[0].nro_chasis,
            nro_motor: this.editData.data[0].nro_motor,
            img_1: this.editData.data[0].img_1,
            img_2: this.editData.data[0].img_2,
            img_3: this.editData.data[0].img_3,
            id_usuario_gestor: this.editData.data[0].id_usuario_gestor,
            id_cliente: this.editData.data[0].id_cliente,
          })
          this.openModal()

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateSolicitudVehiculo() {
    var formData: any = new FormData();
    formData.append("id_solicitud_vehiculo", this.solicitudVehiculoForm.get("id_solicitud_vehiculo")?.value);
    formData.append("marca", this.solicitudVehiculoForm.get("marca")?.value);
    formData.append("modelo", this.solicitudVehiculoForm.get("modelo")?.value);
    formData.append("ano", this.solicitudVehiculoForm.get("ano")?.value);
    formData.append("patente", this.solicitudVehiculoForm.get("patente")?.value);
    formData.append("version", this.solicitudVehiculoForm.get("version")?.value);
    formData.append("ano_compra", this.solicitudVehiculoForm.get("ano_compra")?.value);
    // formData.append("sucursal_compra", this.solicitudVehiculoForm.get("sucursal_compra")?.value);
    formData.append("nro_chasis", this.solicitudVehiculoForm.get("nro_chasis")?.value);
    formData.append("nro_motor", this.solicitudVehiculoForm.get("nro_motor")?.value);
    formData.append("img_1", this.solicitudVehiculoForm.get("img_1")?.value);
    formData.append("img_2", this.solicitudVehiculoForm.get("img_2")?.value);
    formData.append("img_3", this.solicitudVehiculoForm.get("img_3")?.value);
    formData.append("id_usuario_gestor", this.solicitudVehiculoForm.get("id_usuario_gestor")?.value);
    formData.append("id_cliente", this.solicitudVehiculoForm.get("id_cliente")?.value);


    if (this.solicitudVehiculoForm.valid) {
      this.solicitudVehiculoService.updateSolicitudVehiculo(formData)
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
    }
  }

  clearForm() {
    this.solicitudVehiculoForm.setValue({
      marca: '',
      modelo: '',
      ano: '',
      patente: '',
      version: '',
      ano_compra: '',
      // sucursal_compra: '',
      nro_chasis: '',
      nro_motor: '',
      img_1: '',
      img_2: '',
      img_3: '',
      id_usuario_gestor: '',
      id_cliente: '',
    })
  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

}
