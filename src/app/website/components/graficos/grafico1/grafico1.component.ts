import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafico1',
  templateUrl: './grafico1.component.html',
  styleUrls: ['./grafico1.component.scss']
})
export class Grafico1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Toyota',
        backgroundColor: '#E91111',
        borderColor: '#F97777',
        pointBackgroundColor: '#E91111',
        pointBorderColor: '#fff',
        data: [70, 50, 62, 55, 52, 48, 40, 41, 53, 68, 70, 72]
      },
      {
        label: 'BMW',
        backgroundColor: '#115CE9',
        borderColor: '#77A4F9',
        pointBackgroundColor: '#115CE9',
        pointBorderColor: '#fff',
        data: [20, 22, 32, 25, 32, 28, 30, 41, 13, 18, 20, 24]
      },
      {
        label: 'Citroen',
        backgroundColor: '#838383',
        borderColor: '#B6B6B6',
        pointBackgroundColor: '#838383',
        pointBorderColor: '#fff',
        data: [30, 32, 36, 40, 32, 27, 20, 36, 33, 38, 30, 26]
      },
      {
        label: 'Volvo',
        backgroundColor: '#208DBF',
        borderColor: '#66B0D3',
        pointBackgroundColor: '#208DBF',
        pointBorderColor: '#fff',
        data: [8, 2, 12, 10, 6, 8, 6, 10, 13, 18, 10, 16]
      },
      {
        label: 'Volskwagen',
        backgroundColor: '#C3D022',
        borderColor: '#E0E885',
        pointBackgroundColor:'#C3D022',
        pointBorderColor: '#fff',
        data: [14, 22, 26, 18, 21, 27, 20, 26, 23, 28, 20,6]
      },
      {
        label: 'Audi',
        backgroundColor: '#4D4D4D',
        borderColor: '#747474',
        pointBackgroundColor: '#4D4D4D',
        pointBorderColor: '#fff',
        data: [18, 12, 16, 10, 12, 17, 10, 16, 13, 18, 10, 16]
      },
      {
        label: 'MG',
        backgroundColor: '#FAB200',
        borderColor: '#FCCE5B',
        pointBackgroundColor: '#FAB200',
        pointBorderColor: '#fff',
        data: [65, 60, 62, 55, 57,52, 57, 52, 50, 59, 60, 62]
      },
      {
        label: 'Honda',
        backgroundColor: '#FA6E00',
        borderColor: '#FFA660',
        pointBackgroundColor: '#FA6E00',
        pointBorderColor: '#fff',
        data: [42, 31, 34, 33, 40, 38, 35, 38, 20, 20, 22, 29]
      },
      {
        label: 'Geely',
        backgroundColor: '#19B700',
        borderColor: '#68E255',
        pointBackgroundColor: '#19B700',
        pointBorderColor: '#fff',
        data: [22, 24, 25, 20, 27, 29, 30, 26, 23, 28, 20, 16]
      },
      {
        label: 'Maxus',
        backgroundColor: '#B32C7C',
        borderColor: '#D777B0',
        pointBackgroundColor: '#B32C7C',
        pointBorderColor: '#fff',
        data: [8, 12, 14, 10, 15, 14, 10, 5, 13, 12, 10, 18]
      },

    ]
  };
}
