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


  getVehiculo(filtroData: any | null | '' = '') {
    return this.http.get<Vehiculo>(`${this.apiUrl}${this.controllerUrl}/getVehiculo`);
  }

  getMarcasVehiculo(){
    return this.http.get(`${this.apiUrl}/marca/getMarca`);
  }

  getModelosVehiculo(marca: any){
    return this.http.get(`${this.apiUrl}/modelo/getModelo`);
  }

  getVehiculoById(id: any) {
    return this.http.post<Vehiculo>(`${this.apiUrl}${this.controllerUrl}/getVehiculoById`, id);
  }

  addVehiculo(vehiculoData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertVehiculo`, vehiculoData);
  }

  updateVehiculo(vehiculoData: any) {
    return this.http.post<Vehiculo>(`${this.apiUrl}${this.controllerUrl}/updateVehiculo`, vehiculoData);
  }

  deleteVehiculo(id_vehiculo: any) {
    return this.http.post<Vehiculo>(`${this.apiUrl}${this.controllerUrl}/deleteVehiculo`, id_vehiculo);
  }
}
