import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SolicitudVehiculo } from '../models/solicitud-vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudVehiculoService {
  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'solicitud_vehiculo';


  constructor(private http: HttpClient) { }


  getSolicitudVehiculo() {
    return this.http.get<SolicitudVehiculo>(`${this.apiUrl}/${this.controllerUrl}/getSolicitudVehiculo`);
  }
  getSolicitudVehiculoById(id: any) {
    return this.http.post<SolicitudVehiculo>(`${this.apiUrl}${this.controllerUrl}/getSolicitudVehiculoById`, id);
  }

  addSolicitudVehiculo(solicitudVehiculoData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertSolicitudVehiculo`, solicitudVehiculoData);
  }

  updateSolicitudVehiculo(solicitudVehiculoData: any) {
    return this.http.post<SolicitudVehiculo>(`${this.apiUrl}${this.controllerUrl}/updateSolicitudVehiculo`, solicitudVehiculoData);
  }

  deleteSolicitudVehiculo(id_solicitud_vehiculo: any) {
    return this.http.post<SolicitudVehiculo>(`${this.apiUrl}${this.controllerUrl}/deleteSolicitudVehiculo`, id_solicitud_vehiculo);
  }
}


