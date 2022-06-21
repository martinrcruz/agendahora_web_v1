import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-modal-usuario-add',
  templateUrl: './modal-usuario-add.component.html',
  styleUrls: ['./modal-usuario-add.component.scss']
})
export class ModalUsuarioAddComponent implements OnInit {

  constructor(private usuarioService: UsuariosService) { }



  @Output() refreshTable = new EventEmitter<string>();

  
  ngOnInit(): void {
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  usuarioForm = new FormGroup({
    id: new FormControl({value: 'No aplica', disabled: true}),
    email: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password_confirm: new FormControl('', Validators.required),

  })

  addUsuario() {
    var formData: any = new FormData();
    formData.append("id", this.usuarioForm.get("id")?.value);
    formData.append("email", this.usuarioForm.get("email")?.value);
    formData.append("first_name", this.usuarioForm.get("first_name")?.value);
    formData.append("last_name", this.usuarioForm.get("last_name")?.value);
    formData.append("username", this.usuarioForm.get("username")?.value);
    formData.append("password", this.usuarioForm.get("password")?.value);
    formData.append("password_confirm", this.usuarioForm.get("password_confirm")?.value);
    formData.append("grupo", 1);

    if (this.usuarioForm.valid) {
      this.usuarioService.addUsuario(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.usuarioForm.getRawValue())
            this.saveResponse = err
          }
        })


    } else {
      this.errorMessage = 'Porfavor rellena todos los campos obligatorios.';
      this.errorClass = "errorMessage";
    }
  }
  
  clearForm() {
    this.usuarioForm.setValue({
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
