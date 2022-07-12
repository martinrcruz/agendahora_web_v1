import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VersionService } from '../../../../services/version.service';
import { ModalVersionAddComponent } from '../../modals/modal-version-add/modal-version-add.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDateRangePicker, MatDateRangeInput, MatDatepicker } from '@angular/material/datepicker';
import { ModalVersionEditComponent } from '../../modals/modal-version-edit/modal-version-edit.component';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-tabla-version',
  templateUrl: './tabla-version.component.html',
  styleUrls: ['./tabla-version.component.scss']
})
export class TablaVersionComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;


  constructor(private versionService: VersionService, private dialog: MatDialog) { }


  @ViewChild(ModalVersionEditComponent) addView!: ModalVersionEditComponent;



  displayedColumns: string[] = ['id_marca', 'id_modelo', 'nombre', 'descripcion', 'editar', 'eliminar'];

  dataSource: any
  public modal?: ModalVersionAddComponent
  vehiculo: any = '';

  ngOnInit(): void {
    this.getVersion();
  }

  openModalAdd() {
    this.dialog.open(ModalVersionAddComponent, {
      width: '100%',
    })
  }
  openModalEdit() {
    this.dialog.open(ModalVersionEditComponent, {
      width: '100%',
    })
  }

  getVersion() {
    this.versionService.getVersion()
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos : any = (newData[1][1])

          this.dataSource = new MatTableDataSource(datos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          console.log(this.dataSource)
        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }


  updateVersion(id_version: any) {
    this.addView.loadData(id_version)

  }
  refreshTable() {
    this.getVersion();
  }

  deleteVersion(id_version: any) {
    var formData: any = new FormData();
    formData.append("id_version", id_version);



    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar la solicitud?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.versionService.deleteVersion(formData)
        .subscribe({
          next: (res) => {
            this.getVersion()
          },
          error: (err) => {
            console.log(err)
            alert('Error deleting')
          }
        })
        Swal.fire('Eliminado con exito!', '', 'success')

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('La solicitud no fue eliminado.', '', 'info')
      }
    })


  }



  filtroData = new FormGroup({
    fecha_inicio_filtro: new FormControl(),
    fecha_fin_filtro: new FormControl(),
    marca_filtro: new FormControl(),
    modelo_filtro: new FormControl(),
    version_filtro: new FormControl(),

  })

  filtrarTabla() {

    var filtroData: any = new FormData();

    filtroData.append("marca_filtro", this.filtroData.get("marca_filtro")?.value);
    filtroData.append("modelo_filtro", this.filtroData.get("modelo_filtro")?.value);
    filtroData.append("version_filtro", this.filtroData.get("version_filtro")?.value);
    console.log(filtroData)

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

