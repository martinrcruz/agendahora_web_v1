import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SolicitudClienteService } from 'src/app/services/solicitud-cliente.service';
import { TablaSolicitudClienteComponent } from '../../tablas/tabla-solicitud-cliente/tabla-solicitud-cliente.component';



@Component({
  selector: 'app-modal-solicitud-cliente-add',
  templateUrl: './modal-solicitud-cliente-add.component.html',
  styleUrls: ['./modal-solicitud-cliente-add.component.scss'],

})
export class ModalSolicitudClienteAddComponent implements OnInit {

  constructor(private solicitudClienteService: SolicitudClienteService) { }


  @Output() onSubmited = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  
  ngOnInit(): void {
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  solicitudClienteForm = new FormGroup({
    id_solicitud_cliente: new FormControl({value: 'No aplica', disabled: true}),
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

  addSolicitudCliente() {
    var formData: any = new FormData();
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
      this.solicitudClienteService.addSolicitudCliente(formData)
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
