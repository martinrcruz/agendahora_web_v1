import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  load: boolean = false;
  serviciosDia: any;
  constructor(private agendaService: AgendaService) { }

  ngOnInit(): void {
    var defaultDate = new Date();
    var defDate = defaultDate.getFullYear() + '-' + (defaultDate.getMonth() + 1) + '-' + defaultDate.getDate()

    this.initCalendar()
    this.getServiciosDia(defDate);
  }

  getServiciosDia(selectedDate: any) {
    this.agendaService.getAgendaDia(selectedDate)
      .subscribe({
        next: (res) => {
          var newData = Object.entries(res)
          const datos = (newData[1][1])
          this.serviciosDia = datos;
          console.log(this.serviciosDia)
        },
        error: (err: any) => {
          alert('Error fetching')
        }
      })

  }

  initCalendar(): any {
    this.load = true
  }
}
