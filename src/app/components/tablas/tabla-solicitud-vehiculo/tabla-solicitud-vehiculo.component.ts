
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudVehiculoService } from '../../../services/solicitud-vehiculo.service';

@Component({
  selector: 'app-tabla-solicitud-vehiculo',
  templateUrl: './tabla-solicitud-vehiculo.component.html',
  styleUrls: ['./tabla-solicitud-vehiculo.component.scss']
})
export class TablaSolicitudVehiculoComponent implements OnInit {

  displayedColumns: string[] = ['id_marca','modelo','ano','patente','version','ano_compra','sucursal_compra','nro_chasis','nro_motor','img_1','img_2','img_3','id_usuario_gestor','id_cliente'];

  dataSource: any

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;



  constructor(private solicitudVehiculoService: SolicitudVehiculoService) { }


  ngOnInit(): void {
    this.getSolicitudVehiculo();
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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


}



