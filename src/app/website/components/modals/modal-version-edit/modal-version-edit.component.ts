import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VersionService } from 'src/app/services/version.service';
import { disposeEmitNodes } from 'typescript/lib/tsserverlibrary';
import { TablaVersionComponent } from '../../tablas/tabla-version/tabla-version.component';

@Component({
  selector: 'app-modal-version-edit',
  templateUrl: './modal-version-edit.component.html',
  styleUrls: ['./modal-version-edit.component.scss']
})

export class ModalVersionEditComponent implements OnInit {

  public visible = false;

  constructor(private versionService: VersionService, private tablaVersion: TablaVersionComponent) { }

  @Output() editedVersion = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  errorMessage: string = '';
  selectorMarcaData: any
  selectorModeloData: any
  errorClass: string | any = '';
  saveResponse: any;
  editData: any;

  versionForm = new FormGroup({
    id_version: new FormControl({ disabled: true }),
    id_marca: new FormControl('', Validators.required),
    id_modelo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  })


  ngOnInit(): void {


  }

  loadData(id_version: any) {
    var formData: any = new FormData();
    formData.append("id_version", id_version);
    
    this.versionService.getVersionById(formData)
      .subscribe({
        next: (res) => {
          this.editData = res;
          console.log(this.editData.data[0].marca);
          this.versionForm.setValue({
            id_version: this.editData.data[0].id_version,
            id_marca: this.editData.data[0].id_marca,
            id_modelo: this.editData.data[0].id_modelo,
            nombre: this.editData.data[0].nombre,
            descripcion: this.editData.data[0].descripcion,
          })

          this.openModal()

        },
        error: (err) => {
          alert('cant do that')
        }
      })
  }


  updateVersion() {
    var formData: any = new FormData();
    formData.append("id_version", this.versionForm.get("id_version")?.value);
    formData.append("id_marca", this.versionForm.get("id_marca")?.value);
    formData.append("id_modelo", this.versionForm.get("id_modelo")?.value);
    formData.append("nombre", this.versionForm.get("nombre")?.value);
    formData.append("descripcion", this.versionForm.get("descripcion")?.value);


    if (this.versionForm.valid) {
      this.versionService.updateVersion(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()

          },
          error: (err) => {
            console.log(this.versionForm.getRawValue())
            this.saveResponse = err
          }
        })


    }
    this.refreshTable.emit();
  }
  clearForm() {
    this.versionForm.setValue({
      id_version: '',
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
