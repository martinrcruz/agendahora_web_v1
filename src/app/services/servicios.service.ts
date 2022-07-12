import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Servicio } from '../models/servicio.model';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'servicio';


  constructor(private http: HttpClient) { }

  getServicio() {
    return this.http.get<Servicio>(`${this.apiUrl}${this.controllerUrl}/getServicio`);
  }
  getServicioTabla(filtroData: any | null | '' = '') {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getServicioTabla`, filtroData);
  }


  getHistorialServicioTabla(filtroData: any | null | '' = '') {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getHistorialServicioTabla`, filtroData);
  }

  getServicioById(id: any) {
    return this.http.post<Servicio>(`${this.apiUrl}${this.controllerUrl}/getServicioById`, id);
  }

  addServicio(ServicioData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertServicio`, ServicioData);
  }

  updateServicio(ServicioData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateServicio`, ServicioData);
  }

  updateServicioState(ServicioData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateServicioState`, ServicioData);
  }

  deleteServicio(id: any) {
    return this.http.post<Servicio>(`${this.apiUrl}${this.controllerUrl}/deleteServicio`, id);
  }
}
