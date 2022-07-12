import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  dataSource: any;
  indicadores = {
    marca_recurrente: '',
    activos: '',
    pendientes: '',
    totales: '',
    clientes_nuevos: ''
  }

  userData = {
    id: '',
    username: '',
    group: ''
  };

  ngOnInit(): void {
    this.getIndicadores();
    this.getIndicadorClientesNuevos();
    this.getIndicadorMarcaRecurrente();
  }

  getIndicadores() {
    var filtroData: any = new FormData();


    this.homeService.getIndicadores()
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])

          this.indicadores.activos = datos[0]['servicios_activos']
          this.indicadores.pendientes = datos[0]['servicios_pendientes']
          this.indicadores.totales = datos[0]['servicios_totales']
          console.log(this.indicadores)

        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  getIndicadorMarcaRecurrente() {
    var filtroData: any = new FormData();


    this.homeService.getIndicadorMarcaRecurrente()
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          console.log(datos)

          this.indicadores.marca_recurrente = datos[0]['marca_recurrente']
          console.log(this.indicadores.marca_recurrente)


        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }

  getIndicadorClientesNuevos() {
    var filtroData: any = new FormData();


    this.homeService.getIndicadorClientesNuevos()
      .subscribe({
        next: (res) => {
          console.log(res)
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          console.log(datos)
          this.indicadores.clientes_nuevos = datos[0]['clientes_nuevos']
          console.log(this.indicadores.clientes_nuevos)


        },
        error: (err) => {
          alert('Error fetching')
        }
      })
  }
}
