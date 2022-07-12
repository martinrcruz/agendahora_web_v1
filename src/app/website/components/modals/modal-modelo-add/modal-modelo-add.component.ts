import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModeloService } from 'src/app/services/modelo.service';
import { TablaModeloComponent } from '../../tablas/tabla-modelo/tabla-modelo.component';



@Component({
  selector: 'app-modal-modelo-add',
  templateUrl: './modal-modelo-add.component.html',
  styleUrls: ['./modal-modelo-add.component.scss'],

})
export class ModalModeloAddComponent implements OnInit {

  constructor(private modeloService: ModeloService) { }



  @Output() onSubmited = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  
  ngOnInit(): void {
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  modeloForm = new FormGroup({
    id_modelo: new FormControl({ value: 'No aplica', disabled: true }),
    id_marca: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    logo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  })

  addModelo() {
    var formData: any = new FormData();
    formData.append("nombre", this.modeloForm.get("nombre")?.value);
    formData.append("logo", this.modeloForm.get("logo")?.value);
    formData.append("descripcion", this.modeloForm.get("descripcion")?.value);


    if (this.modeloForm.valid) {
      this.modeloService.addModelo(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.modeloForm.getRawValue())
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