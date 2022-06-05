import { Component, OnInit, ViewChild } from '@angular/core';
import { HistorialAgendaService } from 'src/app/services/historial-agenda.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgendaHora } from '../../models/historial-servicio.model';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  private id: number = 0
  displayedColumns: string[] = ['id_servicio', 'nombre', 'descripcion', 'fecha_entrada', 'fecha_salida', 'id_usuario_tecnico', 'id_cliente', 'id_vehiculo', 'id_usuario_cargo'];

  dataSource: any


  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;



  constructor(private historialAgendaService: HistorialAgendaService) { }

  ngOnInit(): void {
    this.search()

  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  search() {
    this.historialAgendaService.getHistorialAgenda()
      .subscribe({
        next: (res) => {
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


