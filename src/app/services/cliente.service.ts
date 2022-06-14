import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.model';



@Injectable({
  providedIn: 'root'  
})
export class ClienteService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'cliente';


  constructor(private http: HttpClient) { }

  
  getCliente() {
    return this.http.get<Cliente>(`${this.apiUrl}${this.controllerUrl}/getCliente`);
  }

  getClienteById(id: any) {
    return this.http.post<Cliente>(`${this.apiUrl}${this.controllerUrl}/getClienteById`, id);
  }

  addCliente(clienteData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertCliente`, clienteData);
  }

  updateCliente(clienteData: any) {
    return this.http.post<Cliente>(`${this.apiUrl}${this.controllerUrl}/updateCliente`, clienteData);
  }

  deleteCliente(id_cliente: any) {
    return this.http.post<Cliente>(`${this.apiUrl}${this.controllerUrl}/deleteCliente`, id_cliente);
  }
}

