import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { disposeEmitNodes } from 'typescript/lib/tsserverlibrary';
import { TablaVehiculoComponent } from '../../tablas/tabla-vehiculo/tabla-vehiculo.component';

@Component({
  selector: 'app-modal-vehiculo-edit',
  templateUrl: './modal-vehiculo-edit.component.html',
  styleUrls: ['./modal-vehiculo-edit.component.scss']
})

export class ModalVehiculoEditComponent implements OnInit {

  public visible = false;

  constructor(private vehiculoService: VehiculoService, private tablaVehiculo: TablaVehiculoComponent) { }

  @Output() editedVehiculo = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

  vehiculoForm = new FormGroup({
    id_vehiculo: new FormControl({ disabled: true }),
    nombre: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
    patente: new FormControl('', Validators.required),
    id_cliente: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
  })


  ngOnInit(): void {
  }

  loadData(id_vehiculo: any) {
    var formData: any = new FormData();
    formData.append("id_vehiculo", id_vehiculo);
    
    this.vehiculoService.getVehiculoById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0].nombre);
          this.vehiculoForm.setValue({
            id_vehiculo: this.editData.data[0].id_vehiculo,
            nombre: this.editData.data[0].nombre,
            marca: this.editData.data[0].marca,
            modelo: this.editData.data[0].modelo,
            version: this.editData.data[0].version,
            patente: this.editData.data[0].patente,
            id_cliente: this.editData.data[0].id_cliente,
            color: this.editData.data[0].color,
          })
          this.openModal()

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateVehiculo() {
    var formData: any = new FormData();
    formData.append("id_vehiculo", this.vehiculoForm.get("id_vehiculo")?.value);
    formData.append("nombre", this.vehiculoForm.get("nombre")?.value);
    formData.append("marca", this.vehiculoForm.get("marca")?.value);
    formData.append("modelo", this.vehiculoForm.get("modelo")?.value);
    formData.append("version", this.vehiculoForm.get("version")?.value);
    formData.append("patente", this.vehiculoForm.get("patente")?.value);
    formData.append("id_cliente", this.vehiculoForm.get("id_cliente")?.value);
    formData.append("color", this.vehiculoForm.get("color")?.value);


    if (this.vehiculoForm.valid) {
      this.vehiculoService.updateVehiculo(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()

          },
          error: (err) => {
            console.log(this.vehiculoForm.getRawValue())
            this.saveResponse = err
          }
        })


    }
    this.refreshTable.emit();
  }

  clearForm() {
    this.vehiculoForm.setValue({
      nombre: '',
      marca: '',
      modelo: '',
      version: '',
      patente: '',
      id_cliente: '',
      color: '',

    })
  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

}
