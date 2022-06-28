import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgendaService } from 'src/app/services/agenda.service';
import { TablaAgendaComponent } from '../../tablas/tabla-agenda/tabla-agenda.component';

@Component({
  selector: 'app-modal-agenda-check',
  templateUrl: './modal-agenda-check.component.html',
  styleUrls: ['./modal-agenda-check.component.scss']
})
export class ModalAgendaCheckComponent implements OnInit {
  public visible = false;

  constructor(private agendaService: AgendaService, private tablaAgenda: TablaAgendaComponent) { }

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;


  ngOnInit(): void {


  }



  vehiculoForm = new FormGroup({
    id_vehiculo: new FormControl({ disabled: true }),
    nombre: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    version: new FormControl('', Validators.required),
    patente: new FormControl('', Validators.required),
    id_cliente: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
  })



  loadData(id_agenda: any) {
    var formData: any = new FormData();
    formData.append("id_agenda", id_agenda);
    
    this.agendaService.getAgendaById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0].marca);
          this.vehiculoForm.setValue({
            id_vehiculo: this.editData.data[0].id_vehiculo,
            nombre: this.editData.data[0].nombre,
            marca: this.editData.data[0].marca,
            modelo: this.editData.data[0].modelo,
            version: this.editData.data[0].version,
            patente: this.editData.data[0].patente,
            id_cliente: this.editData.data[0].id_cliente,
            color: this.editData.data[0].color,
          })

          this.openModal()

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }

  
  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }


}
