import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiciosService } from '../../../services/servicios.service';
@Component({
  selector: 'app-tabla-servicio',
  templateUrl: './tabla-servicio.component.html',
  styleUrls: ['./tabla-servicio.component.scss']
})
export class TablaServicioComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'id_vehiculo', 'id_tecnico'];

  dataSource: any

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;




  
  constructor(private servicioService: ServiciosService) { }

  ngOnInit(): void {
    this.getServicio()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
}
