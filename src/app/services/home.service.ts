import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'servicio';

  constructor(
    private http: HttpClient
  ) { }


  getIndicadores() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getIndicadoresWeb`);
  }
  getIndicadorMarcaRecurrente() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getIndicadorMarcaRecurrente`);
  }
  getIndicadorClientesNuevos() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getIndicadorClienteNuevo`);
  }
}
