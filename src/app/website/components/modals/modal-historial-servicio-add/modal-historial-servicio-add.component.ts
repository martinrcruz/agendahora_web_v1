import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HistorialAgendaService } from 'src/app/services/historial-agenda.service';
import { TablaHistorialServicioComponent } from '../../tablas/tabla-historial-servicio/tabla-historial-servicio.component';



@Component({
  selector: 'app-modal-historial-servicio-add',
  templateUrl: './modal-historial-servicio-add.component.html',
  styleUrls: ['./modal-historial-servicio-add.component.scss'],

})
export class ModalHistorialServicioAddComponent implements OnInit {

  constructor(private historialAgendaService: HistorialAgendaService) { }



  @Output() onSubmited = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  
  ngOnInit(): void {
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  historialServicioForm = new FormGroup({
    id_historial_servicio: new FormControl({value: 'No aplica', disabled: true}),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    fecha_entrada: new FormControl('', Validators.required),
    fecha_salida: new FormControl('', Validators.required),
    id_usuario_cargo: new FormControl('', Validators.required),
    id_cliente: new FormControl('', Validators.required),
    id_usuario_tecnico: new FormControl('', Validators.required),
  })

  addHistorialServicio() {
    var formData: any = new FormData();
    formData.append("nombre", this.historialServicioForm.get("nombre")?.value);
    formData.append("descripcion", this.historialServicioForm.get("descripcion")?.value);
    formData.append("fecha_entrada", this.historialServicioForm.get("fecha_entrada")?.value);
    formData.append("fecha_salida", this.historialServicioForm.get("fecha_salida")?.value);
    formData.append("id_usuario_cargo", this.historialServicioForm.get("id_usuario_cargo")?.value);
    formData.append("id_cliente", this.historialServicioForm.get("id_cliente")?.value);
    formData.append("id_usuario_tecnico", this.historialServicioForm.get("id_usuario_tecnico")?.value);

    if (this.historialServicioForm.valid) {
      this.historialAgendaService.addHistorialAgenda(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.historialServicioForm.getRawValue())
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