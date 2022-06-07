import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../models/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'vehiculo';


  constructor(private http: HttpClient) { }


  getVehiculo() {
    return this.http.get<Vehiculo>(`${this.apiUrl}/${this.controllerUrl}/getVehiculo`);
  }

  getVehiculoById(id: any) {
    return this.http.post<Vehiculo>(`${this.apiUrl}/${this.controllerUrl}/getVehiculoById`, id);
  }

  addVehiculo(vehiculoData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertVehiculo`, vehiculoData);
  }

  updateVehiculo(vehiculoData: any) {
    return this.http.post<Vehiculo>(`${this.apiUrl}/${this.controllerUrl}/updateVehiculo`, vehiculoData);
  }

  deleteVehiculo(id: any) {
    return this.http.post<Vehiculo>(`${this.apiUrl}/${this.controllerUrl}/deleteVehiculo`, id);
  }
}
