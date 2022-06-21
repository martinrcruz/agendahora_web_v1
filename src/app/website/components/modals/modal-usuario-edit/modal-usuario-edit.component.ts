import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TablaUsuariosComponent } from '../../tablas/tabla-usuarios/tabla-usuarios.component';

@Component({
  selector: 'app-modal-usuario-edit',
  templateUrl: './modal-usuario-edit.component.html',
  styleUrls: ['./modal-usuario-edit.component.scss']
})
export class ModalUsuarioEditComponent implements OnInit {

  public visible = false;

  constructor(private usuarioService: UsuariosService, private tablaUsuario: TablaUsuariosComponent) { }

  @Output() editedUsuario = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

  usuarioForm = new FormGroup({
    id: new FormControl({ disabled: true }),
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
    
    this.usuarioService.getUsuarioById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          this.usuarioForm.setValue({
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


  updateUsuario() {
    var formData: any = new FormData();
    formData.append("id", this.usuarioForm.get("id")?.value);
    formData.append("email", this.usuarioForm.get("email")?.value);
    formData.append("first_name", this.usuarioForm.get("first_name")?.value);
    formData.append("last_name", this.usuarioForm.get("last_name")?.value);
    formData.append("username", this.usuarioForm.get("username")?.value);



    if (this.usuarioForm.valid) {
      this.usuarioService.updateUsuario(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()

          },
          error: (err) => {
            console.log(this.usuarioForm.getRawValue())
            this.saveResponse = err
          }
        })


    }
    this.refreshTable.emit();
  }

  clearForm() {
    this.usuarioForm.setValue({
      id: '',
      email: '',
      first_name: '',
      last_name: '',
      username: ''
   

    })
  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

}
