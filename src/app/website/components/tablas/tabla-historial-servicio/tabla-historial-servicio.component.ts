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


@Component({
  selector: 'app-tabla-historial-servicio',
  templateUrl: './tabla-historial-servicio.component.html',
  styleUrls: ['./tabla-historial-servicio.component.scss']
})
export class TablaHistorialServicioComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private historialAgendaService: HistorialAgendaService, private dialog: MatDialog) { }


  @ViewChild(ModalHistorialServicioEditComponent) addView!: ModalHistorialServicioEditComponent;

  displayedColumns: string[] = ['nombre', 'descripcion', 'fecha_entrada', 'fecha_salida', 'id_usuario_cargo', 'id_cliente', 'id_usuario_tecnico', 'editar', 'eliminar'];

  dataSource: any
  public modal?: ModalHistorialServicioAddComponent
  historialServicio: any = '';

  ngOnInit(): void {
    this.getHistorialServicio();
  }

  
  openModalAdd() {
    this.dialog.open(ModalHistorialServicioAddComponent, {
      width: '100%',
    })
  }
  openModalEdit() {
    this.dialog.open(ModalHistorialServicioEditComponent, {
      width: '100%',
    })
  }

  
  getHistorialServicio() {
    this.historialAgendaService.getHistorialAgenda()
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


  updateHistorialServicio(id_historial_servicio: any) {
    this.addView.loadData(id_historial_servicio)

  }
  refreshTable(){
    this.getHistorialServicio();
  }

  deleteHistorialServicio(id_historial_servicio: any) {
    var formData: any = new FormData();
    formData.append("id_historial_servicio", id_historial_servicio);




    
    if (confirm('remove?')) {
      this.historialAgendaService.deleteHistorialAgenda(formData)
        .subscribe({
          next: (res) => {
            this.getHistorialServicio()
          },
          error: (err) => {
            console.log(err)
            alert('Error deleting')
          }
        })
    }
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

