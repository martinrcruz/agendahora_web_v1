import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HistorialAgendaService {



  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'historial_servicio';


  constructor(private http: HttpClient) { }

  getHistorialAgenda() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getHistorialServicio`);
  }
  getHistorialAgendaTabla(filtroData: any | null | '' = '') {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getHistorialServicioTabla`, filtroData);
  }

  getHistorialAgendaById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getHistorialServicioById`, id);
  }

  addHistorialAgenda(historialAgendaData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertHistorialServicio`, historialAgendaData);
  }

  updateHistorialAgenda(historialAgendaData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateHistorialServicio`, historialAgendaData);
  }

  deleteHistorialAgenda(id_historial_agenda: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteHistorialServicio`, id_historial_agenda);
  }


}
