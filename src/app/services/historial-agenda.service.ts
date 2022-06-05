import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AgendaHora } from '.././models/historial-servicio.model';
@Injectable({
  providedIn: 'root'
})
export class HistorialAgendaService {



  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'agenda';


  constructor(private http: HttpClient) { }

  getHistorialAgenda() {
    return this.http.get<AgendaHora>("http://localhost/agendahora_v1/agendahora_backend_v1/agenda/getHoraAgenda");
  }

  getHistorialAgendaById(id: number) {
    return this.http.get<AgendaHora>(`${this.apiUrl}/${id}`);
  }

}
