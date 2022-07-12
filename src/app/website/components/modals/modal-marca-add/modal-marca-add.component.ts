import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from 'src/app/services/marca.service';
import { TablaMarcaComponent } from '../../tablas/tabla-marca/tabla-marca.component';



@Component({
  selector: 'app-modal-marca-add',
  templateUrl: './modal-marca-add.component.html',
  styleUrls: ['./modal-marca-add.component.scss'],

})
export class ModalMarcaAddComponent implements OnInit {

  constructor(private marcaService: MarcaService) { }



  @Output() onSubmited = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  
  ngOnInit(): void {
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  marcaForm = new FormGroup({
    id_marca: new FormControl({ value: 'No aplica', disabled: true }),
    id_modelo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  })

  addMarca() {
    var formData: any = new FormData();
    formData.append("nombre", this.marcaForm.get("nombre")?.value);
    formData.append("logo", this.marcaForm.get("logo")?.value);


    if (this.marcaForm.valid) {
      this.marcaService.addMarca(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.marcaForm.getRawValue())
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