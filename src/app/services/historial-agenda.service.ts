import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HistorialAgendaService {



  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'historial_agenda';


  constructor(private http: HttpClient) { }

  getHistorialAgenda() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getHistorialAgenda`);
  }

  getHistorialAgendaById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getHistorialAgendaById`, id);
  }

  addHistorialAgenda(historialAgendaData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertHistorialAgenda`, historialAgendaData);
  }

  updateHistorialAgenda(historialAgendaData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateHistorialAgenda`, historialAgendaData);
  }

  deleteHistorialAgenda(id_historial_agenda: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteHistorialAgenda`, id_historial_agenda);
  }


}
