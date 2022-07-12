import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VersionService } from 'src/app/services/version.service';
import { TablaVersionComponent } from '../../tablas/tabla-version/tabla-version.component';



@Component({
  selector: 'app-modal-version-add',
  templateUrl: './modal-version-add.component.html',
  styleUrls: ['./modal-version-add.component.scss'],

})
export class ModalVersionAddComponent implements OnInit {

  constructor(private versionService: VersionService) { }



  @Output() onSubmited = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();

  
  ngOnInit(): void {
  }

  public visible = false;

  errorMessage: string = '';
  errorClass: string | any = '';
  saveResponse: any;

  versionForm = new FormGroup({
    id_version: new FormControl({ value: 'No aplica', disabled: true }),
    id_marca: new FormControl('', Validators.required),
    id_modelo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  })

  addVersion() {
    var formData: any = new FormData();
    formData.append("id_marca", this.versionForm.get("id_marca")?.value);
    formData.append("id_modelo", this.versionForm.get("id_modelo")?.value);
    formData.append("nombre", this.versionForm.get("nombre")?.value);
    formData.append("descripcion", this.versionForm.get("descripcion")?.value);


    if (this.versionForm.valid) {
      this.versionService.addVersion(formData)
        .subscribe({
          next: (res) => {
            this.saveResponse = res;
            console.log(this.saveResponse)
            this.openModal()
            this.refreshTable.emit();
          },
          error: (err) => {
            console.log(this.versionForm.getRawValue())
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