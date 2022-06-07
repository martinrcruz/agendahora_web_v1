import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculoService } from '../../../services/vehiculo.service';
import { ModalVehiculoAddComponent } from '../../modals/modal-vehiculo-add/modal-vehiculo-add.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDateRangePicker, MatDateRangeInput, MatDatepicker} from '@angular/material/datepicker';
@Component({
  selector: 'app-tabla-vehiculo',
  templateUrl: './tabla-vehiculo.component.html',
  styleUrls: ['./tabla-vehiculo.component.scss']
})
export class TablaVehiculoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private vehiculoService: VehiculoService, private dialog: MatDialog) { }
  displayedColumns: string[] = ['nombre', 'marca', 'modelo', 'version', 'patente', 'id_cliente', 'color'];

  dataSource: any
  public modal?: ModalVehiculoAddComponent

  filtroForm: any = new FormData;


  ngOnInit(): void {
    this.getVehiculo();
  }
  openModal() {
    this.dialog.open(ModalVehiculoAddComponent, {
      width: '60%',
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filtrarTabla(){

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

}
