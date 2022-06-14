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

  getSolicitudClienteById(id: any) {
    return this.http.post<SolicitudCliente>(`${this.apiUrl}${this.controllerUrl}/getSolicitudRegistroById`, id);
  }

  addSolicitudCliente(SolicitudclienteData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertSolicitudRegistro`, SolicitudclienteData);
  }

  updateSolicitudCliente(SolicitudclienteData: any) {
    return this.http.post<SolicitudCliente>(`${this.apiUrl}${this.controllerUrl}/updateSolicitudRegistro`, SolicitudclienteData);
  }

  deleteSolicitudCliente(id_solicitud_cliente: any) {
    return this.http.post<SolicitudCliente>(`${this.apiUrl}${this.controllerUrl}/deleteSolicitudRegistro`, id_solicitud_cliente);
  }
}

