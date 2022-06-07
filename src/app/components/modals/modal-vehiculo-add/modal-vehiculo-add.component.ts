import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from 'src/app/services/vehiculo.service';



@Component({
  selector: 'app-modal-vehiculo-add',
  templateUrl: './modal-vehiculo-add.component.html',
  styleUrls: ['./modal-vehiculo-add.component.scss'],

})
export class ModalVehiculoAddComponent implements OnInit {

  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit(): void {
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  vehiculoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
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


  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }
}
