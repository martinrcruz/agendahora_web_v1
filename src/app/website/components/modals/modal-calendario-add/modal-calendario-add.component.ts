import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgendaService } from 'src/app/services/agenda.service';



@Component({
  selector: 'app-modal-calendario-add',
  templateUrl: './modal-calendario-add.component.html',
  styleUrls: ['./modal-calendario-add.component.scss'],

})
export class ModalCalendarioAddComponent implements OnInit {

  constructor(private agendaService: AgendaService) { }


  @Output() onSubmited = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();
  
  ngOnInit(): void {
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  calendarioForm = new FormGroup({
    id_hora_agenda: new FormControl({value: 'No aplica', disabled: true}),
    id_servicio: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    fecha_entrada: new FormControl('', Validators.required),
    fecha_salida: new FormControl('', Validators.required),
    id_usuario_tecnico: new FormControl('', Validators.required),
    id_cliente: new FormControl('', Validators.required),
    id_vehiculo: new FormControl('', Validators.required),
    id_usuario_cargo: new FormControl('', Validators.required),
  })

  addCalendario() {
    var formData: any = new FormData();
    formData.append("id_servicio", this.calendarioForm.get("id_servicio")?.value);
    formData.append("nombre", this.calendarioForm.get("nombre")?.value);
    formData.append("descripcion", this.calendarioForm.get("descripcion")?.value);
    formData.append("fecha_entrada", this.calendarioForm.get("fecha_entrada")?.value);
    formData.append("fecha_salida", this.calendarioForm.get("fecha_salida")?.value);
    formData.append("id_usuario_tecnico", this.calendarioForm.get("id_usuario_tecnico")?.value);
    formData.append("id_cliente", this.calendarioForm.get("id_cliente")?.value);
    formData.append("id_vehiculo", this.calendarioForm.get("id_vehiculo")?.value);
    formData.append("id_usuario_cargo", this.calendarioForm.get("id_usuario_cargo")?.value);
    
    if (this.calendarioForm.valid) {
      this.agendaService.addAgenda(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.calendarioForm.getRawValue())
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
