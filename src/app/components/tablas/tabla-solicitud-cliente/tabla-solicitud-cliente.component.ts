import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudClienteService } from '../../../services/solicitud-cliente.service';

@Component({
  selector: 'app-tabla-solicitud-cliente',
  templateUrl: './tabla-solicitud-cliente.component.html',
  styleUrls: ['./tabla-solicitud-cliente.component.scss']
})
export class TablaSolicitudClienteComponent implements OnInit {


  displayedColumns: string[] = ['nombre', 'correo', 'apellidop', 'apellidom', 'rut', 'numero_contacto', 'direccion', 'sucursal', 'nombre_usuario', 'id_usuario_gestor'];

  dataSource: any

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;



  constructor(private solicitudClienteService: SolicitudClienteService) { }

  ngOnInit(): void {
    this.getSolicitudCliente();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  getSolicitudCliente() {
    this.solicitudClienteService.getSolicitudCliente()
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
