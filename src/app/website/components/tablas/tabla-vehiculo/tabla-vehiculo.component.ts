import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { ModalVehiculoAddComponent } from '../../modals/modal-vehiculo-add/modal-vehiculo-add.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalVehiculoEditComponent } from '../../modals/modal-vehiculo-edit/modal-vehiculo-edit.component';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tabla-vehiculo',
  templateUrl: './tabla-vehiculo.component.html',
  styleUrls: ['./tabla-vehiculo.component.scss']
})
export class TablaVehiculoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;


  constructor(private vehiculoService: VehiculoService, private dialog: MatDialog) { }


  @ViewChild(ModalVehiculoEditComponent) addView!: ModalVehiculoEditComponent;


  displayedColumns: string[] = ['nombre', 'marca', 'modelo', 'version', 'patente', 'id_cliente', 'nombre_cliente', 'color', 'editar', 'eliminar'];

  dataSource: any
  selectorMarcaData: any
  selectorModeloData: any
  selectorVersionData: any
  public modal?: ModalVehiculoAddComponent
  vehiculo: any = '';

  ngOnInit(): void {
    this.getVehiculo(null);
    this.getSelectorMarca();
  }

  openModalAdd() {
    this.dialog.open(ModalVehiculoAddComponent, {
      width: '100%',
    })
  }
  openModalEdit() {
    this.dialog.open(ModalVehiculoEditComponent, {
      width: '100%',
    })
  }

  getVehiculo(filtroData: any | null | '') {
    this.vehiculoService.getVehiculoTabla(filtroData)
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])

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


  updateVehiculo(id_vehiculo: any) {
    this.addView.loadData(id_vehiculo)

  }

  deleteVehiculo(id_vehiculo: any) {
    var formData: any = new FormData();
    formData.append("id_vehiculo", id_vehiculo);
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el vehiculo?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.vehiculoService.deleteVehiculo(formData)
          .subscribe({
            next: (res) => {
              this.getVehiculo(null)
            },
            error: (err) => {
              console.log(err)
              alert('Error deleting')
            }
          })
        Swal.fire('Eliminado con exito!', '', 'success')

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El vehiculo no fue eliminado.', '', 'info')

      }
    })
  }

  refreshTable() {
    this.getVehiculo(null);
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

    if (this.filtroData.get("fecha_inicio_filtro")?.value) {
      var fechaInicio = new Date(this.filtroData.get("fecha_inicio_filtro")?.value);
      var fecha_inicio = ('0' + (fechaInicio.getDate())).slice(-2) + '-' + ('0' + (fechaInicio.getMonth() + 1)).slice(-2) + '-' + fechaInicio.getFullYear()

      var fecha_inicio_truncated = fechaInicio.getFullYear() + '-' + ('0' + (fechaInicio.getMonth() + 1)).slice(-2) + '-' + ('0' + (fechaInicio.getDate())).slice(-2)

      filtroData.append("fecha_inicio", fecha_inicio_truncated);
    }

    if (this.filtroData.get("fecha_fin_filtro")?.value) {
      var fechaFin = new Date(this.filtroData.get("fecha_fin_filtro")?.value);
      var fecha_fin = ('0' + (fechaFin.getDate())).slice(-2) + '-' + ('0' + (fechaFin.getMonth() + 1)).slice(-2) + '-' + fechaFin.getFullYear()

      var fecha_fin_truncated = fechaFin.getFullYear() + '-' + ('0' + (fechaFin.getMonth() + 1)).slice(-2) + '-' + ('0' + (fechaFin.getDate())).slice(-2)

      filtroData.append("fecha_fin", fecha_fin_truncated);
    }

    filtroData.append("marca", this.filtroData.get("marca_filtro")?.value);
    filtroData.append("modelo", this.filtroData.get("modelo_filtro")?.value);
    filtroData.append("version", this.filtroData.get("version_filtro")?.value);
    console.log(filtroData)
    this.getVehiculo(filtroData)
  }

  limpiarFiltro() {
    this.filtroData.setValue({
      fecha_inicio_filtro: '',
      fecha_fin_filtro: '',
      marca_filtro: '',
      modelo_filtro: '',
      version_filtro: '',
    })
    this.getVehiculo(null);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  getSelectorMarca() {
    this.vehiculoService.getMarcasVehiculo()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const selectorMarcaData = (newData[1][1])
          console.log(selectorMarcaData)
          this.selectorMarcaData = selectorMarcaData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  changeMarca(event: any) {
    this.getSelectorModelo(event.target.value);
  }

  getSelectorModelo(id: any) {

    this.vehiculoService.getModelosVehiculo(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          var newData = Object.entries(res)
          const selectorModeloData = (newData[1][1])
          console.log(selectorModeloData)
          this.selectorModeloData = selectorModeloData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  changeVersion(event: any) {
    this.getSelectorVersion(event.target.value);
  }

  getSelectorVersion(id: any) {

    this.vehiculoService.getVersionVehiculo(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          var newData = Object.entries(res)
          const selectorVersionData = (newData[1][1])
          console.log(selectorVersionData)
          this.selectorVersionData = selectorVersionData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }
}
