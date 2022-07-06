import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudVehiculoService } from '../../../../services/solicitud-vehiculo.service';
import { ModalSolicitudVehiculoAddComponent } from '../../modals/modal-solicitud-vehiculo-add/modal-solicitud-vehiculo-add.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDateRangePicker, MatDateRangeInput, MatDatepicker } from '@angular/material/datepicker';
import { ModalSolicitudVehiculoEditComponent } from '../../modals/modal-solicitud-vehiculo-edit/modal-solicitud-vehiculo-edit.component';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-tabla-solicitud-vehiculo',
  templateUrl: './tabla-solicitud-vehiculo.component.html',
  styleUrls: ['./tabla-solicitud-vehiculo.component.scss']
})
export class TablaSolicitudVehiculoComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;


  constructor(private solicitudVehiculoService: SolicitudVehiculoService, private dialog: MatDialog) { }


  @ViewChild(ModalSolicitudVehiculoEditComponent) addView!: ModalSolicitudVehiculoEditComponent;



  displayedColumns: string[] = ['marca', 'modelo', 'ano', 'patente', 'version', 'ano_compra', 'sucursal_compra', 'nro_chasis', 'nro_motor', 'img_1', 'img_2', 'img_3', 'id_usuario_gestor', 'id_cliente', 'editar', 'eliminar'];

  dataSource: any
  public modal?: ModalSolicitudVehiculoAddComponent
  vehiculo: any = '';

  ngOnInit(): void {
    this.getSolicitudVehiculo();
  }

  openModalAdd() {
    this.dialog.open(ModalSolicitudVehiculoAddComponent, {
      width: '100%',
    })
  }
  openModalEdit() {
    this.dialog.open(ModalSolicitudVehiculoEditComponent, {
      width: '100%',
    })
  }

  getSolicitudVehiculo() {
    this.solicitudVehiculoService.getSolicitudVehiculo()
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


  updateSolicitudVehiculo(id_solicitud_vehiculo: any) {
    this.addView.loadData(id_solicitud_vehiculo)

  }
  refreshTable() {
    this.getSolicitudVehiculo();
  }

  deleteSolicitudVehiculo(id_solicitud_vehiculo: any) {
    var formData: any = new FormData();
    formData.append("id_solicitud_vehiculo", id_solicitud_vehiculo);



    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar la solicitud?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.solicitudVehiculoService.deleteSolicitudVehiculo(formData)
        .subscribe({
          next: (res) => {
            this.getSolicitudVehiculo()
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



