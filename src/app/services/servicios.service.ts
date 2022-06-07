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
    return this.http.get<Servicio>(`${this.apiUrl}/${this.controllerUrl}/getServicio`);
  }
}
