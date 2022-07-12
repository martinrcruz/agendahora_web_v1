import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModeloService } from '../../../../services/modelo.service';
import { ModalModeloAddComponent } from '../../modals/modal-modelo-add/modal-modelo-add.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDateRangePicker, MatDateRangeInput, MatDatepicker } from '@angular/material/datepicker';
import { ModalModeloEditComponent } from '../../modals/modal-modelo-edit/modal-modelo-edit.component';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-tabla-modelo',
  templateUrl: './tabla-modelo.component.html',
  styleUrls: ['./tabla-modelo.component.scss']
})
export class TablaModeloComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;


  constructor(private modeloService: ModeloService, private dialog: MatDialog) { }


  @ViewChild(ModalModeloEditComponent) addView!: ModalModeloEditComponent;



  displayedColumns: string[] = ['id_marca', 'nombre', 'logo', 'descripcion', 'editar', 'eliminar'];

  dataSource: any
  public modal?: ModalModeloAddComponent
  vehiculo: any = '';

  ngOnInit(): void {
    this.getModelo();
  }

  openModalAdd() {
    this.dialog.open(ModalModeloAddComponent, {
      width: '100%',
    })
  }
  openModalEdit() {
    this.dialog.open(ModalModeloEditComponent, {
      width: '100%',
    })
  }

  getModelo() {
    this.modeloService.getModelo()
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos : any = (newData[1][1])

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


  updateModelo(id_modelo: any) {
    this.addView.loadData(id_modelo)

  }
  refreshTable() {
    this.getModelo();
  }

  deleteModelo(id_modelo: any) {
    var formData: any = new FormData();
    formData.append("id_modelo", id_modelo);



    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar la solicitud?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.modeloService.deleteModelo(formData)
        .subscribe({
          next: (res) => {
            this.getModelo()
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

  })

  filtrarTabla() {

    var filtroData: any = new FormData();

    filtroData.append("marca_filtro", this.filtroData.get("marca_filtro")?.value);
    filtroData.append("modelo_filtro", this.filtroData.get("modelo_filtro")?.value);
    filtroData.append("modelo_filtro", this.filtroData.get("modelo_filtro")?.value);
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

