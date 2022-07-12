import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'  
})
export class ModeloService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'modelo';


  constructor(private http: HttpClient) { }

  
  getModelo() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getModelo`);
  }

  getModeloById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getModeloById`, id);
  }

  addModelo(modeloData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertModelo`, modeloData);
  }

  updateModelo(modeloData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateModelo`, modeloData);
  }

  deleteModelo(id_modelo: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteModelo`, id_modelo);
  }
}
