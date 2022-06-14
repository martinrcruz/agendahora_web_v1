import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiciosService } from '../../../../services/servicios.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalServicioAddComponent } from '../../modals/modal-servicio-add/modal-servicio-add.component';
import { ModalServicioCheckComponent } from '../../modals/modal-servicio-check/modal-servicio-check.component';
import { ModalServicioEditComponent } from '../../modals/modal-servicio-edit/modal-servicio-edit.component';


@Component({
  selector: 'app-tabla-servicio',
  templateUrl: './tabla-servicio.component.html',
  styleUrls: ['./tabla-servicio.component.scss']
})
export class TablaServicioComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'id_vehiculo', 'id_tecnico', 'estado_servicio', 'revisar', 'editar', 'pdf'];

  dataSource: any

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(ModalServicioCheckComponent) checkView!: ModalServicioCheckComponent;
  @ViewChild(ModalServicioEditComponent) editView!: ModalServicioEditComponent;


  constructor(private servicioService: ServiciosService, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.getServicio()
  }

  openModal() {
    this.dialog.open(ModalServicioAddComponent, {
      width: '100%'
    })
  }

  refreshTable() {
    this.getServicio();
  }


  getServicio() {
    this.servicioService.getServicio()
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

  updateServicio(id_servicio: any) {
    this.editView.loadData(id_servicio);
  }

  checkServicio(id_servicio: any){
    this.checkView.loadData(id_servicio)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
}
