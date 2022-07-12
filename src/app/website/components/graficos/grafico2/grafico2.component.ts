import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafico2',
  templateUrl: './grafico2.component.html',
  styleUrls: ['./grafico2.component.scss']
})
export class Grafico2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Mantencion preventiva',
        backgroundColor: '#232DAB',
        data: [80, 75, 70, 76, 72, 50, 68, 44, 59, 64, 70, 72]
      }, 
      {
        label: 'Mantencion Correctiva',
        backgroundColor: '#35B5DA',
        data: [20, 22, 35, 46, 40, 48, 30, 31, 33, 38, 30, 42]
      }, 
      {
        label: 'Diagnostico y Revision',
        backgroundColor: '#A004FF',
        data: [15, 17, 18, 14, 13, 16, 20, 21, 22, 24, 20, 18]
      }, 
      {
        label: 'Reparacion por Choque',
        backgroundColor: '#CFC111',
        data: [2, 0, 1, 0, 4, 3, 1, 0, 0, 0, 2, 6]
      }, 
      {
        label: 'Cambio de aceite',
        backgroundColor: '#11CF22',
        data: [30, 32, 36, 34, 33, 37, 38, 30, 40, 42, 44, 58]
      }, 
      {
        label: 'Falla electrica/electronica',
        backgroundColor: '#B8C2FF',
        data: [10, 12, 11, 15, 25, 26, 26, 28, 20, 24, 23, 20]
      },


    ]
  };
}
