import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'  
})
export class MarcaService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'marca';


  constructor(private http: HttpClient) { }

  
  getMarca() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getMarca`);
  }

  getMarcaById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getMarcaById`, id);
  }

  addMarca(marcaData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertMarca`, marcaData);
  }

  updateMarca(marcaData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateMarca`, marcaData);
  }

  deleteMarca(id_marca: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteMarca`, id_marca);
  }
}
