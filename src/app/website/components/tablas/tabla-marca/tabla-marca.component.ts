import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MarcaService } from '../../../../services/marca.service';
import { ModalMarcaAddComponent } from '../../modals/modal-marca-add/modal-marca-add.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDateRangePicker, MatDateRangeInput, MatDatepicker } from '@angular/material/datepicker';
import { ModalMarcaEditComponent } from '../../modals/modal-marca-edit/modal-marca-edit.component';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-tabla-marca',
  templateUrl: './tabla-marca.component.html',
  styleUrls: ['./tabla-marca.component.scss']
})
export class TablaMarcaComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;


  constructor(private marcaService: MarcaService, private dialog: MatDialog) { }


  @ViewChild(ModalMarcaEditComponent) addView!: ModalMarcaEditComponent;



  displayedColumns: string[] = ['id_marca', 'nombre', 'logo', 'editar', 'eliminar'];

  dataSource: any
  public modal?: ModalMarcaAddComponent
  vehiculo: any = '';
  ngOnInit(): void {
    this.getMarca();
  }

  openModalAdd() {
    this.dialog.open(ModalMarcaAddComponent, {
      width: '100%',
    })
  }
  openModalEdit() {
    this.dialog.open(ModalMarcaEditComponent, {
      width: '100%',
    })
  }

  getMarca() {
    this.marcaService.getMarca()
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


  updateMarca(id_marca: any) {
    this.addView.loadData(id_marca)

  }
  refreshTable() {
    this.getMarca();
  }

  deleteMarca(id_marca: any) {
    var formData: any = new FormData();
    formData.append("id_marca", id_marca);



    Swal.fire({
      title: 'Estas seguro?',
      text: 'Deseas eliminar la solicitud?',
      icon: 'error',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.marcaService.deleteMarca(formData)
          .subscribe({
            next: (res) => {
              this.getMarca()
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
    filtroData.append("marca_filtro", this.filtroData.get("marca_filtro")?.value);
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

