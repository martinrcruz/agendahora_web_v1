import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HistorialAgendaService } from '../../../../services/historial-agenda.service';
import { ModalHistorialServicioAddComponent } from '../../modals/modal-historial-servicio-add/modal-historial-servicio-add.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDateRangePicker, MatDateRangeInput, MatDatepicker } from '@angular/material/datepicker';
import { ModalHistorialServicioEditComponent } from '../../modals/modal-historial-servicio-edit/modal-historial-servicio-edit.component';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ServiciosService } from 'src/app/services/servicios.service';


@Component({
  selector: 'app-tabla-historial-servicio',
  templateUrl: './tabla-historial-servicio.component.html',
  styleUrls: ['./tabla-historial-servicio.component.scss']
})
export class TablaHistorialServicioComponent implements OnInit {

  displayedColumns: string[] = ['id_servicio','nombre', 'observacion', 'nombre_cliente', 'id_vehiculo', 'marca', 'modelo', 'version', 'nombre_tecnico', 'fecha_entrada', 'fecha_salida', 'estado_servicio', 'detalle', 'pdf'];

  dataSource: any
  selectorMarcaData: any
  selectorModeloData: any
  selectorVersionData: any
  selectorTecnicoData: any
  selectorEstadoData: any

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(ModalHistorialServicioEditComponent) addView!: ModalHistorialServicioEditComponent;
  public modal?: ModalHistorialServicioAddComponent
  historialServicio: any = '';


  constructor(
    private historialAgendaService: HistorialAgendaService,
    private servicioService: ServiciosService,
    private dialog: MatDialog,
    private vehiculoService: VehiculoService,
    private usuarioService: UsuariosService
  ) { }



  ngOnInit(): void {
    this.getHistorialServicio(null);
    this.getSelectorMarca();
    this.getSelectorTecnico();
  }



  // openModalEdit() {
  //   this.dialog.open(ModalHistorialServicioEditComponent, {
  //     width: '100%',
  //   })
  // }
  verDetalle(id: any) {
    this.addView.loadData(id)

  }


  getHistorialServicio(filtroData: any | null | '') {
    this.servicioService.getHistorialServicioTabla(filtroData)
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

  refreshTable() {
    this.getHistorialServicio(null);
  }

  filtroData = new FormGroup({
    fecha_inicio_filtro: new FormControl(),
    fecha_fin_filtro: new FormControl(),
    fecha_agenda_filtro: new FormControl(),
    tecnico_filtro: new FormControl(),
    marca_filtro: new FormControl(),
    modelo_filtro: new FormControl(),
    version_filtro: new FormControl(),
    estado_servicio: new FormControl(),

  })

  limpiarFiltro() {
    this.filtroData.setValue({
      fecha_inicio_filtro: '',
      fecha_fin_filtro: '',
      fecha_agenda_filtro: '',
      tecnico_filtro: '',
      marca_filtro: '',
      modelo_filtro: '',
      version_filtro: '',
      estado_servicio: '',
    })
    this.getHistorialServicio(null);
  }


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

    if (this.filtroData.get("fecha_agenda_filtro")?.value) {
      var fechaAgenda = new Date(this.filtroData.get("fecha_agenda_filtro")?.value);
      var fecha_agenda = ('0' + (fechaAgenda.getDate())).slice(-2) + '-' + ('0' + (fechaAgenda.getMonth() + 1)).slice(-2) + '-' + fechaAgenda.getFullYear()

      var fecha_agenda_truncated = fechaAgenda.getFullYear() + '-' + ('0' + (fechaAgenda.getMonth() + 1)).slice(-2) + '-' + ('0' + (fechaAgenda.getDate())).slice(-2)

      filtroData.append("fecha_agenda", fecha_agenda_truncated);
    }


    filtroData.append("tecnico", this.filtroData.get("tecnico_filtro")?.value);
    filtroData.append("marca", this.filtroData.get("marca_filtro")?.value);
    filtroData.append("modelo", this.filtroData.get("modelo_filtro")?.value);
    filtroData.append("version", this.filtroData.get("version_filtro")?.value);
    filtroData.append("estado_servicio", this.filtroData.get("estado_servicio")?.value);

    console.log(filtroData)
    this.getHistorialServicio(filtroData)

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSelectorTecnico() {
    this.usuarioService.getTecnicos()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const selectorTecnicoData = (newData[1][1])
          console.log(selectorTecnicoData)
          this.selectorTecnicoData = selectorTecnicoData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
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

