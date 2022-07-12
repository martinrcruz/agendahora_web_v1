import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosService } from '../../../../services/usuarios.service';
import { ModalUsuarioEditComponent } from '../../modals/modal-usuario-edit/modal-usuario-edit.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(ModalUsuarioEditComponent) addView!: ModalUsuarioEditComponent;


  constructor(private usuarioService: UsuariosService, private dialog: MatDialog) { }

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'username', 'editar', 'eliminar'];

  dataSource: any
  usuario: any


  ngOnInit(): void {
    this.getUsuario();
  }




  getUsuario() {
    this.usuarioService.getUsuario()
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
  updateUsuario(id: any) {
    this.addView.loadData(id)

  }
  refreshTable(){
    this.getUsuario();
  }

  deleteUsuario(id: any) {
    var formData: any = new FormData();
    formData.append("id", id);

    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar el usuario?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed) {

        this.usuarioService.deleteUsuario(formData)
        .subscribe({
          next: (res) => {
            this.getUsuario()
          },
          error: (err) => {
            console.log(err)
            alert('Error deleting')
          }
        })
        Swal.fire('Eliminado con exito!', '', 'success')  

      } else if(result.isDenied || result.isDismissed){
        Swal.fire('El usuario no fue eliminado.', '', 'info')  
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
    this.getUsuario();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
