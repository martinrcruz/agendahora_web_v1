import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SolicitudCliente } from '.././models/solicitud-cliente.model';


@Injectable({
  providedIn: 'root'
})
export class SolicitudClienteService {


  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'solicitud_registro';


  constructor(private http: HttpClient) { }

  getSolicitudCliente() {
    return this.http.get<SolicitudCliente>(`${this.apiUrl}${this.controllerUrl}/getSolicitudRegistro`);
  }
}

