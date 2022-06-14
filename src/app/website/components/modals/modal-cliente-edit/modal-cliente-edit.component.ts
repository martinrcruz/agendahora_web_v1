import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { disposeEmitNodes } from 'typescript/lib/tsserverlibrary';
import { TablaClienteComponent } from '../../tablas/tabla-cliente/tabla-cliente.component';

@Component({
  selector: 'app-modal-cliente-edit',
  templateUrl: './modal-cliente-edit.component.html',
  styleUrls: ['./modal-cliente-edit.component.scss']
})

export class ModalClienteEditComponent implements OnInit {

  public visible = false;

  constructor(private clienteService: ClienteService, private tablaCliente: TablaClienteComponent) { }

  @Output() editedCliente = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

  clienteForm = new FormGroup({
    id_cliente: new FormControl({ disabled: true }),
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


  ngOnInit(): void {
  }

  loadData(id_cliente: any) {
    var formData: any = new FormData();
    formData.append("id_cliente", id_cliente);
    this.clienteService.getClienteById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0].nombre);
          this.clienteForm.setValue({
            id_cliente: this.editData.data[0].id_cliente,
            correo: this.editData.data[0].correo,
            nombre: this.editData.data[0].nombre,
            apellidop: this.editData.data[0].apellidop,
            apellidom: this.editData.data[0].apellidom,
            rut: this.editData.data[0].rut,
            numero_contacto: this.editData.data[0].numero_contacto,
            direccion: this.editData.data[0].direccion,
            sucursal: this.editData.data[0].sucursal,
            nombre_usuario: this.editData.data[0].nombre_usuario,
          })
          this.openModal()

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateCliente() {
    var formData: any = new FormData();
    formData.append("id_cliente", this.clienteForm.get("id_cliente")?.value);
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
      this.clienteService.updateCliente(formData)
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
    }
  }

  clearForm() {
    this.clienteForm.setValue({
      correo: '',
      nombre: '',
      apellidop: '',
      apellidom: '',
      rut: '',
      numero_contacto: '',
      direccion: '',
      sucursal: '',
      nombre_usuario: '',
    })
  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

}
