import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SolicitudClienteService } from 'src/app/services/solicitud-cliente.service';
import { disposeEmitNodes } from 'typescript/lib/tsserverlibrary';
import { TablaSolicitudClienteComponent } from '../../tablas/tabla-solicitud-cliente/tabla-solicitud-cliente.component';

@Component({
  selector: 'app-modal-solicitud-cliente-edit',
  templateUrl: './modal-solicitud-cliente-edit.component.html',
  styleUrls: ['./modal-solicitud-cliente-edit.component.scss']
})

export class ModalSolicitudClienteEditComponent implements OnInit {

  public visible = false;

  constructor(private solicitudClienteService: SolicitudClienteService, private tablaSolicitudCliente: TablaSolicitudClienteComponent) { }

  @Output() editedSolicitudCliente = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

  solicitudClienteForm = new FormGroup({
    id_solicitud_cliente: new FormControl({ disabled: true }),
    correo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellidop: new FormControl('', Validators.required),
    apellidom: new FormControl('', Validators.required),
    rut: new FormControl('', Validators.required),
    numero_contacto: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    sucursal: new FormControl('', Validators.required),
    nombre_usuario: new FormControl('', Validators.required),
    id_usuario_gestor: new FormControl('', Validators.required),
  })


  ngOnInit(): void {
  }

  loadData(id_solicitud_cliente: any) {
    var formData: any = new FormData();
    formData.append("id_solicitud_registro", id_solicitud_cliente);
    this.solicitudClienteService.getSolicitudClienteById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
           console.log(this.editData.data[0].nombre);
           this.solicitudClienteForm.setValue({
            id_solicitud_cliente: this.editData.data[0].id_solicitud_registro,
            correo: this.editData.data[0].correo,
            nombre: this.editData.data[0].nombre,
            apellidop: this.editData.data[0].apellidop,
            apellidom: this.editData.data[0].apellidom,
            rut: this.editData.data[0].rut,
            numero_contacto: this.editData.data[0].numero_contacto,
            direccion: this.editData.data[0].direccion,
            sucursal: this.editData.data[0].sucursal,
            nombre_usuario: this.editData.data[0].nombre_usuario,
            id_usuario_gestor: this.editData.data[0].id_usuario_gestor,
          })
          this.openModal()

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateSolicitudCliente() {
    var formData: any = new FormData();
    formData.append("id_solicitud_registro", this.solicitudClienteForm.get("id_solicitud_cliente")?.value);
    formData.append("correo", this.solicitudClienteForm.get("correo")?.value);
    formData.append("nombre", this.solicitudClienteForm.get("nombre")?.value);
    formData.append("apellidop", this.solicitudClienteForm.get("apellidop")?.value);
    formData.append("apellidom", this.solicitudClienteForm.get("apellidom")?.value);
    formData.append("rut", this.solicitudClienteForm.get("rut")?.value);
    formData.append("numero_contacto", this.solicitudClienteForm.get("numero_contacto")?.value);
    formData.append("direccion", this.solicitudClienteForm.get("direccion")?.value);
    formData.append("sucursal", this.solicitudClienteForm.get("sucursal")?.value);
    formData.append("nombre_usuario", this.solicitudClienteForm.get("nombre_usuario")?.value);
    formData.append("id_usuario_gestor", this.solicitudClienteForm.get("id_usuario_gestor")?.value);

    if (this.solicitudClienteForm.valid) {
      this.solicitudClienteService.updateSolicitudCliente(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.solicitudClienteForm.getRawValue())
            this.saveResponse = err
          }
        })
    }
  }

  clearForm() {
    this.solicitudClienteForm.setValue({
      correo: '',
      nombre: '',
      apellidop: '',
      apellidom: '',
      rut: '',
      numero_contacto: '',
      direccion: '',
      sucursal: '',
      nombre_usuario: '',
      id_usuario_gestor: '',
    })
  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

}
