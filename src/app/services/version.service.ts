import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'  
})
export class VersionService {

  private apiUrl: string = environment.apiUrl;
  private controllerUrl: string = 'version';


  constructor(private http: HttpClient) { }

  
  getVersion() {
    return this.http.get(`${this.apiUrl}${this.controllerUrl}/getVersion`);
  }


  getVersionById(id: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/getVersionById`, id);
  }

  addVersion(versionData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/insertVersion`, versionData);
  }

  updateVersion(versionData: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/updateVersion`, versionData);
  }

  deleteVersion(id_version: any) {
    return this.http.post(`${this.apiUrl}${this.controllerUrl}/deleteVersion`, id_version);
  }
}
