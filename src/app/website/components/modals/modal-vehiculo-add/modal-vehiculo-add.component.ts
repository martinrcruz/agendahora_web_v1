import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from 'src/app/services/vehiculo.service';



@Component({
  selector: 'app-modal-vehiculo-add',
  templateUrl: './modal-vehiculo-add.component.html',
  styleUrls: ['./modal-vehiculo-add.component.scss'],

})
export class ModalVehiculoAddComponent implements OnInit {

  constructor(private vehiculoService: VehiculoService) { }



  @Output() refreshTable = new EventEmitter<string>();


  ngOnInit(): void {
    this.getSelectorMarca();
  }

  public visible = false;
  selectorMarcaData: any
  selectorModeloData: any
  selectorVersionData: any
  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  vehiculoForm = new FormGroup({
    id_vehiculo: new FormControl({ value: 'No aplica', disabled: true }),
    nombre: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    version: new FormControl(),
    patente: new FormControl('', Validators.required),
    id_cliente: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
  })

  addVehiculo() {
    var formData: any = new FormData();
    formData.append("nombre", this.vehiculoForm.get("nombre")?.value);
    formData.append("marca", this.vehiculoForm.get("marca")?.value);
    formData.append("modelo", this.vehiculoForm.get("modelo")?.value);
    formData.append("version", this.vehiculoForm.get("version")?.value);
    formData.append("patente", this.vehiculoForm.get("patente")?.value);
    formData.append("id_cliente", this.vehiculoForm.get("id_cliente")?.value);
    formData.append("color", this.vehiculoForm.get("color")?.value);

    if (this.vehiculoForm.valid) {
      this.vehiculoService.addVehiculo(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.vehiculoForm.getRawValue())
            this.saveResponse = err
          }
        })


    } else {
      this.errorMessage = 'Porfavor rellena todos los campos obligatorios.';
      this.errorClass = "errorMessage";
    }
  }


  getSelectorMarca() {
    this.vehiculoService.getMarcasVehiculo()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const selectorMarcaData = (newData[1][1])
          console.log(selectorMarcaData)
          this.selectorMarcaData = selectorMarcaData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  changeMarca(event: any) {
    this.getSelectorModelo(event.target.value);
  }

  getSelectorModelo(id: any) {

    this.vehiculoService.getModelosVehiculo(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          var newData = Object.entries(res)
          const selectorModeloData = (newData[1][1])
          console.log(selectorModeloData)
          this.selectorModeloData = selectorModeloData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  changeVersion(event: any) {
    this.getSelectorVersion(event.target.value);
  }

  getSelectorVersion(id: any) {

    this.vehiculoService.getVersionVehiculo(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          var newData = Object.entries(res)
          const selectorVersionData = (newData[1][1])
          console.log(selectorVersionData)
          this.selectorVersionData = selectorVersionData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }



  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }
}
