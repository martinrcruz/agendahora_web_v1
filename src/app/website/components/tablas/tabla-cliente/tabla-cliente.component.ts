import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../../../../services/cliente.service';
import { ModalClienteAddComponent } from '../../modals/modal-cliente-add/modal-cliente-add.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDateRangePicker, MatDateRangeInput, MatDatepicker } from '@angular/material/datepicker';
import { ModalClienteEditComponent } from '../../modals/modal-cliente-edit/modal-cliente-edit.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tabla-cliente',
  templateUrl: './tabla-cliente.component.html',
  styleUrls: ['./tabla-cliente.component.scss']
})
export class TablaClienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;


  constructor(private clienteService: ClienteService, private dialog: MatDialog) { }


  @ViewChild(ModalClienteEditComponent) addView!: ModalClienteEditComponent;

  displayedColumns: string[] = ['id_cliente','correo', 'nombre', 'apellidop', 'apellidom', 'rut', 'numero_contacto', 'direccion', 'sucursal', 'nombre_usuario', 'editar', 'eliminar'];

  dataSource: any
  public modal?: ModalClienteAddComponent
  cliente: any = '';
  ngOnInit(): void {

    this.getCliente();
  }

  openModalAdd() {
    this.dialog.open(ModalClienteAddComponent, {
      width: '100%',
    })
  }
  openModalEdit() {
    this.dialog.open(ModalClienteEditComponent, {
      width: '100%',
    })
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
  updateCliente(id_cliente: any) {
    this.addView.loadData(id_cliente)

  }
  refreshTable(){
    this.getCliente();
  }

  deleteCliente(id_cliente: any) {
    var formData: any = new FormData();
    formData.append("id_cliente", id_cliente);

    if (confirm('remove?')) {
      this.clienteService.deleteCliente(formData)
        .subscribe({
          next: (res) => {
            this.getCliente()
          },
          error: (err) => {
            console.log(err)
            alert('Error deleting')
          }
        })
    }
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