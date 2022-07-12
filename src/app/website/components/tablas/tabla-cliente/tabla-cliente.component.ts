import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../../../../services/usuarios.service';
import { ModalClienteAddComponent } from '../../modals/modal-cliente-add/modal-cliente-add.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDateRangePicker, MatDateRangeInput, MatDatepicker } from '@angular/material/datepicker';
import { ModalClienteEditComponent } from '../../modals/modal-cliente-edit/modal-cliente-edit.component';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tabla-cliente',
  templateUrl: './tabla-cliente.component.html',
  styleUrls: ['./tabla-cliente.component.scss']
})
export class TablaClienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(ModalClienteEditComponent) addView!: ModalClienteEditComponent;


  constructor(private usuarioService: UsuariosService, private dialog: MatDialog) { }



  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'username', 'editar', 'eliminar'];

  dataSource: any
  public modal?: ModalClienteAddComponent
  cliente: any;


  ngOnInit(): void {
    this.getCliente();
  }


  getCliente() {
    this.usuarioService.getCliente()
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

  updateCliente(id: any) {
    this.addView.loadData(id)

  }

  refreshTable(){
    this.getCliente();
  }

  deleteCliente(id: any) {
    var formData: any = new FormData();
    formData.append("id", id);


    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el cliente?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(formData)
        .subscribe({
          next: (res) => {
            this.getCliente()
          },
          error: (err) => {
            console.log(err)
            alert('Error deleting')
          }
        })
        Swal.fire('Eliminado con exito!', '', 'success')

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('El cliente no fue eliminado.', '', 'info')
      }
    })
  }

  filtroData = new FormGroup({
    fecha_inicio_filtro: new FormControl(),
    fecha_fin_filtro: new FormControl(),

  })
  filtrarTabla() {

    var filtroData: any = new FormData();

    filtroData.append("marca_filtro", this.filtroData.get("marca_filtro")?.value);
    filtroData.append("modelo_filtro", this.filtroData.get("modelo_filtro")?.value);
    filtroData.append("version_filtro", this.filtroData.get("version_filtro")?.value);
    console.log(filtroData)
  }


  limpiarFiltro() {
    this.filtroData.setValue({
      fecha_inicio_filtro: '',
      fecha_fin_filtro: '',

    })
    this.getCliente();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}