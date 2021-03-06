import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TablaClienteComponent } from '../../tablas/tabla-cliente/tabla-cliente.component';



@Component({
  selector: 'app-modal-cliente-add',
  templateUrl: './modal-cliente-add.component.html',
  styleUrls: ['./modal-cliente-add.component.scss'],

})
export class ModalClienteAddComponent implements OnInit {

  constructor(private usuarioService: UsuariosService) { }


  @Output() onSubmited = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  
  ngOnInit(): void {
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  clienteForm = new FormGroup({
    id: new FormControl({value: 'No aplica', disabled: true}),
    email: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password_confirm: new FormControl('', Validators.required),
  })

  addCliente() {
    var formData: any = new FormData();
    formData.append("id", this.clienteForm.get("id")?.value);
    formData.append("email", this.clienteForm.get("email")?.value);
    formData.append("first_name", this.clienteForm.get("first_name")?.value);
    formData.append("last_name", this.clienteForm.get("last_name")?.value);
    formData.append("username", this.clienteForm.get("username")?.value);
    formData.append("password", this.clienteForm.get("password")?.value);
    formData.append("password_confirm", this.clienteForm.get("password_confirm")?.value);
    formData.append("grupo", 2);

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


  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }
}
