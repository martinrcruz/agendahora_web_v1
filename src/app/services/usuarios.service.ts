import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'usuario';

  constructor(private http: HttpClient) { }

  getUsuario() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getUsuario`);
  }
  getCliente(){
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getCliente`);
  }

  getUsuarioById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getUsuarioById`, id);
  }

  getClienteById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getClienteById`, id);
  }

  addUsuario(usuarioData: any) {
    return this.http.post(`${this.apiUrl}auth/create_user`, usuarioData);
  }

  updateUsuario(usuarioData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateUsuario`, usuarioData);
  }

  deleteUsuario(id_usuario: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteUsuario`, id_usuario);
  }


  getTecnicos(){
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getTecnicos`);

  }
}
