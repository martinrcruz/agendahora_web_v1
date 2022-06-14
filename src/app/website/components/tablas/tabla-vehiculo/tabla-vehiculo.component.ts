import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { ModalVehiculoAddComponent } from '../../modals/modal-vehiculo-add/modal-vehiculo-add.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalVehiculoEditComponent } from '../../modals/modal-vehiculo-edit/modal-vehiculo-edit.component';
import { FormControl, FormGroup } from '@angular/forms';

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


  displayedColumns: string[] = ['nombre', 'marca', 'modelo', 'version', 'patente', 'id_cliente', 'color', 'editar', 'eliminar'];

  dataSource: any
  selectorMarcaData: any
  selectorModeloData: any
  public modal?: ModalVehiculoAddComponent
  vehiculo: any = '';

  ngOnInit(): void {
    this.getVehiculo();
    this.getSelectorMarca();
    this.getSelectorModelo();
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

  getVehiculo() {
    this.vehiculoService.getVehiculo()
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
    if (confirm('remove?')) {
      this.vehiculoService.deleteVehiculo(formData)
        .subscribe({
          next: (res) => {
            this.getVehiculo()
          },
          error: (err) => {
            console.log(err)
            alert('Error deleting')
          }
        })
    }
  }

  refreshTable(){
    this.getVehiculo();
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



  getSelectorMarca(){
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

  getSelectorModelo(){
    this.vehiculoService.getModelosVehiculo()
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const selectorModeloData = (newData[1][1])
          console.log(selectorModeloData)
          this.selectorModeloData  = selectorModeloData;

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }
}
