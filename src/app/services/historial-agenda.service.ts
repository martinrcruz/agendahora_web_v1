import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HistorialAgenda } from '.././models/historial-servicio.model';
@Injectable({
  providedIn: 'root'
})
export class HistorialAgendaService {



  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'historial_servicio';


  constructor(private http: HttpClient) { }

  getHistorialAgenda() {
    return this.http.get<HistorialAgenda>(`${this.apiUrl}${this.controllerUrl}/getHistorialServicio`);
  }


}
