import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudClienteService } from '../../../../services/solicitud-cliente.service';
import { ModalSolicitudClienteAddComponent } from '../../modals/modal-solicitud-cliente-add/modal-solicitud-cliente-add.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDateRangePicker, MatDateRangeInput, MatDatepicker } from '@angular/material/datepicker';
import { ModalSolicitudClienteEditComponent } from '../../modals/modal-solicitud-cliente-edit/modal-solicitud-cliente-edit.component';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tabla-solicitud-cliente',
  templateUrl: './tabla-solicitud-cliente.component.html',
  styleUrls: ['./tabla-solicitud-cliente.component.scss']
})
export class TablaSolicitudClienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;


  constructor(private solicitudClienteService: SolicitudClienteService, private dialog: MatDialog) { }


  @ViewChild(ModalSolicitudClienteEditComponent) addView!: ModalSolicitudClienteEditComponent;

  displayedColumns: string[] = ['id_solicitud_registro','correo', 'nombre', 'apellidop', 'apellidom', 'rut', 'numero_contacto', 'direccion', 'sucursal', 'nombre_usuario',"id_usuario_gestor", 'editar', 'eliminar'];

  dataSource: any
  public modal?: ModalSolicitudClienteAddComponent
  solicitudCliente: any = '';
  ngOnInit(): void {

    this.getSolicitudCliente();
  }

  openModalAdd() {
    this.dialog.open(ModalSolicitudClienteAddComponent, {
      width: '100%',
    })
  }
  openModalEdit() {
    this.dialog.open(ModalSolicitudClienteEditComponent, {
      width: '100%',
    })
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
  updateSolicitudCliente(id_solicitud_cliente: any) {
    this.addView.loadData(id_solicitud_cliente)

  }
  refreshTable(){
    this.getSolicitudCliente();
  }

  deleteSolicitudCliente(id_solicitud_cliente: any) {
    var formData: any = new FormData();
    formData.append("id_solicitud_registro", id_solicitud_cliente);


    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar la solicitud?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.solicitudClienteService.deleteSolicitudCliente(formData)
        .subscribe({
          next: (res) => {
            this.getSolicitudCliente()
          },
          error: (err) => {
            console.log(err)
            alert('Error deleting')
          }
        })
        Swal.fire('Eliminado con exito!', '', 'success')

      } else if (result.isDenied || result.isDismissed) {
        Swal.fire('La solicitud no fue eliminado.', '', 'info')
      }
    })
  }


  
  filtroData = new FormGroup({
    fecha_inicio_filtro: new FormControl(),
    fecha_fin_filtro: new FormControl(),
    marca_filtro: new FormControl(),
    modelo_filtro: new FormControl(),
    version_filtro: new FormControl(),

  })
  filtrarTabla() {

    var filtroData: any = new FormData();

    filtroData.append("marca_filtro", this.filtroData.get("marca_filtro")?.value);
    filtroData.append("modelo_filtro", this.filtroData.get("modelo_filtro")?.value);
    filtroData.append("version_filtro", this.filtroData.get("version_filtro")?.value);
    console.log(filtroData)
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}