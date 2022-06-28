import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgendaService } from 'src/app/services/agenda.service';
import { ModalAgendaCheckComponent } from '../../modals/modal-agenda-check/modal-agenda-check.component';

@Component({
  selector: 'app-tabla-agenda',
  templateUrl: './tabla-agenda.component.html',
  styleUrls: ['./tabla-agenda.component.scss']
})
export class TablaAgendaComponent implements OnInit {


  displayedColumns: string[] = ['nombre', 'descripcion', 'nombre_cliente', 'id_vehiculo', 'marca', 'modelo', 'version', 'nombre_tecnico', 'fecha_agenda', 'hora_agenda', 'estado_hora', 'revisar', 'editar', 'pdf'];

  dataSource: any

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(ModalAgendaCheckComponent) checkView!: ModalAgendaCheckComponent;


  constructor(private agendaService: AgendaService, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.getServicio()
  }

  openModal() {
    this.dialog.open(ModalAgendaCheckComponent, {
      width: '100%'
    })
  }

  refreshTable() {
    this.getServicio();
  }


  getServicio() {
    this.agendaService.getHoraAgenda()
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


  checkAgenda(id_agenda: any) {
    this.checkView.loadData(id_agenda)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
