import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { TablaClienteComponent } from '../../tablas/tabla-cliente/tabla-cliente.component';



@Component({
  selector: 'app-modal-cliente-add',
  templateUrl: './modal-cliente-add.component.html',
  styleUrls: ['./modal-cliente-add.component.scss'],

})
export class ModalClienteAddComponent implements OnInit {

  constructor(private clienteService: ClienteService) { }


  @Output() onSubmited = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  
  ngOnInit(): void {
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  clienteForm = new FormGroup({
    id_cliente: new FormControl({value: 'No aplica', disabled: true}),
    correo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellidop: new FormControl('', Validators.required),
    apellidom: new FormControl('', Validators.required),
    rut: new FormControl('', Validators.required),
    numero_contacto: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    sucursal: new FormControl('', Validators.required),
    nombre_usuario: new FormControl('', Validators.required),
  })

  addCliente() {
    var formData: any = new FormData();
    formData.append("correo", this.clienteForm.get("correo")?.value);
    formData.append("nombre", this.clienteForm.get("nombre")?.value);
    formData.append("apellidop", this.clienteForm.get("apellidop")?.value);
    formData.append("apellidom", this.clienteForm.get("apellidom")?.value);
    formData.append("rut", this.clienteForm.get("rut")?.value);
    formData.append("numero_contacto", this.clienteForm.get("numero_contacto")?.value);
    formData.append("direccion", this.clienteForm.get("direccion")?.value);
    formData.append("sucursal", this.clienteForm.get("sucursal")?.value);
    formData.append("nombre_usuario", this.clienteForm.get("nombre_usuario")?.value);

    if (this.clienteForm.valid) {
      this.clienteService.addCliente(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.clienteForm.getRawValue())
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
