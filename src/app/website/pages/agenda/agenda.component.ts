import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  load: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.initCalendar()
  }

  initCalendar(): any {
    this.load = true
  }



}
