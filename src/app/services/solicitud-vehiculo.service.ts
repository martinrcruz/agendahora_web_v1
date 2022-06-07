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
}


