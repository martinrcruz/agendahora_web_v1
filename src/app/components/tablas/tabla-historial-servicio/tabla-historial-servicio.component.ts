import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HistorialAgendaService } from 'src/app/services/historial-agenda.service';
import { HistorialAgenda } from 'src/app/models/historial-servicio.model';


@Component({
  selector: 'app-tabla-historial-servicio',
  templateUrl: './tabla-historial-servicio.component.html',
  styleUrls: ['./tabla-historial-servicio.component.scss']
})
export class TablaHistorialServicioComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'fecha_entrada', 'fecha_salida', 'id_usuario_cargo', 'id_cliente', 'id_usuario_tecnico'];

  dataSource: any

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  
  constructor(private historialAgendaService: HistorialAgendaService) { }

  ngOnInit(): void {
    this.getHistorialAgenda();
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  getHistorialAgenda() {
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


}
