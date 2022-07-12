import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModeloService } from 'src/app/services/modelo.service';
import { disposeEmitNodes } from 'typescript/lib/tsserverlibrary';
import { TablaModeloComponent } from '../../tablas/tabla-modelo/tabla-modelo.component';

@Component({
  selector: 'app-modal-modelo-edit',
  templateUrl: './modal-modelo-edit.component.html',
  styleUrls: ['./modal-modelo-edit.component.scss']
})

export class ModalModeloEditComponent implements OnInit {

  public visible = false;

  constructor(private modeloService: ModeloService, private tablaModelo: TablaModeloComponent) { }

  @Output() editedModelo = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  errorMessage: string = '';
  selectorMarcaData: any
  selectorModeloData: any
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

  modeloForm = new FormGroup({
    id_modelo: new FormControl({ disabled: true }),
    id_marca: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    logo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  })


  ngOnInit(): void {


  }

  loadData(id_modelo: any) {
    var formData: any = new FormData();
    formData.append("id_modelo", id_modelo);
    
    this.modeloService.getModeloById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0].marca);
          this.modeloForm.setValue({
            id_modelo: this.editData.data[0].id_modelo,
            id_marca: this.editData.data[0].id_marca,
            nombre: this.editData.data[0].nombre,
            logo: this.editData.data[0].logo,
            descripcion: this.editData.data[0].descripcion,
          })

          this.openModal()

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateModelo() {
    var formData: any = new FormData();
    formData.append("id_modelo", this.modeloForm.get("id_modelo")?.value);
    formData.append("id_marca", this.modeloForm.get("id_marca")?.value);
    formData.append("nombre", this.modeloForm.get("nombre")?.value);
    formData.append("logo", this.modeloForm.get("logo")?.value);
    formData.append("descripcion", this.modeloForm.get("descripcion")?.value);


    if (this.modeloForm.valid) {
      this.modeloService.updateModelo(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()

          },
          error: (err) => {
            console.log(this.modeloForm.getRawValue())
            this.saveResponse = err
          }
        })


    }
    this.refreshTable.emit();
  }
  clearForm() {
    this.modeloForm.setValue({
      id_modelo: '',
      id_marca: '',
      nombre: '',
      logo: '',
      descripcion: '',
    })
  }

  openModal() {
    this.visible = !this.visible;
  }

  handleModalChange(event: any) {
    this.visible = event;
  }

}
