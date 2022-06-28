import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { disposeEmitNodes } from 'typescript/lib/tsserverlibrary';
import { TablaClienteComponent } from '../../tablas/tabla-cliente/tabla-cliente.component';

@Component({
  selector: 'app-modal-cliente-edit',
  templateUrl: './modal-cliente-edit.component.html',
  styleUrls: ['./modal-cliente-edit.component.scss']
})

export class ModalClienteEditComponent implements OnInit {

  public visible = false;

  constructor(private usuarioService: UsuariosService, private tablaCliente: TablaClienteComponent) { }

  @Output() editedCliente = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

  clienteForm = new FormGroup({
    id: new FormControl({disabled: true }),
    email: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),

  })


  ngOnInit(): void {
  }

  loadData(id: any) {
    var formData: any = new FormData();
    formData.append("id", id);
    this.usuarioService.getClienteById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          this.clienteForm.setValue({
            id: this.editData.data[0].id,
            email: this.editData.data[0].email,
            first_name: this.editData.data[0].first_name,
            last_name: this.editData.data[0].last_name,
            username: this.editData.data[0].username,
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
    formData.append("id", this.clienteForm.get("id")?.value);
    formData.append("email", this.clienteForm.get("email")?.value);
    formData.append("first_name", this.clienteForm.get("first_name")?.value);
    formData.append("last_name", this.clienteForm.get("last_name")?.value);
    formData.append("username", this.clienteForm.get("username")?.value);

    if (this.clienteForm.valid) {
      this.usuarioService.addUsuario(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
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

  clearForm() {
    this.clienteForm.setValue({
      id: '',
      email: '',
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      password_confirm: ''
    })
  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

}
