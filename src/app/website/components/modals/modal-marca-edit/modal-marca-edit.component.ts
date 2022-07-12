import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from 'src/app/services/marca.service';
import { disposeEmitNodes } from 'typescript/lib/tsserverlibrary';
import { TablaMarcaComponent } from '../../tablas/tabla-marca/tabla-marca.component';

@Component({
  selector: 'app-modal-marca-edit',
  templateUrl: './modal-marca-edit.component.html',
  styleUrls: ['./modal-marca-edit.component.scss']
})

export class ModalMarcaEditComponent implements OnInit {

  public visible = false;

  constructor(private marcaService: MarcaService, private tablaMarca: TablaMarcaComponent) { }

  @Output() editedMarca = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  errorMessage: string = '';
  selectorMarcaData: any
  selectorModeloData: any
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

  marcaForm = new FormGroup({
    id_marca: new FormControl({ disabled: true }),
    nombre: new FormControl('', Validators.required),
    logo: new FormControl('', Validators.required),
  })


  ngOnInit(): void {


  }

  loadData(id_marca: any) {
    var formData: any = new FormData();
    formData.append("id_marca", id_marca);
    
    this.marcaService.getMarcaById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0].marca);
          this.marcaForm.setValue({
            id_marca: this.editData.data[0].id_marca,
            nombre: this.editData.data[0].nombre,
            logo: this.editData.data[0].logo,
          })

          this.openModal()

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateMarca() {
    var formData: any = new FormData();
    formData.append("id_marca", this.marcaForm.get("id_marca")?.value);
    formData.append("nombre", this.marcaForm.get("nombre")?.value);
    formData.append("logo", this.marcaForm.get("logo")?.value);


    if (this.marcaForm.valid) {
      this.marcaService.updateMarca(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()

          },
          error: (err) => {
            console.log(this.marcaForm.getRawValue())
            this.saveResponse = err
          }
        })


    }
    this.refreshTable.emit();
  }
  clearForm() {
    this.marcaForm.setValue({
      id_marca: '',
      id_modelo: '',
      nombre: '',
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
