import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabla-cliente',
  templateUrl: './tabla-cliente.component.html',
  styleUrls: ['./tabla-cliente.component.scss']
})
export class TablaClienteComponent implements OnInit {


  displayedColumns: string[] = ['correo', 'nombre', 'apellidop', 'apellidom', 'rut', 'numero_contacto', 'direccion', 'sucursal', 'nombre_usuario'];

  dataSource: any

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getCliente()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  getCliente() {
    this.clienteService.getCliente()
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
